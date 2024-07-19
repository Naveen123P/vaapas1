import React, { useState } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';
import { ClipLoader } from 'react-spinners';

function App() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (query.trim() === '') return;
        setLoading(true);
        const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
        const data = await response.json();
        setMovies(data.docs);
        setLoading(false)
        console.log(data)
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Movie Search</h1>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search for a movie..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
            </header>
            <main>
                <div className="movie-cards">
                    {loading ? (
                        <ClipLoader color="#32a852" size={50} />
                    ) : (
                        movies.map((movie) => (
                            <MovieCard key={movie.key} movie={movie} />
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;
