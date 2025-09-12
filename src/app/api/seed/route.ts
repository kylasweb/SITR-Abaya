import { seedDatabase } from '@/lib/seed';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Simple security check to prevent accidental runs in production
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Seeding is only allowed in development mode.' }, { status: 403 });
  }

  try {
    const count = await seedDatabase();
    return NextResponse.json({ success: true, message: `${count} products have been successfully seeded.` });
  } catch (error) {
    console.error('Failed to seed database:', error);
    return NextResponse.json({ success: false, error: 'Failed to seed database.' }, { status: 500 });
  }
}
