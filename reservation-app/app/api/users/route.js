import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
    if (prisma === null) {
        console.error('Prisma client is not initialized');
        return NextResponse.json({ error: 'Prisma client is not initialized' }, { status: 500 });
    }
    try {
        const users = await prisma.reservation.findMany({
            select: {
                name: true,
            },
            distinct: ['name'],
        });
        
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}