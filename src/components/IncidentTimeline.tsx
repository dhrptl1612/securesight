'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'

type Camera = {
  id: number
  name: string
  location: string
}

type Incident = {
  id: number
  type: string
  tsStart: string
  tsEnd: string
  thumbnailUrl: string
  resolved: boolean
  camera: Camera
  cameraId: number
}

interface IncidentTimelineProps {
  incidents: Incident[]
  onSelectIncident: (incident: Incident) => void
  activeIncidentId?: number
}

export default function IncidentTimeline({ incidents, onSelectIncident, activeIncidentId }: IncidentTimelineProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [currentHour, setCurrentHour] = useState<number>(new Date().getHours())

  // Group incidents by camera
  const incidentsByCamera = incidents.reduce<Record<number, Incident[]>>((acc, incident) => {
    if (!acc[incident.cameraId]) {
      acc[incident.cameraId] = []
    }
    acc[incident.cameraId].push(incident)
    return acc
  }, {})
  
  const cameras = [...new Set(incidents.map(incident => incident.cameraId))]
    .map(cameraId => {
      const incident = incidents.find(inc => inc.cameraId === cameraId)
      return incident ? incident.camera : null
    })
    .filter((camera): camera is Camera => camera !== null)

  // Calculate position on timeline based on time
  const calculateXPosition = (dateString: string) => {
    const date = new Date(dateString)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    
    const totalSeconds = hours * 3600 + minutes * 60 + seconds
    const percentage = totalSeconds / (24 * 3600)
    
    const svgWidth = svgRef.current?.clientWidth || 1000
    return percentage * svgWidth
  }

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isDragging && svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect()
      const relativeX = e.clientX - svgRect.left
      const svgWidth = svgRef.current.clientWidth
      
      const hourPosition = (relativeX / svgWidth) * 24
      setCurrentHour(Math.min(Math.max(0, Math.floor(hourPosition)), 23))
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const getIncidentColor = (type: string) => {
    switch (type) {
      case 'Unauthorised Access': return '#dc3545' // Bootstrap danger
      case 'Gun Threat': return '#dc3545' // Bootstrap danger
      case 'Face Recognised': return '#0dcaf0' // Bootstrap info
      case 'Suspicious Activity': return '#ffc107' // Bootstrap warning
      case 'Traffic congestion': return '#ffc107' // Bootstrap warning
      default: return '#6c757d' // Bootstrap secondary
    }
  }

  return (
    <Card className="h-100">
      <Card.Body>
        <h4 className="card-title mb-4">Incident Timeline</h4>
        
        <div className="position-relative" style={{ height: '200px' }}>
          <svg 
            ref={svgRef}
            className="w-100 h-100"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ userSelect: 'none' }}
          >
            {/* Background grid lines */}
            {Array.from({ length: 25 }).map((_, i) => (
              <line 
                key={`gridline-${i}`}
                x1={`${(i/24) * 100}%`} 
                y1="20" 
                x2={`${(i/24) * 100}%`} 
                y2="150" 
                stroke={i % 6 === 0 ? "rgba(108, 117, 125, 0.5)" : "rgba(108, 117, 125, 0.2)"} 
                strokeWidth={i % 6 === 0 ? 1 : 0.5}
              />
            ))}
            
            {/* Hour labels */}
            {Array.from({ length: 9 }).map((_, i) => {
              const hour = i * 3
              return (
                <text 
                  key={`hour-${hour}`}
                  x={`${(hour/24) * 100}%`} 
                  y="15" 
                  fontSize="10" 
                  textAnchor="middle"
                  fill="currentColor"
                >
                  {hour.toString().padStart(2, '0')}:00
                </text>
              )
            })}
            
            {/* Camera rows */}
            {cameras.map((camera, index) => (
              <g key={camera.id}>
                <text 
                  x="5" 
                  y={40 + index * 30} 
                  fontSize="10" 
                  fill="currentColor"
                >
                  {camera.name}
                </text>
                
                <line 
                  x1="80" 
                  y1={40 + index * 30} 
                  x2="100%" 
                  y2={40 + index * 30} 
                  stroke="rgba(108, 117, 125, 0.2)" 
                  strokeDasharray="2,2"
                />
                
                {/* Incident markers */}
                {incidentsByCamera[camera.id]?.map(incident => {
                  const startX = calculateXPosition(incident.tsStart)
                  const endX = calculateXPosition(incident.tsEnd)
                  const width = Math.max(10, endX - startX) // Ensure a minimum width for visibility
                  const color = getIncidentColor(incident.type)
                  
                  return (
                    <g 
                      key={incident.id}
                      onClick={() => onSelectIncident(incident)}
                      style={{ cursor: 'pointer' }}
                    >
                      <rect 
                        x={startX} 
                        y={30 + index * 30} 
                        width={width} 
                        height="16" 
                        fill={color}
                        opacity={incident.id === activeIncidentId ? 1 : 0.7}
                        rx="3"
                        stroke={incident.id === activeIncidentId ? "white" : "none"}
                        strokeWidth="1.5"
                      />
                    </g>
                  )
                })}
              </g>
            ))}
            
            {/* Current time indicator */}
            <line 
              x1={`${(currentHour / 24) * 100}%`} 
              y1="20" 
              x2={`${(currentHour / 24) * 100}%`} 
              y2="150" 
              stroke="#dc3545" 
              strokeWidth="1.5"
            />
            
            <circle 
              cx={`${(currentHour / 24) * 100}%`} 
              cy="20" 
              r="4" 
              fill="#dc3545"
            />
            
            <text 
              x={`${(currentHour / 24) * 100}%`} 
              y="180" 
              fontSize="10" 
              textAnchor="middle"
              fill="currentColor"
            >
              {currentHour.toString().padStart(2, '0')}:00
            </text>
          </svg>
        </div>
        
        <div className="mt-2 text-center small text-muted">
          Drag the red indicator to scrub through the timeline
        </div>
      </Card.Body>
    </Card>
  )
}
