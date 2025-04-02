'use client'

import { useState } from "react";
import { ShowGrid } from "./components/showgrid";
import { MappedShowData } from "./api/shows/mapper";
import { ShowList } from "./components/showlist";

export default function Home() {

  const [inputValue, setInputValue] = useState('');
  const [genres, setGenres] = useState<Record<string, MappedShowData[]>>({});

	const [showGrid, setShowGrid] = useState(true)

  const handlePress = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') {
      return
    }
    handleSearch()
  };

  const handleSearch = async () => {
    if (!inputValue) return;

    try {
      const response = await fetch(`/api/shows?searchterm=${inputValue}`);
      const data = await response.json();

      if (response.ok) {
        setGenres(data);
      } else {
        console.error('Failed to fetch shows');
      }
    } catch (error) {
      console.error('Failed to fetch shows');
    }
  };

  return (
    <div>
      <div className="flex mx-auto flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Type here to search for your favorite show.."
          className="grow max-w-lg px-4 py-2 border pd-200 border-gray-300 rounded-md bg-white block my-5"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handlePress}
        />
				<div className="flex grow justify-between">
					<button className="font-semibold" onClick={handleSearch}>Search</button>
					<img src={showGrid ? 'list.svg' : 'grid.svg'} className="h-8 w-8 self-end cursor-pointer" onClick={() => setShowGrid(!showGrid)}></img>
				</div>
      </div>

			<div>
				{ 
					Object.keys(genres).length ? Object.entries(genres).map(([genre, shows]) => 
						<div key={genre} className="bg-white shadow-lg rounded-lg m-4 p-4 truncate">
							<h1 className="font-extrabold text-lg">{genre}</h1>
							{
								showGrid ?
								<ShowGrid shows={shows}></ShowGrid> :
								<ShowList shows={shows}></ShowList>
							}
						</div>
					) : <div>No results to show..</div>
				}
			</div>
    </div>
  );
}
