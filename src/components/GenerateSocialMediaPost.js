import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { toPng } from 'html-to-image';

import { Cassette } from './Cassette.js';

export const GenerateSocialMediaPostButton = (props) => {

    const postRef = useRef();
    const postContainerRef = useRef();

    const [post, setPost] = useState();

    const [image, setImage] = useState();
    const [showBtns, setShowBtns] = useState(false);

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

            // Generar una grafica con un Cassette para compartir en redes sociales
            // El cassette es el primero de la lista de canciones: props.songs[0]

            setPost(
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
                    isPosing={true}
                />
            );

        } catch (error) {
            console.log(error);
        }
    }, [props.songs, props.song, props.currentItemId]);


    return (
        <>
            <div className="social_media_post_container" ref={postContainerRef}
                style={{
                    display: showBtns ? "flex" : "none",
                    backgroundColor: showBtns ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0)",
                }}>

                <div className="social_media_post"
                    ref={postRef}
                    style={{
                        backgroundColor: props.songs[
                            props.song ? props.song.id : props.currentItemId
                        ].bg_color
                    }}>

                    <div className="social_media_post_header" s>
                        <h1 className="social_media_post_title">
                            {props.username === undefined ? "" : props.username + "'s "}
                            {props.username ? <br /> : ""}
                            <b>Spotify Cassettes 📼</b>
                        </h1>
                        <h2 className="social_media_post_subtitle">
                            Most listened song in the last {
                                props.timeRange === "short_term"
                                    ? "4 weeks"
                                    : props.timeRange === "medium_term"
                                        ? "6 months"
                                        : "several years"
                            }:
                        </h2>
                    </div>
                    {post}
                    <div className="social_media_post_footer">
                        <center>
                            <p className="social_media_post_footer_text">
                                Made with <b>Spotify Cassettes</b> 📼
                                <br />
                                Check it out at <a href="https://spotify-cassettes.vercel.app">spotify-cassettes.vercel.app</a>
                            </p>
                        </center>
                    </div>
                </div>
            </div>

            <div
                className="social_media_post_btns"
                style={{
                    display: showBtns ? "flex" : "none",
                    opacity: showBtns ? 1 : 0,
                }}
            >
                <button
                    className="social_download_btn round_btn"
                    onClick={(e) => {
                        e.preventDefault();
                        var link = document.createElement('a');
                        link.download = 'spotify-cassettes.png';
                        link.href = image;
                        link.click()
                    }}
                >
                    􀯴
                </button>

                <button
                    className="social_share_btn round_btn"
                    onClick={(e) => {
                        e.preventDefault();

                        if (navigator.share) {
                            navigator.share({
                                title: "Spotify Cassettes",
                                text: "Check out my Spotify Cassettes!",
                                files: [image],
                            })
                                .then(() => console.log('Successful share'))
                                .catch((error) => console.log('Error sharing', error));
                        }
                        else {
                            alert("Your browser doesn't support sharing. You can still download the image by clicking the download button.")
                        }
                    }}
                >
                    􀈠
                </button>

                <button
                    className="social_close_btn round_btn"
                    onClick={(e) => {
                        e.preventDefault();
                        // Make social media post invisible
                        postRef.current.style.display = "none";
                        props.setIsLoading(false);
                        setShowBtns(false);
                    }}
                >
                    􀃰
                </button>
            </div>

            <button
                className="social_gen_btn round_btn"
                onClick={(e) => {
                    e.preventDefault();

                    // Make social media post visible
                    props.setIsLoading(true);

                    postRef.current.style.display = "flex";
                    postContainerRef.current.style.display = "flex";
                    // postRef.current.style.opacity = 1;

                    toPng(postRef.current, { cacheBust: true, pixelRatio: 2 })
                        .then((dataUrl) => {

                            // var link = document.createElement('a');
                            // link.download = 'spotify-cassettes.png';
                            // link.href = dataUrl;
                            // link.click()

                            setImage(dataUrl);
                            setShowBtns(true);
                        })
                        .catch((error) => {
                            console.error('oops, something went wrong!', error);
                        });
                }}
                style={{
                    position: "absolute",
                    top: "45%",
                    right: "40px",
                    zIndex: "100",
                    display: showBtns ? "none" : "",
                }}
            >
                􀣵
            </button>
        </>
    );
};
