import { NextResponse } from 'next/server';
import { mapper } from './mapper';

export interface showData {
	score: number
	show: {
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
}


export async function GET(request: Request) {
	const url = new URL(request.url);
	const searchterm = url.searchParams.get('searchterm');

	if (!searchterm) {
		return NextResponse.json({ error: 'Search term is required' }, { status: 400 });
	}

	try {
		const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchterm}`);
		const data: showData[] = await response.json();

		const mappedData = mapper(data)

		return NextResponse.json(mappedData);
	} catch (error) {
		return NextResponse.json({ error: 'Failed to fetch shows' }, { status: 500 });
	}
}
