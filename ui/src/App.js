import './App.css';
import {useEffect, useState} from "react";
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";

function App() {
    const [movies, setMovies] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(`/movies`);
            if (response.ok) {
                const movies = await response.json();
                setMovies(movies);
            }
        };
        fetchMovies();
    }, []);

    async function handleAddMovie(movie) {
        const response = await fetch('/movies', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            const movieWithId = await response.json();
            movie.id = movieWithId.id;
            setMovies([...movies, movie]);
            setAddingMovie(false);
        }
    }

    async function handleEditMovieSubmit(movie) {
        const url = `/movies/${movie.id}`;
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(movie),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            setMovies(movies.map(m => m.id === movie.id ? movie : m));
            setEditingMovie(null);
        }
    }

    async function handleDeleteMovie(movie) {
        if (!window.confirm('Are you sure you want to delete this movie?')) {
            return;
        }
        const url = `/movies/${movie.id}`;
        const response = await fetch(url, {
            method: 'DELETE'
        });
        if (response.ok) {
            setMovies(movies.filter(m => m !== movie));
        }
    }

    function handleEditMovie(movie) {
        setEditingMovie(movie);
        setAddingMovie(false);
    }

    function handleCancelEdit() {
        setEditingMovie(null);
    }

    function handleCancelAdd() {
        setAddingMovie(false);
    }

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            <h1>My favourite movies to watch</h1>
            <input
                type="text"
                placeholder="Search movie by title..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{marginBottom: 16, width: '100%', maxWidth: 400}}
            />
            <MoviesList
                movies={filteredMovies}
                onDeleteMovie={handleDeleteMovie}
                onEditMovie={handleEditMovie}
            />
            <button onClick={() => {
                setAddingMovie(true);
                setEditingMovie(null);
            }}>Add Movie</button>
            {addingMovie && (
                <MovieForm onMovieSubmit={handleAddMovie} buttonLabel="Add" onCancel={handleCancelAdd}/>
            )}
            {editingMovie && (
                <MovieForm
                    onMovieSubmit={handleEditMovieSubmit}
                    buttonLabel="Save"
                    movie={editingMovie}
                    onCancel={handleCancelEdit}
                />
            )}
        </div>
    );
}

export default App;
