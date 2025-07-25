import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id)
  
  if (isNaN(id)) {
    return NextResponse.json(
      { error: 'Invalid incident ID' },
      { status: 400 }
    )
  }
  
  try {
    // Find the incident
    const incident = await prisma.incident.findUnique({
      where: { id }
    })
    
    if (!incident) {
      return NextResponse.json(
        { error: 'Incident not found' },
        { status: 404 }
      )
    }
    
    // Update the incident's resolved status
    const updatedIncident = await prisma.incident.update({
      where: { id },
      data: { resolved: true },
      include: { camera: true }
    })
    
    return NextResponse.json(updatedIncident)
  } catch (error) {
    console.error('Failed to resolve incident:', error)
    return NextResponse.json(
      { error: 'Failed to resolve incident' },
      { status: 500 }
    )
  }
}
