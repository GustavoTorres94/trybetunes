import checked_heart from '../../images/checked_heart.png';
import empty_heart from '../../images/empty_heart.png';
import { SongProps } from '../../types';

function MusicCard({ trackName,
  previewUrl,
  trackId,
  primaryGenreName,
  favoriteSong,
  validateCheck }: SongProps) {
  return (
    <div>
      <h3>{ trackName }</h3>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>{trackId}</code>
      </audio>
      <p>{ primaryGenreName }</p>
      <label
        data-testid={ `checkbox-music-${trackId}` }
        htmlFor={ `favorite-check-${trackId}` }
      >
        {validateCheck(String(trackId))
          ? <img src={ checked_heart } alt="favorite" />
          : <img src={ empty_heart } alt="favorite" />}
        <input
          type="checkbox"
          name="input-check"
          id={ `favorite-check-${trackId}` }
          checked={ validateCheck(String(trackId)) }
          onChange={ () => favoriteSong(String(trackId)) }
        />
      </label>
    </div>
  );
}

export default MusicCard;
