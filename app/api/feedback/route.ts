import { createFeedback } from '@/lib/actions/general.action';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { interviewId, userId, transcript } = await request.json();
    const result = await createFeedback({ interviewId, userId, transcript });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Feedback creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create feedback' },
      { status: 500 }
    );
  }
}