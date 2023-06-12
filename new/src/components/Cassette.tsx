import React, { useState } from 'react';
import { Song } from '@/app/page';
import { Screws } from './Screws';
import { Reels } from './Reels';
import { Shadows } from './Shadows';
import { Cover } from './Cover';
import { Faces } from './Faces';

const tdkLogoURL = '/tdk.svg';

export const Cassette = ({ song, shift }: { song: Song; shift: number }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hover, setHover] = useState(false);

    const reel_speed = 1;
    const cassetteShift = song.id - 1 + shift;

    // useEffect(() => {
    //     if (isPlaying) {
    //         props.setCurrentItemId(props.id);
    //     } else {
    //         if (props.currentItemId === props.id) {
    //             props.setCurrentItemId(null);
    //         } else if (props.currentItemId != null) {
    //             props.setCurrentItemId(props.currentItemId);
    //         }
    //     }
    // }, [isPlaying, props]);
    // useEffect(() => {
    //     if (props.currentItemId === props.id) {
    //         setIsPlaying(true);
    //     } else {
    //         setIsPlaying(false);
    //     }
    // }, [props.currentItemId, props]);
    // useEffect(() => {
    //     if (hover) {
    //         document.body.style.backgroundColor = props.bg_color;
    //     }
    // }, [hover, props]);

    return (
        <div
            className={['cassette', isPlaying ? 'playing' : ''].join(' ')}
            style={{
                transform: `translate3d(${cassetteShift * -100}px, ${
                    cassetteShift * 10
                }px, 0)`,
                transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => {
                setIsPlaying(!isPlaying);
            }}
        >
            <Shadows isPlaying={isPlaying} hover={hover} />
            <div
                className="cassette-scene"
                style={{
                    transform: isPlaying
                        ? `perspective(10000px) rotateX(85deg) rotateZ(390deg) translateZ(24vw) rotateY(0deg) scale3d(1.4, 1.4, 1.4)`
                        : `perspective(10000px) rotateX(80deg) rotateZ(40deg) translateZ(${
                              hover ? 4 : 0
                          }vw)`,
                }}
            >
                <div className="cassette-shape">
                    <div className="case-scene">
                        <Label song={song} />
                        <Faces />
                    </div>
                    <Reels
                        isPlaying={isPlaying}
                        hover={hover}
                        reel_speed={reel_speed}
                        song={song}
                    />
                    <Cover />
                    <Screws />
                </div>
            </div>
        </div>
    );
};

const Label = ({ song }: { song: Song }) => {
    return (
        <div className="ft face">
            <div className="full-mask">
                <div className="text-ellipsis overflow-hidden whitespace-nowrap h-[80%]">
                    <span>
                        {song.name}
                        <br />
                        <span className="song_artist_album">
                            {song.artist} {song.album ? '-' : ''} {song.album}
                        </span>
                    </span>
                    <br />
                    <br />
                    <img
                        src={tdkLogoURL}
                        alt="TDK Logo"
                        width="60"
                        height="60"
                        style={{
                            margin: '0 auto',
                            position: 'relative',
                            bottom: '-6px',
                            left: '0px',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
