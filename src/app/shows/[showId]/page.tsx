import { mapper } from "@/app/api/shows/[showId]/mapper";

interface ShowDetailsProps {
	params: { showId: string };
};

export default async function ShowDetails({ params }: ShowDetailsProps) {
	const { showId } = params;

	const data = await fetch(`https://api.tvmaze.com/shows/${showId}`)
		.then((res) => res.json())

	const show = mapper(data)

	return (
		<div className="flex sm:flex-nowrap flex-wrap-reverse gap-4 mx-8">
			<img
				src={show.img}
				alt={show.name}
				className="object-cover mb-2 flex-1/2"
			/>
			<div className="flex-1/2">
				<h3 className="font-bold text-lg">{show.name}</h3>
				<p className="font-medium text-md italic">{show.genres.join(', ')}</p>
				<p className="font-semibold text-md">{show.language}</p>
				<p className="" dangerouslySetInnerHTML={{ __html: show.summary }}></p>
			</div>
		</div>
	);
}
