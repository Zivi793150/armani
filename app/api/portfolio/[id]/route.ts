import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';

// GET /api/portfolio/[id] - получить один проект по ID или slug
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    
    // Try to find by ID first, then by slug
    let project = await Portfolio.findById(id).select('-__v');
    
    if (!project) {
      project = await Portfolio.findOne({ slug: id }).select('-__v');
    }
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: project }, { status: 200 });
  } catch (error) {
    console.error('Error fetching portfolio item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch portfolio item' },
      { status: 500 }
    );
  }
}

// PUT /api/portfolio/[id] - обновить проект (только для админа)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    const body = await request.json();
    
    // Remove fields that shouldn't be updated directly
    delete body._id;
    delete body.createdAt;
    
    const project = await Portfolio.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).select('-__v');
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: project }, { status: 200 });
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update portfolio item' },
      { status: 500 }
    );
  }
}

// DELETE /api/portfolio/[id] - удалить проект (только для админа)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    
    const project = await Portfolio.findByIdAndDelete(id);
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: 'Project deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete portfolio item' },
      { status: 500 }
    );
  }
}
