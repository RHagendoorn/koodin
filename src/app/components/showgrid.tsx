import Link from "next/link";
import { MappedShowData } from "../api/shows/mapper";

interface ShowgridProps {
	shows: MappedShowData[]
}

export function ShowGrid({ shows }: ShowgridProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
			{
				shows.map((show: any) => (
					<Link href={`/shows/${show.id}`}  key={show.id}>
						<div className="p-4 cursor-pointer">
							<img
								src={show.img}
								alt={show.name}
								className="w-full h-auto object-cover rounded-md mb-2"
							/>
							<h3 className="text-md font-semibold truncate">{show.name}</h3>
						</div>
					</Link>
				))
			}
		</div>
	)
}