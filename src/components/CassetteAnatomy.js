import { Cassette } from './Cassette.js';
import React, { useState, useEffect } from "react";

import arrow1 from "./arrows/arrow1.svg";
import arrow2 from "./arrows/arrow2.svg";
import arrow3 from "./arrows/arrow3.svg";
import arrow4 from "./arrows/arrow4.svg";
import arrow5 from "./arrows/arrow5.svg";
import arrow6 from "./arrows/arrow6.svg";
import arrow7 from "./arrows/arrow7.svg";

export const CassetteAnatomy = (props) => {

    const [model, setModel] = useState();

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
                    songId={0}
                    key={100}
                    setCurrentItemId={(id) => { }}
                    currentItemId={0}
                    shift={0}
                    isFullscreen={false}
                    setFullscreen={() => { }}
                    timeRange={"short_term"}
                    isModalOpen={false}
                    isPosing={false}
                />
            );

        } catch (error) {
            console.log(error);
        }
    }, [props.songs]);

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

            <span className="text name">Song Name
                <img src={arrow1} className="follow_arrow" />
            </span>
            <span className="text artist">Artist Name
                <img src={arrow2} className='follow_arrow' />
            </span>
            <span className="text brand">Brand
                <img src={arrow3} className='follow_arrow' />
            </span>
            <span className="text tempo">Tempo
                <img src={arrow4} className='follow_arrow' />
            </span>
            <span className="text material">
                <img src={arrow5} className='follow_arrow' />
                Material
            </span>
            <span className="text colors">
                <img src={arrow6} className='follow_arrow' />
                Artwork Pallette
            </span>
            <span className="text key">
                <img src={arrow7} className='follow_arrow' />
                Key
            </span>
            <div className="cassetteAnatomyContent">
                {model}
            </div>
        </div>);
};
