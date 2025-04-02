import { NextRequest, NextResponse } from 'next/server';
import { mapper } from './mapper';

export interface showDetails {
  image: {
          medium?: string
  }
  genres: string[]
  language: string
  name: string
  id: number
  summary: string
  url: string
}

export async function GET(req: NextRequest, { params }: { params: { showId: string } }) {
  const { showId } = params; 

  if (!showId) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
    const data: showDetails = await response.json();

    const mappedData = mapper(data)

    return NextResponse.json(mappedData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch shows' }, { status: 500 });
  }
}
