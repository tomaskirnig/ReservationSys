# ReservationSys

A simple room booking system built with Next.js and React, featuring an interactive calendar view, lesson creation, and user lesson lookup.

## Features

- 📅 Interactive calendar interface with day view
- 🏫 Room selection (Hlavní, Tiberius, Benedikt)
- ✏️ Add lessons with start/end times
- 🔍 Search for lessons by user name
- 🇨🇿 cz Czech language support

## Technology Stack

**Frontend:** Next.js, React, Bootstrap  
**UI Components:** FullCalendar, Flatpickr, React Bootstrap  
**Database:** PostgreSQL with Prisma ORM  
**API:** Next.js API routes

## Getting Started

### Installation

1. Clone the repository

    ```bash
    git clone https://github.com/yourusername/ReservationSys.git
    cd ReservationSys/reservation-app
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Set up environment variables

    ```bash
    cp .env.example .env
    # Edit .env with your database connection string
    ```

4. Set up the database

    ```bash
    npx prisma migrate dev
    npx prisma generate
    ```

5. Start the development server

    ```bash
    npm run dev
    ```

## Usage

- **Main Page:** View and add lessons in calendar view
- **Add Lesson:** Click "Add Lesson" to create a new reservation
- **My Lessons:** Navigate to "See My Lessons" to find lessons by name

## License

MIT

## Author

Your Name
