'use client'

import { useState } from "react";

export default function Home() {

  const [inputValue, setInputValue] = useState('');
  const [shows, setShows] = useState([]);

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
        setShows(data);
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
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {shows.length > 0 ? (
          shows.map((show: any) => (
              <div key={show.id} className="p-4">
                <img
                  src={show.img}
                  alt={show.name}
                  className="w-full h-auto object-cover rounded-md mb-2"
                />
                <h3 className="text-md font-semibold truncate">{show.name}</h3>
              </div>
          ))
        ) : (
          <div>No results to show..</div>
        )}
      </div>
    </div>

  );
}
