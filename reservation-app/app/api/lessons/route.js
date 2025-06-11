import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';
import { getColor } from '../../utils/ColorDispensor';

export async function GET(request) {
  try {
    console.log('Received GET request for lessons');
    if (prisma === null) {
      console.error('Prisma client is not initialized');
      return NextResponse.json({ error: 'Prisma client is not initialized' }, { status: 500 });
    }
    const { searchParams } = new URL(request.url);
    const day = searchParams.get('day');
    const selectedRoom = searchParams.get('room');
    
    console.log(`API Request:${day} room: ${selectedRoom} }`);
    
    if (!day) {
      return NextResponse.json({ error: 'Day parameter is required' }, { status: 400 });
    }

    if (!selectedRoom) {
      return NextResponse.json({ error: 'Room parameter is required' }, { status: 400 });
    }
    
    const startOfDay = new Date(day);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(day);
    endOfDay.setHours(23, 59, 59, 999);
    
    console.log(`Querying from ${startOfDay.toISOString()} to ${endOfDay.toISOString()}`);
    
    // Query the database using Prisma
    const reservations = await prisma.reservation.findMany({
      where: {
        startTime: {
          gte: startOfDay,
          lte: endOfDay,
        },
        room: selectedRoom
      },
    });
    
    console.log(`Found ${reservations.length} reservations`);

    // Transform to FullCalendar event format
    const events = reservations.map(res => {
    const { bg, border } = getColor();
    
    return {
      id: res.id,
      title: res.name, 
      start: res.startTime.toISOString(),
      end: res.endTime.toISOString(),
      backgroundColor: bg,
      borderColor: border,
      extendedProps: {
        room: res.room,
        nameProam: res.nameProam
      }
    };
  });
    
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return NextResponse.json({ error: 'Failed to fetch lessons: ' + error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.start || !data.end || !data.room) {
      return NextResponse.json(
        { error: 'Missing required fields: name, start, end, room' }, 
        { status: 400 }
      );
    }
    
    // Convert field names to match schema
    const reservation = await prisma.reservation.create({
      data: {
        name: data.name,
        nameProam: data.nameProam || null,
        startTime: new Date(data.start),
        endTime: new Date(data.end),
        room: data.room
      }
    });
    
    return NextResponse.json(reservation);
  } catch (error) {
    console.error('Error creating lesson:', error);
    return NextResponse.json({ error: 'Failed to create lesson' }, { status: 500 });
  }
}