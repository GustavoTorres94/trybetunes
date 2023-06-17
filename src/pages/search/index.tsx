import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';
import Loading from '../../components/loading';

function Search() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [albuns, setAlbuns] = useState<AlbumType[]>([]);
  const [title, setTitle] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleClick = async () => {
    setLoading(true);
    const allAlbuns = await searchAlbumsAPI(value);
    if (allAlbuns.length === 0) {
      setAlbuns([]);
      setTitle(value);
    } else {
      setAlbuns(allAlbuns);
      setTitle(value);
    }
    setValue('');
    setLoading(false);
  };

  const validateButton = () => value.length > 1;

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <input
        data-testid="search-artist-input"
        type="text"
        name="search"
        id="input-search"
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="search-artist-button"
        disabled={ !validateButton() }
        onClick={ handleClick }
      >
        Procurar
      </button>
      {albuns.length > 0 ? (
        <div>
          <h1>
            Resultado de álbuns de:
            {' '}
            { title }
          </h1>
          <ul>
            {albuns.map((e, i) => (
              <li key={ i }>
                <h2>{ e.artistName }</h2>
                <img src={ e.artworkUrl100 } alt={ e.collectionName } />
                <h3>{ e.collectionName }</h3>
                <Link
                  data-testid={ `link-to-album-${e.collectionId}` }
                  to={ `/album/${e.collectionId}` }
                >
                  Detalhes
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (title !== '' && <h1>Nenhum álbum foi encontrado</h1>)}
    </div>
  );
}

export default Search;
