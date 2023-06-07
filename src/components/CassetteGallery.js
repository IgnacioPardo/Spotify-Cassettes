import React, { useState, useEffect } from 'react';

const Cassette = (props) => {

  const [isPlaying, setIsPlaying] = useState(false)
  const [hover, setHover] = useState(false)

  var shift = props.id - 1;

  useEffect(() => {
    if (isPlaying) {
        props.setCurrentItemId(props.id)
    } else {
        if (props.currentItemId === props.id) {
            props.setCurrentItemId(null)
        }
    }
  }, [isPlaying])

  useEffect(() => {
    if (props.currentItemId === props.id) {
        setIsPlaying(true)
    } else {
        setIsPlaying(false)
    }
    }, [props.currentItemId])

  useEffect(() => {
    if (hover) {
      document.body.style.backgroundColor = props.bg_color;
    }
  }, [hover])

  return (
    <>
      <div 
          className="cassette" 
          style={{ transform: `translate3d(${(shift * -100)}px, ${(shift*10)}px, 0)` }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => setIsPlaying(!isPlaying)}
          id={props.id}
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
            `perspective(10000px) rotateX(85deg) rotateZ(390deg) translateZ(20vw) rotateY(0deg)` :
            `perspective(10000px) rotateX(80deg) rotateZ(40deg) translateZ(${(hover ?  4: 0)}vw)` 
        }}
        >
          <div className="cassette-shape">
            <div className="case-scene">
              <div className="ft face">
                <div className="full-mask">
                  <span>
                    {props.title}
                    <br />
                    {props.artist} - {props.album}
                  </span>
                </div>
              </div>
              <div className="bk face"></div>
              <div className="rt face"></div>
              <div className="lt face"></div>
              <div className="tp face"></div>
              <div className="bm face"></div>
            </div>

            <div className="reel-scene" id="reel-scene1">
              <div className="reel-shape cylinder-2 cyl-2"
                style={{ 
                    animation: (isPlaying || hover) ? "spin 1s linear infinite" : "unset",
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
            <div className="reel-scene" id="reel-scene2">
              <div className="reel-shape cylinder-2 cyl-2"
                style={{
                    animation: (isPlaying || hover) ? "spin 1s linear infinite" : "unset",
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


const Player = (props) => {
    return (
        <>
            <div className="player">
                <div className="player__image">
                    <img src={props.image} alt="album cover" />
                </div>
                <div className="player__info">
                    <div className="player__info__title">
                        {props.title}
                    </div>
                    <div className="player__info__artist">
                        {props.artist}
                    </div>
                </div>
                <div className="player__controls">
                </div>
            </div>
        </>
    );
}

const CassetteGallery = (props) => {
  return (
    <>
    <div className="cassette-gallery" id="cassette-gallery" style={props.style}>
      {
        props.songs.map((song, index) => {
          return <Cassette 
                    title={song.name} 
                    artist={song.artist} 
                    album={song.album}
                    bg_color={song.bg_color} 
                    id={song.id} 
                    key={index} 
                    setCurrentItemId={props.setCurrentItemId}
                    currentItemId={props.currentItemId}
                    songUrl={song.url}
                />
        })
      }
    </div>
    </>
  )
}


export default CassetteGallery;
