import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const resolvedParam = searchParams.get('resolved')
  
  let whereClause = {}
  
  // Filter by resolved status if specified
  if (resolvedParam !== null) {
    const resolvedBool = resolvedParam === 'true'
    whereClause = { resolved: resolvedBool }
  }
  
  try {
    const incidents = await prisma.incident.findMany({
      where: whereClause,
      include: {
        camera: true
      },
      orderBy: {
        tsStart: 'desc'
      }
    })
    
    return NextResponse.json(incidents)
  } catch (error) {
    console.error('Failed to fetch incidents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch incidents' },
      { status: 500 }
    )
  }
}
