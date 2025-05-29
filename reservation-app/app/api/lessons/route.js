import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const day = searchParams.get('day');
    
    if (!day) {
      return NextResponse.json({ error: 'Day parameter is required' }, { status: 400 });
    }
    
    // Get start and end of the specified day
    const startOfDay = new Date(`${day}T00:00:00`);
    const endOfDay = new Date(`${day}T23:59:59`);
    
    // Query the database using Prisma
    const reservations = await prisma.reservation.findMany({
      where: {
        startTime: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: {
        startTime: 'asc'
      }
    });
    
    // Transform to FullCalendar event format
    const events = reservations.map(res => ({
      id: res.id,
      title: res.name,
      start: res.startTime.toISOString(),
      end: res.endTime.toISOString(),
      extendedProps: {
        room: res.room,
        nameProam: res.nameProam
      }
    }));
    
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 });
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