import bcrypt from 'bcrypt';
import  prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { email, name, password } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword,
        } as any,
    });
    return NextResponse.json(user, {
        status: 201,
        statusText: 'Created',
    });
}