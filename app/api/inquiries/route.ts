import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';

// GET /api/inquiries - получить все заявки
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    const query: any = {};
    if (status) query.status = status;
    
    const inquiries = await Inquiry.find(query)
      .sort({ createdAt: -1 })
      .select('-__v');
    
    return NextResponse.json({ success: true, data: inquiries }, { status: 200 });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

// POST /api/inquiries - создать новую заявку
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone are required' },
        { status: 400 }
      );
    }
    
    const inquiry = await Inquiry.create(body);
    
    return NextResponse.json(
      { success: true, data: inquiry },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create inquiry' },
      { status: 500 }
    );
  }
}
