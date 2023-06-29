import React, { useState, useEffect, useRef } from "react";
// https://react.dev/reference/react/useState
// https://react.dev/reference/react/useEffect

import * as Plot from "@observablehq/plot";
// https://observablehq.com/plot/getting-started#plot-in-react

//import d3 from "d3";

import addTooltips from "../tooltip.js";

const PlotSongBubbles = (props) => {

    const containerRef = useRef();
    const data = props.data;
    const key_name = props.key_name;
    const [topValue, setTopValue] = useState(100);

    useEffect(() => {
        if (data === undefined) return;
        try {
            if (props.data === undefined) return;

            // No audio features
            for (const d of props.data) {
                if (d.audio_features === undefined) {
                    return;
                }
            }

            // console.log(
            //     data.map((d) => d.popularity)
            // )
            // El radio es en función de la popularidad
            const plot = Plot.plot({
                marks: [
                    Plot.dot(data, {
                        x: (d) => (d.popularity),
                        y: (d) => (d.audio_features[key_name] * 100),
                        fill: (d) => d.bg_color,
                        stroke: (d) => d.bg_color,
                        r: 20,
                        title: (d) => `${d.name} - ${d.artist} \n ${capitalizeFirstLetter(key_name)}: ${(d.audio_features[key_name] * 100)} % \n Popularity: ${(d.popularity)} %`,
                    }),
                ],
                x: {
                    label: "Popularity",
                    // Set range to 0-100
                    domain: [-10, 110],
                },
                y: {
                    label: props.key_name,
                    //transform: (x) => `${Math.round(x)} %`,
                    // If most of the data is in the 0-1 range, set the domain to 0-1
                    
                    // domain: [0, topValue],
                    // Lowest possible value is data min audio feature value
                    domain: [Math.min(...data.map((d) => d.audio_features[key_name] * 100)), topValue],
                },
                width: 700,
                height: 500,
                style: {
                    background: "rgba(255, 255, 255 , 0.1)",
                    backdropFilter: "blur(1000px)",
                    padding: "1rem",
                    borderRadius: "1rem",
                    color: "white",
                    animation: "fade-in 0.5s ease-in-out",
                    transition: "all 0.5s ease-in-out",
                },
                tip: "xy"
            });

            containerRef.current.append(addTooltips(plot));
            return () => plot.remove();
        } catch (error) {
            console.log(error);
        }
    }, [data, props.key_name, props.data, key_name, topValue]);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <>
            {/* <h2>{capitalizeFirstLetter(props.key_name)}</h2> */}
            {/* <div className="plotContainer"> */}
                <div ref={containerRef} 
                    style={{
                        // Wrap container in a div to prevent the plot from overflowing
                        overflow: "hidden",
                    }}
                />
                <div className="legend">
                    {props.data.map((d) => (
                        <div className="legend-item" key={d.id}>
                            <div className="legend-color" style={{ backgroundColor: d.bg_color }}></div>
                            <span className="legend-text">{d.name}</span>
                            {/* <div className="legend-text">{d.artist}</div> */}

                            {/* Input slider to set topValue */}
                        </div>
                    ))}
                    <br></br>
                    <span className="adjust-text"
                        style={{ color: "black", fontSize: "0.8rem" }}
                    >Adjust the the Y-Axis</span>
                    <input type="range" min="0.005" max="100" value={topValue} onChange={(e) => setTopValue(e.target.value)} />
                </div>
            {/* </div> */}
        </>
    );
}

export const MetricComponent = (props) => {
    // const containerRef = useRef();

    const [plot, setPlot] = useState(null);

    useEffect(() => {
        try {
            if (props.data === undefined) return;

            // No audio features
            for (const d of props.data) {
                if (d.audio_features === undefined) {
                    return;
                }
            }

            const mean = (arr) => {
                return arr.reduce((x, y) => x + y) / arr.length
            }

            const avg = mean(props.data.slice(0, 10).map(
                (d) => d.audio_features[props.title.toLowerCase()] * 100
            ));

            // A sliced circle to represent a percentage, like a pie chart
            // The percentage shown in the middle of the circle as text
            const circle = (p, color) => {
                const r = 30;
                const c = Math.PI * (r * 2);
                const pct = ((100 - p) / 100) * c;

                return (
                    <div className={"metric" + (props.selected ? " selected" : "")}
                     onClick={props.onClick}>
                        <h3>{props.title}</h3>
                        {/* <h4>{props.icon}</h4> */}
                        <svg height={r * 2 + 10} width={r * 2 + 10}>
                            <circle
                                className="circle-bg"
                                cx={r + 5}
                                cy={r + 5}
                                r={r}
                                fill="transparent"
                                stroke="rgba(0, 0, 0, 0.3)" //
                                strokeWidth="10"
                                style={{
                                    strokeDashoffset: pct,
                                }}
                            />
                            <circle
                                className="circle"
                                cx={r + 5}
                                cy={r + 5}
                                r={r}
                                fill="transparent"
                                stroke={color}
                                strokeWidth="10"
                                strokeDasharray={r * Math.PI * 2}
                                style={{
                                    strokeDashoffset: pct,
                                }}
                            />
                            <text
                                x="50%"
                                y="52%"
                                dominantBaseline="middle"
                                textAnchor="middle"
                                fontSize="18"
                                fontWeight="bold"
                            >
                                {Math.round(p)}%
                                {/* {props.icon} */}
                            </text>
                        </svg>
                    </div>
                );
            };
            // containerRef.current = circle(avg, props.color);
            // return circle(avg, props.color);
            setPlot(circle(avg, props.color));
        }
        catch (e) {
            console.log(e);
        }
    }, [props.data, props.title, props.color, props.icon, props.onClick]);

    return plot;
}

export { PlotSongBubbles };
