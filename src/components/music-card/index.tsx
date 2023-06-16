// import { useState } from 'react';

type SongProps = {
  trackId: number;
  trackName: string;
  previewUrl:string;
  primaryGenreName: string;
};

function MusicCard({ trackName,
  previewUrl,
  trackId,
  primaryGenreName }: SongProps) {
  return (
    <div>
      <p>{ trackName }</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>{trackId}</code>
      </audio>
      <p>{ primaryGenreName }</p>
    </div>
  );
}

export default MusicCard;
