'use client'

import { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap'
import Navbar from '@/components/Navbar'
import IncidentList from '@/components/IncidentList'
import IncidentPlayer from '@/components/IncidentPlayer'
import IncidentTimeline from '@/components/IncidentTimeline'

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

export default function Home() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [activeIncident, setActiveIncident] = useState<Incident | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Get additional cameras for the incident player
  const additionalCameras = activeIncident
    ? incidents
        .filter(incident => 
          incident.cameraId !== activeIncident.cameraId && 
          !incident.resolved
        )
        .map(incident => incident.camera)
        .filter((camera, index, self) => 
          index === self.findIndex(c => c.id === camera.id)
        )
        .slice(0, 2) // Only take 2 additional cameras
    : []
  
  // Fetch incidents
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await fetch('/api/incidents?resolved=false')
        
        if (!res.ok) {
          throw new Error('Failed to fetch incidents')
        }
        
        const data = await res.json()
        setIncidents(data)
        
        // Set the first incident as active if we have incidents and no active one
        if (data.length > 0 && !activeIncident) {
          setActiveIncident(data[0])
        }
      } catch (err) {
        console.error('Error fetching incidents:', err)
        setError('Failed to load incidents. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchIncidents()
  }, [])
  
  // Handler for resolving an incident
  const handleResolveIncident = async (id: number) => {
    try {
      const res = await fetch(`/api/incidents/${id}/resolve`, {
        method: 'PATCH',
      })
      
      if (!res.ok) {
        throw new Error('Failed to resolve incident')
      }
      
      // Update the state to reflect the resolved incident
      setIncidents(prevIncidents => 
        prevIncidents.map(incident => 
          incident.id === id 
            ? { ...incident, resolved: true } 
            : incident
        )
      )
      
      // If the active incident was resolved, select a new one
      if (activeIncident && activeIncident.id === id) {
        const nextUnresolvedIncident = incidents.find(incident => 
          !incident.resolved && incident.id !== id
        )
        
        setActiveIncident(nextUnresolvedIncident || null)
      }
      
      return Promise.resolve()
    } catch (error) {
      console.error('Error resolving incident:', error)
      return Promise.reject(error)
    }
  }
  
  // Handler for selecting an incident
  const handleSelectIncident = (incident: Incident) => {
    setActiveIncident(incident)
  }
  
  // Filter out resolved incidents for display
  const unresolvedIncidents = incidents.filter(incident => !incident.resolved)
  
  return (
    <main style={{ background: 'linear-gradient(to bottom, rgba(10, 10, 15, 0.95), rgba(15, 15, 25, 0.9))', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative gradients */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '300px',
        left: 'calc(50% - 250px)',
        top: '-150px',
        background: 'rgba(208, 167, 4, 0.35)',
        filter: 'blur(100px)',
        zIndex: 0,
        opacity: 0.5,
      }}></div>
      
      <div style={{
        position: 'absolute',
        width: '150px',
        height: '525px',
        right: 'calc(50% - 150px/2)',
        top: '50px',
        background: 'rgba(76, 29, 149, 0.4)',
        filter: 'blur(80px)',
        zIndex: 0,
        opacity: 0.6
      }}></div>
      
      <Navbar />
      
      <Container fluid className="py-4 px-4" style={{ position: 'relative', zIndex: 1 }}>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
            <Spinner animation="border" role="status" className="text-light">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
            <Alert variant="danger" className="bg-danger bg-opacity-25 text-white border-danger">
              {error}
            </Alert>
          </div>
        ) : (
          <>
            <Row className="mb-4 g-4">
              {/* Incident Player (left) */}
              <Col lg={8} xs={12}>
                <IncidentPlayer 
                  activeIncident={activeIncident} 
                  additionalCameras={additionalCameras}
                />
              </Col>
              
              {/* Incident List (right) */}
              <Col lg={4} xs={12}>
                <IncidentList 
                  incidents={unresolvedIncidents}
                  onResolve={handleResolveIncident}
                  onSelect={handleSelectIncident}
                  activeIncidentId={activeIncident?.id}
                />
              </Col>
            </Row>
            
            {/* Incident Timeline (bottom) */}
            <Row className="mt-4">
              <Col xs={12}>
                <IncidentTimeline 
                  incidents={incidents}
                  onSelectIncident={handleSelectIncident}
                  activeIncidentId={activeIncident?.id}
                />
              </Col>
            </Row>
          </>
        )}
      </Container>
    </main>
  )
}
