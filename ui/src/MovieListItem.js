export default function MovieListItem(props) {
    return (
        <div>
            <div>
                <strong>{props.movie.title}</strong>
                {' '}
                <span>({props.movie.year})</span>
                {' '}
                directed by <strong>{props.movie.director}</strong>
                {' '}
                <a onClick={props.onDelete}>Delete</a>
                {' '}
                <a onClick={props.onEdit}>Edit</a>
            </div>
            {props.movie.actors && <div><strong>Actors: </strong>{props.movie.actors}</div>}
            <div><em>{props.movie.description}</em></div>
        </div>
    );
}
