import Link from "next/link";
import { MappedShowData } from "../api/shows/mapper";

interface ShowlistProps {
  shows: MappedShowData[]
}

export function ShowList({ shows }: ShowlistProps) {
  return (
    <div className="space-y-4">
      {
        shows.map((show: any) => (
          <Link href={`/shows/${show.id}`} key={show.id}>
            <div key={show.id} className="flex items-center space-x-4 p-2 hover:bg-gray-100">
              <img
                src={show.img}
                alt={show.name}
                className="w-12 h-16 object-cover rounded-md"
              />

              <div>
                <h3 className="text-xl font-semibold">{show.name}</h3>
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  )
}