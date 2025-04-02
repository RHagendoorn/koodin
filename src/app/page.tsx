'use client'

import { useState } from "react";
import { ShowList } from "./components/showlist";
import { MappedShowData } from "./api/shows/mapper";

export default function Home() {

  const [inputValue, setInputValue] = useState('');
  const [genres, setGenres] = useState<Record<string, MappedShowData[]>>({});

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
      <div className="flex mx-auto sm:gap-4 flex-col sm:flex-row">
        <input
          type="text"
          placeholder="Type here to search for your favorite show.."
          className="grow max-w-lg px-4 py-2 border pd-200 border-gray-300 rounded-md bg-white block my-5"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handlePress}
        />
        <button className="font-semibold" onClick={handleSearch}>Search</button>
      </div>

			<div>
				{ 
					Object.keys(genres).length ? Object.entries(genres).map(([genre, shows]) => 
						<div key={genre} className="bg-white shadow-lg rounded-lg m-4 p-4">
							<h1 className="font-extrabold text-lg">{genre}</h1>
							<ShowList shows={shows}></ShowList>
						</div>
					) : <div>No results to show..</div>
				}
			</div>
    </div>
  );
}
