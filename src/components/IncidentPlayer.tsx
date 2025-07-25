'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, Row, Col, Button, Badge } from 'react-bootstrap'

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

interface IncidentPlayerProps {
  activeIncident: Incident | null
  additionalCameras: Camera[]
}

export default function IncidentPlayer({ activeIncident, additionalCameras = [] }: IncidentPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  
  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }
  
  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })
  }
  
  return (
    <Card className="text-white h-100 border-0" style={{ background: 'rgba(15, 15, 25, 0.45)', backdropFilter: 'blur(2px)' }}>
      {/* Main player */}
      <div className="position-relative" style={{ height: '400px', background: 'rgba(15, 15, 20, 0.7)' }}>
        {activeIncident ? (
          <>
            <div className="position-absolute start-0 top-0 m-3 bg-black bg-opacity-50 py-1 px-2 rounded small">
              {formatDate(activeIncident.tsStart)} – {formatTimestamp(activeIncident.tsStart)}
            </div>
            
            <div className="position-absolute end-0 top-0 m-3 bg-danger bg-opacity-75 py-1 px-2 rounded small d-flex align-items-center">
              <span className="bg-white rounded-circle me-1" style={{ width: '8px', height: '8px', animation: 'pulse 2s infinite' }}></span>
              Camera {activeIncident.camera.name} – {activeIncident.camera.location}
            </div>
            
            <div className="w-100 h-100 position-relative">
              <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
                <Image 
                  src={activeIncident.thumbnailUrl} 
                  alt={`${activeIncident.type} incident`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="100vw"
                  priority
                />
              </div>
            </div>
          </>
        ) : (
          <div className="d-flex align-items-center justify-content-center h-100 text-muted">
            No incident selected
          </div>
        )}
      </div>
      
      {/* Camera thumbnails */}
      <Card.Body className="p-2" style={{ backgroundColor: 'rgba(40, 40, 50, 0.5)' }}>
        <Row className="g-2">
          {additionalCameras.map(camera => (
            <Col xs={4} key={camera.id}>
              <div className="position-relative rounded" style={{ height: '80px', backgroundColor: 'rgba(20, 20, 25, 0.7)' }}>
                <div className="position-absolute bottom-0 start-0 end-0 m-1 bg-black bg-opacity-50 text-white text-center small py-1 rounded">
                  {camera.location}
                </div>
              </div>
            </Col>
          ))}
          {additionalCameras.length === 0 && (
            <Col xs={12}>
              <div className="text-center py-3 text-muted small">
                No additional cameras
              </div>
            </Col>
          )}
        </Row>
      </Card.Body>
      
      {/* Playback controls */}
      <Card.Footer className="d-flex align-items-center justify-content-between border-0" style={{ backgroundColor: 'rgba(20, 20, 25, 0.7)' }}>
        <Button variant="dark" size="sm" className="bg-transparent border-0">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"></path>
          </svg>
        </Button>
        
        <Button 
          variant="outline-light" 
          className="rounded-circle d-flex align-items-center justify-content-center bg-transparent" 
          style={{ width: '40px', height: '40px' }}
          onClick={togglePlayback}
        >
          {isPlaying ? (
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          ) : (
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          )}
        </Button>
        
        <Button variant="dark" size="sm" className="bg-transparent border-0">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"></path>
          </svg>
        </Button>
      </Card.Footer>
      
      {/* Custom CSS for pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </Card>
  )
}
