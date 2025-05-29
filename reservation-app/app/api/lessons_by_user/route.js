import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userName = searchParams.get('user');
  
  if (!userName) {
    return NextResponse.json({ error: 'User name is required' }, { status: 400 });
  }
  
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        name: userName
      },
      orderBy: {
        startTime: 'asc'
      }
    });
    
    // Transform data for frontend
    const lessons = reservations.map(res => ({
      id: res.id,
      startTime: res.startTime,
      endTime: res.endTime,
      room: res.room,
      name: res.name,
      nameProame: res.nameProame,
    }));
    
    return NextResponse.json(lessons);
  } catch (error) {
    console.error('Error fetching lessons by user:', error);
    return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 });
  }
}