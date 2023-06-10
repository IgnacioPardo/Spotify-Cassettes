import React, { useState, useEffect } from 'react';
import tdkLogo  from './icons/tdk.svg'

const Color2RGB = (color) => {
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
}

const Cassette = (props) => {

  const [isPlaying, setIsPlaying] = useState(false)
  const [playerPlaying, setPlayerPlaying] = useState(false)

  const [hover, setHover] = useState(false)
  const [song, setSong] = useState(props.songs[props.songId])
  //const [pallete, setPallete] = useState([])

  var reel_speed = 1;

  if (song.audio_features){
    reel_speed = (100 / song.audio_features.tempo) * 2;
  }

  var shift = song.id - 1 + props.shift;

  useEffect(() => {
    setSong(props.songs[props.songId])
  }, [props.songId, props])

  useEffect(() => {
    if (isPlaying) {
        //console.log(document.querySelector(`#Cassette_${song.id}`))
        //console.log(props.currentItemId)
        props.setCurrentItemId(song.id)
    } else {
        if (props.currentItemId === song.id) {
            props.setCurrentItemId(null)
        }
        else if (props.currentItemId != null) {
            props.setCurrentItemId(props.currentItemId)
        }
    }
  }, [isPlaying, props])

  useEffect(() => {
    if (props.currentItemId === song.id) {
        setIsPlaying(true)
        setPlayerPlaying(true)
    }
    else {
        setPlayerPlaying(props.currentItemId != null)
        setIsPlaying(false)
    }
  }, [props.currentItemId, props])

  useEffect(() => {
    if (hover) {
      document.body.style.backgroundColor = song.bg_color;
    }
  }, [hover, props])

  return (
    <>
      <div 
          className={["cassette", isPlaying ? "playing" : ""].join(" ")}
          style={{ 
            transform: `translate3d(${(shift * -100)}px, ${(shift*10)}px, 0)`,
            transition: "transform 0.2s ease-in-out",
            //filter: playerPlaying ? isPlaying || hover ? "none" : "blur(4px)" : "none",
            //zIndex: props.shift + 1,
            //zIndex: isPlaying ? 100 : 0,
            //opacity: playerPlaying ? isPlaying ? 1 : 0.5 : 1,
        }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => {
            setIsPlaying(!isPlaying)

            if (!props.isFullscreen){
              props.setFullscreen(true);
            }
          }}
          id={"Cassette_" + song.id}
          aria-label={song.name}
          aria-checked={isPlaying}
      >
        <div className="shadow-scene">
          <div 
            className="shadow-shape1"
            style={{ 
                boxShadow: isPlaying ? "" : `0px 0px ${hover ? 20 : 0}px 10px rgba(0, 0, 0, 1)`,
                opacity: isPlaying ? 0 : hover ? 0.2 : 0.3
          }}
          ></div>
          <div 
            className="shadow-shape2"
            style={{
                boxShadow: isPlaying ? "" : `0px 0px ${hover ? 20 : 0}px 10px rgba(0, 0, 0, 1)`,
                opacity: isPlaying ? 0 : hover ? 0.2 : 0.3
            }}
          ></div>
        </div>

        <div 
          className="cassette-scene"
          style={{ transform: 
            isPlaying ?
            `perspective(10000px) rotateX(85deg) rotateZ(390deg) translateZ(24vw) rotateY(0deg) scale3d(1.4, 1.4, 1.4)` :
            `perspective(10000px) rotateX(80deg) rotateZ(40deg) translateZ(${(hover ?  4: 0)}vw)` 
        }}
        >
          <div className="cassette-shape">
            <div className="case-scene">
              <div className="ft face">
                <div className="full-mask">
                  <div className="color_bars">
                    {
                      song.pallette ? song.pallette.map((color, index) => {
                        return (
                          <div className="color_bar" id={"color_bar_" + index} style={{ backgroundColor: Color2RGB(color) }}></div>
                        )
                      }) :
                        <>
                          <div className="color_bar" id="color_bar_0" style={{ backgroundColor: "rgb(255, 0, 0)" }}></div>
                          <div className="color_bar" id="color_bar_1" style={{ backgroundColor: "rgb(0, 255, 0)" }}></div>
                          <div className="color_bar" id="color_bar_2" style={{ backgroundColor: "rgb(0, 0, 255)" }}></div>
                          <div className="color_bar" id="color_bar_3" style={{ backgroundColor: "rgb(255, 255, 0)" }}></div>
                          <div className="color_bar" id="color_bar_4" style={{ backgroundColor: "rgb(255, 0, 255)" }}></div>
                        </> 
                    }
                    
                  </div>
                  <div className="cassette_face_info">
                    <span>
                      {song.name}
                      <br />
                      <span className="song_artist_album">
                        {song.artist} {props.album ? "-" : ""} {props.album}
                      </span>
                    </span>

                    <br />
                    <br />

                    {/* <tdkLogo /> */}
                    <img src={tdkLogo} alt="TDK Logo" width="60" height="60" 
                        style={{
                          margin: "0 auto",
                          position: "relative",
                          bottom: "-6px",
                          left: "0px"
                        }} 
                    />
                  </div>
                </div>
              </div>
              <div className="bk face"></div>
              <div className="rt face">
                <div className="color_dots">
                  {
                    song.pallette ?
                      song.pallette.map((color, index) => {
                        return (
                          <div className={"color_dot dot" + index} style={{ backgroundColor: Color2RGB(color) }}></div>
                        )
                      })
                      : <></>
                    }
                  </div>
              </div>
              <div className="lt face"></div>
              <div className="tp face"></div>
              <div className="bm face"></div>
            </div>

            <div className="reel-scene" id="reel-scene1">
              <div className="reel-shape cylinder-2 cyl-2"
                style={{ 
                    animation: (isPlaying || hover) ? `spin ${reel_speed}s linear infinite` : "unset",
                    backgroundColor: song.bg_color
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
              <div className="reel-shape cylinder-2 cyl-2"
                style={{
                    animation: (isPlaying || hover) ? `spin ${reel_speed}s linear infinite` : "unset",
                    backgroundColor: props.bg_color
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
}

const CassetteGallery = (props) => {
  return (
    <>
    <div 
      className="cassette-gallery" 
      id="cassette-gallery" 
      style={
        props.style
      }
      onWheel={props.handleScroll}
    >
      {
        props.songs.map((song, index) => {
          return <Cassette 
                    songs={props.songs}
                    songId={index}
                    key={index} 
                    setCurrentItemId={props.setCurrentItemId}
                    currentItemId={props.currentItemId}
                    shift={props.shift}
                    isFullscreen={props.isFullscreen}
                    setFullscreen={props.setFullscreen}
                />
                
        })
      }
    </div>
    </>
  )
}


export default CassetteGallery;
