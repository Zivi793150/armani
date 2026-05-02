import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';

// GET /api/portfolio - получить все проекты
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    
    // Build query
    const query: any = {};
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    
    const projects = await Portfolio.find(query)
      .sort({ createdAt: -1 })
      .select('-__v');
    
    return NextResponse.json({ success: true, data: projects }, { status: 200 });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch portfolio items' },
      { status: 500 }
    );
  }
}

// POST /api/portfolio - создать новый проект (только для админа)
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'slug', 'location', 'category', 'area'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Check if slug already exists
    const existingProject = await Portfolio.findOne({ slug: body.slug });
    if (existingProject) {
      return NextResponse.json(
        { success: false, error: 'Project with this slug already exists' },
        { status: 409 }
      );
    }
    
    const project = await Portfolio.create(body);
    
    return NextResponse.json(
      { success: true, data: project },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating portfolio:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create portfolio item' },
      { status: 500 }
    );
  }
}
