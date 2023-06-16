import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import { AlbumType, SongProps } from '../../types';
import MusicCard from '../music-card';

function Album() {
  const [loading, setLoading] = useState(false);
  const [music, setMusic] = useState<SongProps>([]);
  const [selectAlbum, setSelectAlmbum] = useState<AlbumType>({});
  const { id } = useParams();

  useEffect(() => {
    const musicList = async () => {
      setLoading(true);
      const getMusic = await getMusics(String(id));
      const [albumData, ...albumSongs] = getMusic;
      setMusic(albumSongs);
      setSelectAlmbum(albumData);
      setLoading(false);
    };
    musicList();
  }, [id]);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div>
      <p data-testid="artist-name">{selectAlbum.artistName}</p>
      <p data-testid="album-name">{selectAlbum.collectionName}</p>
      {music.map((e, i) => (
        <div key={ i }>
          <MusicCard
            trackName={ e.trackName }
            previewUrl={ e.previewUrl }
            trackId={ e.trackId }
            primaryGenreName={ e.primaryGenreName }
          />
        </div>
      ))}
    </div>
  );
}

export default Album;
