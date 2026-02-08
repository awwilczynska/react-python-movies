import {useState, useEffect} from "react";

export default function MovieForm(props) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [director, setDirector] = useState('');
    const [description, setDescription] = useState('');
    const [actors, setActors] = useState('');

    useEffect(() => {
        if (props.movie) {
            setTitle(props.movie.title || '');
            setYear(props.movie.year || '');
            setDirector(props.movie.director || '');
            setDescription(props.movie.description || '');
            setActors(props.movie.actors || '');
        }
    }, [props.movie]);

    function submitMovie(event) {
        event.preventDefault();
        if (title.length < 5) {
            return alert('Tytuł jest za krótki');
        }
        const movieData = props.movie ? {...props.movie, title, year, director, description, actors} : {title, year, director, description, actors};
        props.onMovieSubmit(movieData);
        if (!props.movie) {
            setTitle('');
            setYear('');
            setDirector('');
            setDescription('');
            setActors('');
        }
    }

    return <form onSubmit={submitMovie}>
        <h2>{props.movie ? 'Edit movie' : 'Add movie'}</h2>
        <div>
            <label>Title</label>
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
        </div>
        <div>
            <label>Year</label>
            <input type="text" value={year} onChange={(event) => setYear(event.target.value)}/>
        </div>
        <div>
            <label>Director</label>
            <input type="text" value={director} onChange={(event) => setDirector(event.target.value)}/>
        </div>
        <div>
            <label>Description</label>
            <textarea value={description} onChange={(event) => setDescription(event.target.value)}/>
        </div>
        <div>
            <label>Actors</label>
            <input type="text" value={actors} onChange={(event) => setActors(event.target.value)}/>
        </div>
        <div style={{display: 'flex', gap: '8px'}}>
            <button>{props.buttonLabel || (props.movie ? 'Save' : 'Submit')}</button>
            {props.onCancel && <button type="button" onClick={props.onCancel}>Cancel</button>}
        </div>
    </form>;
}
