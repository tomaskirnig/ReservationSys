import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
    if (prisma === null) {
        console.error('Prisma client is not initialized');
        return NextResponse.json({ error: 'Prisma client is not initialized' }, { status: 500 });
    }
    
    try {
        const { searchParams } = new URL(request.url);
        const user = searchParams.get('user');
    
        if (!user) {
        return NextResponse.json({ error: 'User parameter is required' }, { status: 400 });
        }
    
        const lessons = await prisma.reservation.findMany({
        where: {
            name: user,
        },
        orderBy: {
            startTime: 'asc',
        },
        });
    
        return NextResponse.json(lessons);
    } catch (error) {
        console.error('Error fetching lessons by user:', error);
        return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 });
    }
}