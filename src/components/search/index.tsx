import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';

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
    return <h1>Carregando...</h1>;
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
          {albuns.map((e, i) => (
            <div key={ i }>
              <p>{ e.artistName }</p>
              <img src={ e.artworkUrl100 } alt={ e.collectionName } />
              <p>{ e.collectionName }</p>
              <Link
                data-testid={ `link-to-album-${e.collectionId}` }
                to={ `/album/${e.collectionId}` }
              >
                Detalhes
              </Link>
            </div>
          ))}
        </div>
      ) : (title !== '' && <h1>Nenhum álbum foi encontrado</h1>)}
    </div>
  );
}

export default Search;
