import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clean the database
  await prisma.incident.deleteMany({})
  await prisma.camera.deleteMany({})

  // Create cameras
  const shopFloor = await prisma.camera.create({
    data: {
      name: 'Camera A',
      location: 'Shop Floor A',
    },
  })

  const vault = await prisma.camera.create({
    data: {
      name: 'Camera B',
      location: 'Vault',
    },
  })

  const entrance = await prisma.camera.create({
    data: {
      name: 'Camera C',
      location: 'Entrance',
    },
  })

  // Helper function to create a random date within the last 24 hours
  const randomDateInLast24Hours = () => {
    const now = new Date()
    const hours = Math.floor(Math.random() * 24)
    const start = new Date(now.getTime() - hours * 60 * 60 * 1000)
    return start
  }

  // Helper function to create an end timestamp 2-10 minutes after start
  const createEndTime = (startTime: Date) => {
    const minutesLater = Math.floor(Math.random() * 8) + 2 // 2-10 minutes
    return new Date(startTime.getTime() + minutesLater * 60 * 1000)
  }

  // Create incidents
  const incidentTypes = ['Unauthorised Access', 'Gun Threat', 'Face Recognised', 'Suspicious Activity']

  // Create incidents for Shop Floor A
  await prisma.incident.create({
    data: {
      type: 'Unauthorised Access',
      tsStart: new Date('2025-07-07T14:35:00Z'),
      tsEnd: new Date('2025-07-07T14:37:00Z'),
      thumbnailUrl: '/images/2d61c6d57a0506c072247037f364f25458f0f036.png',
      cameraId: shopFloor.id,
    },
  })

  await prisma.incident.create({
    data: {
      type: 'Gun Threat',
      tsStart: new Date('2025-07-07T14:35:00Z'),
      tsEnd: new Date('2025-07-07T14:37:00Z'),
      thumbnailUrl: '/images/face-recognised-1.jpg',
      cameraId: shopFloor.id,
    },
  })

  await prisma.incident.create({
    data: {
      type: 'Unauthorised Access',
      tsStart: new Date('2025-07-07T14:35:00Z'),
      tsEnd: new Date('2025-07-07T14:37:00Z'),
      thumbnailUrl: '/images/face-recognised-1.jpg',
      cameraId: shopFloor.id,
    },
  })

  await prisma.incident.create({
    data: {
      type: 'Unauthorised Access',
      tsStart: new Date('2025-07-07T14:35:00Z'),
      tsEnd: new Date('2025-07-07T14:37:00Z'),
      thumbnailUrl: '/images/face-recognised-1.jpg',
      cameraId: shopFloor.id,
    },
  })

  // Create incidents for Vault
  await prisma.incident.create({
    data: {
      type: 'Unauthorised Access',
      tsStart: new Date('2025-07-07T03:12:00Z'),
      tsEnd: new Date('2025-07-07T03:15:00Z'),
      thumbnailUrl: '/images/face-recognised-1.jpg',
      cameraId: vault.id,
    },
  })

  await prisma.incident.create({
    data: {
      type: 'Face Recognised',
      tsStart: new Date('2025-07-07T04:20:00Z'),
      tsEnd: new Date('2025-07-07T04:25:00Z'),
      thumbnailUrl: '/images/face-recognised-1.jpg',
      cameraId: vault.id,
    },
  })

  await prisma.incident.create({
    data: {
      type: 'Suspicious Activity',
      tsStart: new Date('2025-07-07T05:45:00Z'),
      tsEnd: new Date('2025-07-07T05:50:00Z'),
      thumbnailUrl: '/images/face-recognised-1.jpg',
      cameraId: vault.id,
    },
  })

  await prisma.incident.create({
    data: {
      type: 'Gun Threat',
      tsStart: new Date('2025-07-07T06:30:00Z'),
      tsEnd: new Date('2025-07-07T06:32:00Z'),
      thumbnailUrl: '/images/face-recognised-1.jpg',
      cameraId: vault.id,
    },
  })

  // Create incidents for Entrance
  await prisma.incident.create({
    data: {
      type: 'Face Recognised',
      tsStart: new Date('2025-07-07T08:15:00Z'),
      tsEnd: new Date('2025-07-07T08:20:00Z'),
      thumbnailUrl: '/images/face-recognised-1.jpg',
      cameraId: entrance.id,
    },
  })

  await prisma.incident.create({
    data: {
      type: 'Unauthorised Access',
      tsStart: new Date('2025-07-07T09:45:00Z'),
      tsEnd: new Date('2025-07-07T09:47:00Z'),
      thumbnailUrl: '/images/face-recognised-1.jpg',
      cameraId: entrance.id,
    },
  })

  await prisma.incident.create({
    data: {
      type: 'Suspicious Activity',
      tsStart: new Date('2025-07-07T10:30:00Z'),
      tsEnd: new Date('2025-07-07T10:35:00Z'),
      thumbnailUrl: '/images/face-recognised-1.jpg',
      cameraId: entrance.id,
    },
  })

  await prisma.incident.create({
    data: {
      type: 'Gun Threat',
      tsStart: new Date('2025-07-07T11:55:00Z'),
      tsEnd: new Date('2025-07-07T12:00:00Z'),
      thumbnailUrl: '/images/face-recognised-1.jpg',
      cameraId: entrance.id,
      resolved: true,
    },
  })

  await prisma.incident.create({
    data: {
      type: 'Face Recognised',
      tsStart: new Date('2025-07-07T14:45:00Z'),
      tsEnd: new Date('2025-07-07T14:47:00Z'),
      thumbnailUrl: '/images/face-recognised-1.jpg',
      cameraId: entrance.id,
      resolved: true,
    },
  })

  await prisma.incident.create({
    data: {
      type: 'Traffic congestion',
      tsStart: new Date('2025-07-07T16:30:00Z'),
      tsEnd: new Date('2025-07-07T16:45:00Z'),
      thumbnailUrl: '/images/face-recognised-1.jpg',
      cameraId: entrance.id,
      resolved: true,
    },
  })

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
