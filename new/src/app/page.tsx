'use client';

import CassetteGallery from '@/components/CassetteGallery';
import PlayerControls from '@/components/PlayerControls';

export type Song = {
    id: number;
    name: string;
    album: string;
    artist: string;
    bg_color: string;
    url: string;
};

let songs = [
    {
        id: 1,
        name: 'Nos Siguen Pegando Abajo',
        album: 'Clics modernos',
        artist: 'Charly García',
        bg_color: '#4cb8f5',
        url: '/audios/Nos Siguen Pegando Abajo.mp3',
    },
    {
        id: 2,
        name: 'Promesas Sobre El Bidet',
        album: 'Piano Bar',
        artist: 'Charly García',
        bg_color: '#a6e630',
        url: '/audios/Promesas Sobre El Bidet.mp3',
    },
    {
        id: 3,
        name: 'Hablando a Tu Corazón',
        album: 'Tango',
        artist: 'Charly García',
        bg_color: '#f5e82f',
        url: '/audios/Hablando a Tu Corazon.mp3',
    },
    {
        id: 4,
        name: 'No Voy en Tren',
        album: 'Parte de la religión',
        artist: 'Charly García',
        bg_color: '#E75776',
        url: '/audios/No Voy en Tren.mp3',
    },
    {
        id: 5,
        name: 'La Grasa de las Capitales',
        album: 'La Grasa de las Capitales',
        artist: 'Serú Girán',
        bg_color: '#E75776',
        url: '/audios/La Grasa de las Capitales.mp3',
    },
];

const formatedTime = (time: number) => {
    // Format from seconds to mm:ss
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

export default function Home() {
    return (
        <main className="">
            {/* <PlayerControls /> */}
            <CassetteGallery songs={songs} />
        </main>
    );
}
