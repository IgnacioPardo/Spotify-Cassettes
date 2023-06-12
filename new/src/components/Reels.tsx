import { Song } from '@/app/page';
import React from 'react';

const Reel = ({
    isPlaying, hover, reel_speed, song, id,
}: {
    isPlaying: boolean;
    hover: boolean;
    reel_speed: number;
    song: Song;
    id: number;
}) => {
    return (
        <div className="reel-scene" id={`reel-scene${id}`}>
            <div
                className="reel-shape cylinder-2 cyl-2"
                style={{
                    animation: isPlaying || hover
                        ? `spin ${reel_speed}s linear infinite`
                        : 'unset',
                    backgroundColor: song.bg_color,
                }}
            >
                <div className="reel-face bm">
                    <div className="reel-circle">
                        <div className="reel-teeth tooth0" />
                        <div className="reel-teeth tooth1" />
                        <div className="reel-teeth tooth2" />
                    </div>
                </div>
                <div className="reel-face tp" />
                <div className="reel-face side s0" />
                <div className="reel-face side s1" />
                <div className="reel-face side s2" />
                <div className="reel-face side s3" />
                <div className="reel-face side s4" />
                <div className="reel-face side s5" />
                <div className="reel-face side s6" />
                <div className="reel-face side s7" />
                <div className="reel-face side s8" />
                <div className="reel-face side s9" />
                <div className="reel-face side s10" />
                <div className="reel-face side s11" />
                <div className="reel-face side s12" />
                <div className="reel-face side s13" />
                <div className="reel-face side s14" />
                <div className="reel-face side s15" />
                <div className="reel-face side s16" />
                <div className="reel-face side s17" />
                <div className="reel-face side s18" />
                <div className="reel-face side s19" />
            </div>
        </div>
    );
};
export const Reels = ({
    isPlaying, hover, reel_speed, song,
}: {
    isPlaying: boolean;
    hover: boolean;
    reel_speed: number;
    song: Song;
}) => {
    return (
        <>
            <Reel
                id={1}
                isPlaying={isPlaying}
                hover={hover}
                song={song}
                reel_speed={reel_speed} />
            <Reel
                id={2}
                isPlaying={isPlaying}
                hover={hover}
                song={song}
                reel_speed={reel_speed} />
        </>
    );
};
