import { Cassette } from './Cassette.js';
import React, { useState, useEffect } from "react";

import arrow1 from "./arrows/arrow1.svg";
import arrow2 from "./arrows/arrow2.svg";
import arrow3 from "./arrows/arrow3.svg";
import arrow4 from "./arrows/arrow4.svg";
import arrow5 from "./arrows/arrow5.svg";
import arrow6 from "./arrows/arrow6.svg";
import arrow7 from "./arrows/arrow7.svg";

import { Color2RGB } from "../utils.js";

export const CassetteAnatomy = (props) => {

    const [model, setModel] = useState();

    const [colors, setColors] = useState(null);
    const [artwork, setArtwork] = useState(null);

    useEffect(() => {

        if (props.showAnatomy){
            document.querySelector(".loading_anim").style.opacity = 0;
        }

    }, [props.showAnatomy]);

    useEffect(() => {
    }, []);

    useEffect(() => {
        if (props.songs === undefined) return;
        try {
            if (props.songs === undefined) return;

            // No audio features
            for (const d of props.songs) {
                if (d.audio_features === undefined) {
                    return;
                }
            }

            setModel(
                <Cassette
                    songs={props.songs}
                    setSongs={(songs) => { }}
                    songId={props.song ? props.song.id : props.currentItemId}
                    key={props.song ? props.song.id : props.currentItemId}
                    setCurrentItemId={(id) => { }}
                    currentItemId={props.currentItemId}
                    shift={-props.currentItemId}
                    isFullscreen={false}
                    setFullscreen={() => { }}
                    timeRange={"short_term"}
                    isModalOpen={false}
                    isPosing={false}
                />
            );

            setColors(props.songs[props.currentItemId].calc_palette);
            setArtwork(props.songs[props.currentItemId].artwork);

        } catch (error) {
            console.log(error);
        }
    }, [props.songs, props.song, props.currentItemId]);

    return (
        <div className="cassetteAnatomy" style={{ display: props.showAnatomy ? "flex" : "none" }}>
            <button className="closeAnatomy round_btn"
                style={{ 
                    width: "50px", 
                    height: "50px", 
                    fontSize: "20px",
                    display: "flex", 
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: "40px",
                }}
                onClick={() => { 
                    props.setShowAnatomy(false);
                    props.setIsLoading(false);

                }}>
                􀑧
            </button>

            <span className="anatomy-label text name">Song Name
                <img src={arrow1} className="follow_arrow" alt="Song Name Arrow" />
                <span className="tooltip left top">This is the name of the song.</span>
            </span>
            <span className="anatomy-label text artist">Artist Name
                <img src={arrow2} className='follow_arrow' alt="Artist Name Arrow" />
                <span className="tooltip left top">This is the name of the artist.</span>
            </span>
            <span className="anatomy-label text brand">Brand
                <img src={arrow3} className='follow_arrow' alt="Brand Arrow" />
                <span className="tooltip left top">
                    The tapes brand is determined by the song's acousticness, energy and danceability.
                </span>
            </span>
            <span className="anatomy-label text tempo">Tempo
                <img src={arrow4} className='follow_arrow' alt="Tempo Arrow" />
                <span className="tooltip bottom left">
                    The reel speed is the tempo of the song in beats per minute (BPM).
                </span>
            </span>
            <span className="anatomy-label text material">
                <img src={arrow5} className='follow_arrow' alt="Material Arrow" />
                Material

                <span className="tooltip bottom right">
                    The material is determined by the song's instrumentalness.
                </span>
            </span>
            <span className="anatomy-label text colors">
                <img src={arrow6} className='follow_arrow' alt="Artwork Pallette Arrow" />
                Artwork Pallette
                <span className="tooltip top right">
                    The cassette label colors are determined by the song's artwork main colors.
                    {
                        artwork !== null ? (
                            <div className="artwork_cover">
                                <img src={artwork} alt="Artwork" />
                            </div>
                        ) : null
                    }

                    {
                        colors !== null ? (
                            <div className="artwork_pallette">
                                <div className="artwork_pallette_color" style={{ backgroundColor: Color2RGB(colors[0]) }}></div>
                                <div className="artwork_pallette_color" style={{ backgroundColor: Color2RGB(colors[1]) }}></div>
                                <div className="artwork_pallette_color" style={{ backgroundColor: Color2RGB(colors[2]) }}></div>
                                <div className="artwork_pallette_color" style={{ backgroundColor: Color2RGB(colors[3]) }}></div>
                                <div className="artwork_pallette_color" style={{ backgroundColor: Color2RGB(colors[4]) }}></div>
                            </div>
                        ) : null
                    }

                </span>
            </span>
            <span className="anatomy-label text key">
                <img src={arrow7} className='follow_arrow' alt="Key Arrow" />
                Key
                <span className="tooltip top right">
                    The key is determined by the song's tonality.
                </span>
            </span>
            <div className="cassetteAnatomyContent">
                {model}
            </div>
        </div>);
};
