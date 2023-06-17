import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AlbumType, SongProps } from '../../types';
import getMusics from '../../services/musicsAPI';
import MusicCard from '../../components/music-card';
import Loading from '../../components/loading';

function Album() {
  const [loading, setLoading] = useState(false);
  const [music, setMusic] = useState<SongProps[]>([]);
  const [selectAlbum, setSelectAlmbum] = useState<AlbumType>({});
  const [favorite, setFavorite] = useState<string[]>([]);
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

  const favoriteSong = (songId: string) => {
    const checkSong = favorite.some((e) => e === songId);
    if (checkSong) {
      const removeSong = favorite.filter((e) => e !== songId);
      setFavorite(removeSong);
    } else {
      const addingSong = [...favorite, songId];
      setFavorite(addingSong);
    }
  };

  const validateCheck = (songId: string) => {
    const validation = favorite.some((e) => e === songId);
    return validation;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 data-testid="artist-name">{selectAlbum.artistName}</h2>
      <h3 data-testid="album-name">{selectAlbum.collectionName}</h3>
      <ul>
        {music.map((e, i) => (
          <li key={ i }>
            <MusicCard
              trackName={ e.trackName }
              previewUrl={ e.previewUrl }
              trackId={ e.trackId }
              primaryGenreName={ e.primaryGenreName }
              favoriteSong={ favoriteSong }
              validateCheck={ validateCheck }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Album;
