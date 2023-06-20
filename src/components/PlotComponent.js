import React, { useState, useEffect, useRef } from "react";
// https://react.dev/reference/react/useState
// https://react.dev/reference/react/useEffect

import * as Plot from "@observablehq/plot";
// https://observablehq.com/plot/getting-started#plot-in-react

//import d3 from "d3";

import addTooltips from "../tooltip.js";

const PlotComponentScatterPlot = (props) => {
    
    const containerRef = useRef();
    const data = props.data;

    useEffect(() => { // SCATTERPLOT POPULARITY
        if (data === undefined) return;

        console.log(data.map((d) => d.popularity));

    
        const plot = Plot.plot({
            marks: [
                Plot.dot(data, {
                    x: (d) => d.popularity,
                    y: (d) => d.name,
                    fill: (d) => d.bg_color, // Use the bg_color property for fill color
                    size: 64,
                    title: (d) => d.name,
                }),
            ],
            
        });
    
        containerRef.current.append(plot);
        return () => plot.remove();
    }, [data]);

    return <div ref={containerRef} />;
}

const PlotComponentHistogram = (props) => {
    
    const containerRef = useRef();
    const data = props.data;
    const key_name = props.key_name;

    console.log(data.map((d) => d.popularity));
        
    useEffect(() => {
        if (data === undefined) return;

        // El radio es en función de la popularidad
        const plot = Plot.plot({
            marks: [
                Plot.dot(data, {
                    x: (d) => (d.popularity),
                    y: (d) => (d.audio_features[key_name] * 100),
                    fill: (d) => d.bg_color,
                    r: 20,
                    // Y axis is reversed
                    yReverse: true,

                }),
            ],
            x: {
                label: "Popularity",
                transform: (x) => `${Math.round(x)} %`
            },
            y: {
                label: props.key_name,
                transform: (x) => `${Math.round(x)} %`,
                // domain: [0, 100],
            },
            width: 700,
            height: 600,
            style: {
                background: "rgba(0, 0, 0, 0.4)",
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
    }, [data, key_name]);

    return <div ref={containerRef} />;
}

export const MetricComponent = (props) => {
    
    const mean = (arr) => {
        return arr.reduce((x, y) => x + y) / arr.length
    }
    const avg = mean(props.data)

    // A sliced circle to represent a percentage, like a pie chart
    // The percentage shown in the middle of the circle as text
    const circle = (p, color) => {
        const r = 30;
        const c = Math.PI * (r * 2);
        const pct = ((100 - p) / 100) * c;

        return (
            <div className="metric"
                onClick={props.onClick}
            >
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

    return circle(avg, props.color);
}

export {PlotComponentScatterPlot, PlotComponentHistogram};
