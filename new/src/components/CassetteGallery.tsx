import React, { useEffect } from 'react';
import { Song } from '@/app/page';
import { Cassette } from './Cassette';

const CassetteGallery = ({ songs }: { songs: Song[] }) => {
    return (
        <div className="h-screen w-screen flex items-center scale-75 pt-[500px]">
            {songs.map((song, index) => {
                return <Cassette key={index} song={song} shift={-8} />;
            })}
        </div>
    );
};

export default CassetteGallery;
