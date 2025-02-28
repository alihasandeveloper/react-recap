import Search from "./components/Search.jsx";
import {useEffect, useState} from "react";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_IMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        'accept': 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log(movieList);

    const fetchMovies = async () => {
        setLoading(true);
        setErrorMessage("");
        try {
            const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const movies = await response.json();
            if (!movies.results) {
                setErrorMessage(movies.error || 'Failed to fetch movies.');
                setMovieList([]);
                return;
            }
            setMovieList(movies.results);
        } catch (error) {
            console.error(`Failed to fetch movies: ${error.message}`);
            setErrorMessage('Error fetching movies. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <main>
            <div className='pattern'></div>
            <div className='wrapper'>
                <header>
                    <img src='./hero.png' alt='Hero'/>
                    <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </header>
                <section className='all-movies'>
                    {errorMessage && <p className='text-red-500'> {errorMessage}</p>}
                </section>
            </div>
        </main>
    );
};

export default App;
