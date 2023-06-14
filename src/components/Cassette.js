import React, { useState, useEffect } from "react";

import { fetchTracksAudioFeatures } from "../spotify.js";
import ColorThief from "colorthief";
import { sortColorsByLuma, Color2RGB, noteByKey, colors } from "../utils.js";
import { BrandLogoByFeatures, BrandLogoByID } from "./BrandLogoByFeatures.js";

export const Cassette = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerPlaying, setPlayerPlaying] = useState(false);

  const [hover, setHover] = useState(false);
  const [song, setSong] = useState(props.songs[props.songId]);
  const [palette, setPallete] = useState(null);

  const [reel_speed, setReelSpeed] = useState(1);
  const [songKey, setSongKey] = useState("");

  const [isTranslucent, setIsTranslucent] = useState(false);
  const [isWhite, setIsWhite] = useState(false);
  const [isSpotifyGreen, setIsSpotifyGreen] = useState(false);

  const [shade, setShade] = useState(0);

  var shift = song.id - 1 + props.shift;

  useEffect(() => {

    var shades = [];

    //select all by data-shade
    document.querySelectorAll(`[data-shade]`).forEach((el) => {
      shades.push(el.getAttribute("data-shade"));
    });

    shades = shades.slice(0, shades.length - 1)

    // if shade is quantile 0-0.25, set to translucent
    // if shade is quantile 0.25-0.5, set to white
    // if shade is quantile 0.5-0.9, set to black
    // if shade is quantile 0.9-1, set to spotify green

    // calculate quantiles

    var shade_quantile = shades.filter((x) => x < shade).length / shades.length;

    if (shade_quantile < 0.25) {
      setIsTranslucent(true);
      setIsWhite(false);
      setIsSpotifyGreen(false);
    }
    else if (shade_quantile < 0.5) {
      setIsTranslucent(false);
      setIsWhite(true);
      setIsSpotifyGreen(false);
    }
    else if (shade_quantile < 0.9) {
      setIsTranslucent(false);
      setIsWhite(false);
      setIsSpotifyGreen(false);
    }
    else {
      setIsTranslucent(false);
      setIsWhite(false);
      setIsSpotifyGreen(true);
    }

    
    /* console.log({
      shade: shade,
      shade_quantile: shade_quantile,
      shades: shades,
    }) */
   
   
  }, [shade, props.timeRange]);

  useEffect(() => {
    if (song.audio_features) {
      setReelSpeed((100 / song.audio_features.tempo) * 2);
      setSongKey(noteByKey(song.audio_features.key));

      setShade(song.audio_features.instrumentalness + song.audio_features.speechiness);
    }

    if (song.calc_palette) {
      setPallete(song.calc_palette);
    }
  }, []);

  useEffect(() => {
    if (song.audio_features) {
      var my_shade =
        song.audio_features.instrumentalness + song.audio_features.speechiness;
      setShade(my_shade);
    }
  }, [song]);

  useEffect(() => {
    var searchParams = new URLSearchParams(window.location.search);
    // var song_update = props.songs[props.songId];
    if (searchParams.has("access_token")) {
      var accessToken = searchParams.get("access_token");
      if (song.spotify_id) {
        fetchTracksAudioFeatures(
          accessToken,
          [song.spotify_id],
          (trackAudioFeatures) => {
            var song_update = props.songs[props.songId];
            song_update.audio_features = trackAudioFeatures.audio_features[0];

            // console.log((100 / song.audio_features.tempo) * 2);
            // console.log(noteByKey(song.audio_features.key));

            setReelSpeed((100 / song.audio_features.tempo) * 2);
            setSongKey(noteByKey(song.audio_features.key));
            song_update.reel_speed = (100 / song.audio_features.tempo) * 2;
            song_update.key = noteByKey(song.audio_features.key);

            var my_shade =
              song.audio_features.instrumentalness +
              song.audio_features.speechiness;
            
            setShade(my_shade);
          }
        );
      }
      //console.log("loading image for song " + props.songs[props.songId].name);
      var img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = props.songs[props.songId].artwork;
      // console.log(img);

      img.onload = function () {
        var song_update = props.songs[props.songId];
        // console.log("loaded image for song " + song.name);
        var colorThief = new ColorThief();
        var calc_palette = colorThief.getPalette(img, 5);
        var dominantColor = sortColorsByLuma(colorThief.getPalette(img, 3))[0];
        var rgb = Color2RGB(dominantColor);
        song_update.bg_color = rgb;
        song_update.calc_palette = calc_palette;
        setPallete(calc_palette);
        setSong(song_update);
      };
    }
  }, [song, props.songId, props.songs]);

  useEffect(() => {
    setSong(props.songs[props.songId]);
  }, [props.songId, props]);

  useEffect(() => {
    if (isPlaying) {
      //console.log(document.querySelector(`#Cassette_${song.id}`))
      //console.log(props.currentItemId)
      props.setCurrentItemId(song.id);
      // console.log(song);
    } else {
      if (props.currentItemId === song.id) {
        props.setCurrentItemId(null);
      } else if (props.currentItemId != null) {
        props.setCurrentItemId(props.currentItemId);
      }
    }
  }, [isPlaying, props, song]);

  useEffect(() => {
    if (props.currentItemId === song.id) {
      setIsPlaying(true);
      setPlayerPlaying(true);
    } else {
      setPlayerPlaying(props.currentItemId != null);
      setIsPlaying(false);
    }
  }, [props.currentItemId, props, song.id]);

  useEffect(() => {
    if (hover) {
      document.body.style.backgroundColor = song.bg_color;
    }
  }, [hover, props, song.bg_color]);

  return (
    <>
      <div
        className={["cassette", isPlaying ? "playing" : ""].join(" ")}
        style={{
          transform: props.isModalOpen ? `translate3d(0, 0, 0) rotateX(0deg) rotateZ(0deg) rotateY(0deg) translateZ(-1000px)`
           : `translate3d(${shift * -100}px, ${shift * 10}px, 0)`,
          transition: "transform 0.2s ease-in-out",
          //filter: playerPlaying ? isPlaying || hover ? "none" : "blur(4px)" : "none",
          //zIndex: props.shift + 1,
          //zIndex: isPlaying ? 100 : 0,
          //opacity: playerPlaying ? isPlaying ? 1 : 0.5 : 1,
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => {
          setIsPlaying(!isPlaying);

          if (!props.isFullscreen) {
            props.setFullscreen(true);
          }
        }}
        id={"Cassette_" + song.id}
        aria-label={song.name}
        aria-checked={isPlaying}
        // add new value for shade
        data-shade={shade}
      >
        <div className="shadow-scene">
          <div
            className="shadow-shape1"
            style={{
              boxShadow: isPlaying
                ? ""
                : `0px 0px ${hover ? 20 : 0}px 10px rgba(0, 0, 0, 1)`,
              opacity: isPlaying ? 0 : hover ? 0.2 : 0.3,
            }}
          ></div>
          <div
            className="shadow-shape2"
            style={{
              boxShadow: isPlaying
                ? ""
                : `0px 0px ${hover ? 20 : 0}px 10px rgba(0, 0, 0, 1)`,
              opacity: isPlaying ? 0 : hover ? 0.2 : 0.3,
            }}
          ></div>
        </div>

        <div
          className={[
            "cassette-scene",
            isSpotifyGreen ? "spotify-cassette" : "",
            isTranslucent ? "translucent-cassette" : "",
            isWhite ? "white-cassette" : "",
          ].join(" ")}
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
              <div className="ft face">
                <div className="full-mask">
                  <div className="color_bars">
                    {palette ? (
                      palette.map((color, index) => {
                        return (
                          <div
                            className="color_bar"
                            id={"color_bar_" + index}
                            style={{ backgroundColor: Color2RGB(color) }}
                            key={"color_bar_" + index}
                          ></div>
                        );
                      })
                    ) : (
                      <>
                      {
                        colors.slice(0, 5).map((color, index) => {
                          return (
                            <div
                              className="color_bar"
                              id={"color_bar_" + index}
                              style={{ backgroundColor: color }}
                              key={"color_bar_" + index}
                            ></div>
                          );
                        })
                      }
                      </>
                    )}
                  </div>
                  <div className="cassette_face_info">
                    <span
                      className="song_key"
                      style={{ backgroundColor: song.bg_color, color: "black" }}
                    >
                      {songKey ? songKey : ""}
                    </span>

                    <span className="song_name song_text">{song.name}</span>
                    <br />
                    <span className="song_artist_album song_text">
                      {song.artist} {props.album ? "-" : ""} {props.album}
                    </span>

                    <br />
                    <br />

                    {/* <tdkLogo /> */}
                    <img
                      src={
                        song.audio_features
                          ? BrandLogoByFeatures(song.audio_features)
                          : BrandLogoByID(song.id)
                      }
                      id="brand_logo"
                      alt="brand_logo"
                      width="60"
                      height="60"
                      style={{
                        margin: "0 auto",
                        position: "relative",
                        bottom: "-6px",
                        left: "0px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="bk face"></div>
              <div className="rt face">
                <div className="color_dots">
                  {palette ? (
                    palette.map((color, index) => {
                      return (
                        <div
                          className={"color_dot dot" + index}
                          style={{ backgroundColor: Color2RGB(color) }}
                          key={"dot" + index}
                        ></div>
                      );
                    })
                  ) : (
                    <></>
                  )}
                  <span
                    className="song_number"
                    style={{
                      // backgroundColor: song.bg_color,
                      color: isWhite ? "black" : "white",
                      marginTop: "20px",
                      fontSize: "20px",
                      fontWeight: "bold",
                      fontFamily: "monospace",
                    }}
                  >
                    {props.songId + 1}
                  </span>
                </div>
              </div>
              <div className="lt face"></div>
              <div className="tp face"></div>
              <div className="bm face"></div>
            </div>

            <div className="reel-scene" id="reel-scene1">
              <div
                className="reel-shape cylinder-2 cyl-2"
                style={{
                  animation:
                    isPlaying || hover
                      ? `spin ${reel_speed ? reel_speed : 2}s linear infinite`
                      : "unset",
                  backgroundColor: song.bg_color,
                }}
              >
                <div className="reel-face bm">
                  <div className="reel-circle">
                    <div className="reel-teeth tooth0"></div>
                    <div className="reel-teeth tooth1"></div>
                    <div className="reel-teeth tooth2"></div>
                  </div>
                </div>
                <div className="reel-face tp"></div>
                <div className="reel-face side s0"></div>
                <div className="reel-face side s1"></div>
                <div className="reel-face side s2"></div>
                <div className="reel-face side s3"></div>
                <div className="reel-face side s4"></div>
                <div className="reel-face side s5"></div>
                <div className="reel-face side s6"></div>
                <div className="reel-face side s7"></div>
                <div className="reel-face side s8"></div>
                <div className="reel-face side s9"></div>
                <div className="reel-face side s10"></div>
                <div className="reel-face side s11"></div>
                <div className="reel-face side s12"></div>
                <div className="reel-face side s13"></div>
                <div className="reel-face side s14"></div>
                <div className="reel-face side s15"></div>
                <div className="reel-face side s16"></div>
                <div className="reel-face side s17"></div>
                <div className="reel-face side s18"></div>
                <div className="reel-face side s19"></div>
              </div>
            </div>
            <div className="reel-scene" id="reel-scene2">
              <div
                className="reel-shape cylinder-2 cyl-2"
                style={{
                  animation:
                    isPlaying || hover
                      ? `spin ${reel_speed ? reel_speed : 2}s linear infinite`
                      : "unset",
                  backgroundColor: song.bg_color,
                }}
              >
                <div className="reel-face bm">
                  <div className="reel-circle">
                    <div className="reel-teeth tooth0"></div>
                    <div className="reel-teeth tooth1"></div>
                    <div className="reel-teeth tooth2"></div>
                  </div>
                </div>
                <div className="reel-face tp"></div>
                <div className="reel-face side s0"></div>
                <div className="reel-face side s1"></div>
                <div className="reel-face side s2"></div>
                <div className="reel-face side s3"></div>
                <div className="reel-face side s4"></div>
                <div className="reel-face side s5"></div>
                <div className="reel-face side s6"></div>
                <div className="reel-face side s7"></div>
                <div className="reel-face side s8"></div>
                <div className="reel-face side s9"></div>
                <div className="reel-face side s10"></div>
                <div className="reel-face side s11"></div>
                <div className="reel-face side s12"></div>
                <div className="reel-face side s13"></div>
                <div className="reel-face side s14"></div>
                <div className="reel-face side s15"></div>
                <div className="reel-face side s16"></div>
                <div className="reel-face side s17"></div>
                <div className="reel-face side s18"></div>
                <div className="reel-face side s19"></div>
              </div>
            </div>

            <div className="cover-scene">
              <div className="cover-shape prism-1 pri-1">
                <div className="cover-face ft"></div>
                <div className="cover-face bk"></div>
                <div className="cover-face-wrapper rt">
                  <div className="cover-face"></div>
                </div>
                <div className="cover-face-wrapper lt">
                  <div className="cover-face"></div>
                </div>
                <div className="cover-face bm"></div>
              </div>
              <div className="cover-shape cuboid-1 cub-1">
                <div className="cover-face ft"></div>
                <div className="cover-face bk"></div>
                <div className="cover-face rt"></div>
                <div className="cover-face lt"></div>
                <div className="cover-face bm"></div>
                <div className="cover-face tp"></div>
              </div>
              <div className="cover-shape prism-2 pri-2">
                <div className="cover-face ft"></div>
                <div className="cover-face bk"></div>
                <div className="cover-face-wrapper rt">
                  <div className="cover-face"></div>
                </div>
                <div className="cover-face-wrapper lt">
                  <div className="cover-face"></div>
                </div>
                <div className="cover-face bm"></div>
              </div>
            </div>

            <div className="screw-scene" id="screw-scene1">
              <div className="screw-shape cylinder-1 cyl-1">
                <div className="screw-face bm"></div>
                <div className="screw-face tp"></div>
                <div className="screw-face side s0"></div>
                <div className="screw-face side s1"></div>
                <div className="screw-face side s2"></div>
                <div className="screw-face side s3"></div>
                <div className="screw-face side s4"></div>
                <div className="screw-face side s5"></div>
                <div className="screw-face side s6"></div>
                <div className="screw-face side s7"></div>
                <div className="screw-face side s8"></div>
                <div className="screw-face side s9"></div>
                <div className="screw-face side s10"></div>
                <div className="screw-face side s11"></div>
                <div className="screw-face side s12"></div>
                <div className="screw-face side s13"></div>
              </div>
            </div>
            <div className="screw-scene" id="screw-scene2">
              <div className="screw-shape cylinder-1 cyl-1">
                <div className="screw-face bm"></div>
                <div className="screw-face tp"></div>
                <div className="screw-face side s0"></div>
                <div className="screw-face side s1"></div>
                <div className="screw-face side s2"></div>
                <div className="screw-face side s3"></div>
                <div className="screw-face side s4"></div>
                <div className="screw-face side s5"></div>
                <div className="screw-face side s6"></div>
                <div className="screw-face side s7"></div>
                <div className="screw-face side s8"></div>
                <div className="screw-face side s9"></div>
                <div className="screw-face side s10"></div>
                <div className="screw-face side s11"></div>
                <div className="screw-face side s12"></div>
                <div className="screw-face side s13"></div>
              </div>
            </div>
            <div className="screw-scene" id="screw-scene3">
              <div className="screw-shape cylinder-1 cyl-1">
                <div className="screw-face bm"></div>
                <div className="screw-face tp"></div>
                <div className="screw-face side s0"></div>
                <div className="screw-face side s1"></div>
                <div className="screw-face side s2"></div>
                <div className="screw-face side s3"></div>
                <div className="screw-face side s4"></div>
                <div className="screw-face side s5"></div>
                <div className="screw-face side s6"></div>
                <div className="screw-face side s7"></div>
                <div className="screw-face side s8"></div>
                <div className="screw-face side s9"></div>
                <div className="screw-face side s10"></div>
                <div className="screw-face side s11"></div>
                <div className="screw-face side s12"></div>
                <div className="screw-face side s13"></div>
              </div>
            </div>
            <div className="screw-scene" id="screw-scene4">
              <div className="screw-shape cylinder-1 cyl-1">
                <div className="screw-face bm"></div>
                <div className="screw-face tp"></div>
                <div className="screw-face side s0"></div>
                <div className="screw-face side s1"></div>
                <div className="screw-face side s2"></div>
                <div className="screw-face side s3"></div>
                <div className="screw-face side s4"></div>
                <div className="screw-face side s5"></div>
                <div className="screw-face side s6"></div>
                <div className="screw-face side s7"></div>
                <div className="screw-face side s8"></div>
                <div className="screw-face side s9"></div>
                <div className="screw-face side s10"></div>
                <div className="screw-face side s11"></div>
                <div className="screw-face side s12"></div>
                <div className="screw-face side s13"></div>
              </div>
            </div>
            <div className="screw-scene" id="screw-scene5">
              <div className="screw-shape cylinder-1 cyl-1">
                <div className="screw-face bm"></div>
                <div className="screw-face tp"></div>
                <div className="screw-face side s0"></div>
                <div className="screw-face side s1"></div>
                <div className="screw-face side s2"></div>
                <div className="screw-face side s3"></div>
                <div className="screw-face side s4"></div>
                <div className="screw-face side s5"></div>
                <div className="screw-face side s6"></div>
                <div className="screw-face side s7"></div>
                <div className="screw-face side s8"></div>
                <div className="screw-face side s9"></div>
                <div className="screw-face side s10"></div>
                <div className="screw-face side s11"></div>
                <div className="screw-face side s12"></div>
                <div className="screw-face side s13"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
