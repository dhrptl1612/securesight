# SecureSight CCTV Monitoring Dashboard

A modern dashboard for monitoring CCTV feeds with computer vision models that detect security incidents such as unauthorized access, gun threats, and more.

## Features

- Real-time incident monitoring
- Incident player with multi-camera view
- Incident list with filtering and sorting
- Interactive timeline for navigating incidents
- Incident resolution workflow
- Responsive design for all device sizes

## Tech Stack

- **Frontend**: Next.js 15 with App Router, React, TypeScript, TailwindCSS
- **Backend**: Next.js API routes
- **Database**: Prisma ORM with SQLite (configurable for other databases)
- **State Management**: React Hooks for local state
- **Styling**: Tailwind CSS for responsive design

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/securesight.git
cd securesight
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up the database:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (dev mode)
npx prisma db push

# Seed the database with sample data
npx prisma db seed
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Production Build

```bash
# Build the application
npm run build
# or
yarn build

# Start the production server
npm start
# or
yarn start
```

### Docker Deployment

You can also deploy using Docker:

```bash
# Build the Docker image
docker build -t securesight .

# Run the container
docker run -p 3000:3000 securesight
```

## Database Configuration

SecureSight is configured to use SQLite by default, but you can switch to other databases by modifying the `prisma/schema.prisma` file:

### PostgreSQL

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### MySQL

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

Then set the `DATABASE_URL` environment variable accordingly.

## Tech Decisions

1. **Next.js App Router**: Used for its enhanced server-side rendering capabilities, improved routing system, and better developer experience.

2. **Prisma**: Chosen for its type-safe database access, simple schema migrations, and support for multiple database providers.

3. **TailwindCSS**: Provides utility-first CSS approach for rapid UI development and consistent design system.

4. **SQLite**: Selected for simplicity in development and portability, while maintaining the option to switch to more robust databases for production.

5. **React Hooks**: Used for state management instead of external libraries to keep the application lightweight, as the state requirements weren't overly complex.

6. **TypeScript**: Implemented throughout the application to provide type safety and improved developer experience.

## If I Had More Time...

- **Authentication**: Add user authentication and role-based permissions
- **Real-time Updates**: Implement WebSockets or Server-Sent Events for real-time incident notifications
- **Advanced Filtering**: Add more advanced filtering options for incidents
- **Export Functionality**: Add ability to export incidents as reports
- **Notification System**: Implement email/SMS/push notifications for critical incidents
- **Video Playback**: Replace static images with actual video playback for incidents
- **Historical Analysis**: Add analytics dashboard for historical incident trends
- **Mobile App**: Develop a companion mobile application for on-the-go monitoring
- **Integration with External Systems**: Connect with other security systems or alerting mechanisms
- **AI Improvements**: Add more sophisticated AI analysis for threat detection
- **Customizable Dashboard**: Allow users to customize their dashboard layout
- **Unit & Integration Tests**: Add comprehensive test coverage
