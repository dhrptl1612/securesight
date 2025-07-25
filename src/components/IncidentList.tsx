'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, ListGroup, Badge, Button, Spinner } from 'react-bootstrap'

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

interface IncidentListProps {
  incidents: Incident[]
  onResolve: (id: number) => Promise<void>
  onSelect: (incident: Incident) => void
  activeIncidentId?: number
}

export default function IncidentList({ incidents, onResolve, onSelect, activeIncidentId }: IncidentListProps) {
  const [resolvingIds, setResolvingIds] = useState<number[]>([])

  const handleResolve = async (incident: Incident, e: React.MouseEvent) => {
    e.stopPropagation()

    setResolvingIds(prev => [...prev, incident.id])

    try {
      await onResolve(incident.id)
    } catch (error) {
      console.error('Failed to resolve incident:', error)
      // Remove from resolving state if there's an error
      setResolvingIds(prev => prev.filter(id => id !== incident.id))
    }
  }

  const formatTimeRange = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)

    const formatTime = (date: Date) => {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    }

    return `${formatTime(startDate)} - ${formatTime(endDate)}`
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString([], {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Unauthorised Access':
        return (
         <Badge bg="danger" className="p-1 rounded-circle">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
            </svg>
          </Badge>

        )
      case 'Gun Threat':
        return (
            <Badge bg="danger" className="p-1 rounded-circle">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </Badge>
        )
      case 'Unauthorised Access':
        return (
          <Badge bg="danger" className="p-1 rounded-circle">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
            </svg>
          </Badge>
        )
      case 'Unauthorised Access':
        return (
          <Badge bg="danger" className="p-1 rounded-circle">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
            </svg>
          </Badge>

        )
      case 'Face Recognised':
        return (
          <Badge bg="info" className="p-1 rounded-circle">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </Badge>
        )
      case 'Suspicious Activity':
        return (
          <Badge bg="warning" className="p-1 rounded-circle">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </Badge>
        )
      case 'Traffic congestion':
        return (
          <Badge bg="warning" className="p-1 rounded-circle">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </Badge>
        )
      default:
        return (
          <Badge bg="secondary" className="p-1 rounded-circle">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </Badge>
        )
    }
  }

  return (
    <Card className="h-100">
      <Card.Header className="bg-danger text-white d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <span className="bg-white rounded-circle me-2" style={{ width: '8px', height: '8px', animation: 'pulse 2s infinite' }}></span>
          <h5 className="m-0">{incidents.length} Unresolved Incidents</h5>
        </div>
        <div className="d-flex">
          <Button variant="outline-light" size="sm" className="me-2 p-1">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </Button>
          <Button variant="outline-light" size="sm" className="me-2 p-1">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
          </Button>
          <Button variant="outline-light" size="sm" className="p-1">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </Button>
        </div>
      </Card.Header>

      <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        {incidents.length === 0 ? (
          <div className="p-4 text-center text-muted">
            No incidents found
          </div>
        ) : (
          <ListGroup variant="flush">
            {incidents
              .filter(incident => !incident.resolved && !resolvingIds.includes(incident.id))
              .map(incident => (
                <div
                  key={incident.id}
                  className={`d-flex align-items-center py-3 px-3 list-group-item ${activeIncidentId === incident.id ? 'active' : ''}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => onSelect(incident)}
                >
                  <div className="me-3" style={{ width: '96px', height: '64px', position: 'relative' }}>
                    <Image
                      src={incident.thumbnailUrl}
                      alt={incident.type}
                      fill
                      sizes="55px"
                      priority={activeIncidentId === incident.id}
                      style={{ objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </div>

                  <div className="flex-grow-1 me-3">
                    <div className="d-flex align-items-center mb-1">
                      {getTypeIcon(incident.type)}
                      <span className="ms-2 fw-medium">{incident.type}</span>
                    </div>

                    <div className="d-flex align-items-center text-muted small mb-1">
                      <svg width="12" height="12" className="me-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                      </svg>
                      {incident.camera.location}
                    </div>

                    <div className="d-flex align-items-center text-muted small">
                      <svg width="12" height="12" className="me-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {formatTimeRange(incident.tsStart, incident.tsEnd)} on {formatDate(incident.tsStart)}
                    </div>
                  </div>

                  <div onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={(e) => handleResolve(incident, e)}
                    >
                      Resolve
                    </Button>
                  </div>
                </div>
              ))
            }
          </ListGroup>
        )}
      </div>

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


