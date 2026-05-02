import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Category from '@/models/Category';

// GET /api/categories - получить все категории
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    const query: any = {};
    if (type) query.type = type;
    
    const categories = await Category.find(query)
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');
    
    return NextResponse.json({ success: true, data: categories }, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST /api/categories - создать новую категорию
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'slug', 'type'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Check if slug already exists
    const existingCategory = await Category.findOne({ slug: body.slug });
    if (existingCategory) {
      return NextResponse.json(
        { success: false, error: 'Category with this slug already exists' },
        { status: 409 }
      );
    }
    
    const category = await Category.create(body);
    
    return NextResponse.json(
      { success: true, data: category },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
