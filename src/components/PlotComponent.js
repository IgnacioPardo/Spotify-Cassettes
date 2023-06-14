import React, { useState, useEffect, useRef } from "react";
// https://react.dev/reference/react/useState
// https://react.dev/reference/react/useEffect

import * as Plot from "@observablehq/plot";
// https://observablehq.com/plot/getting-started#plot-in-react

import defaultSongs from "../data/cassettes.json";

const PlotComponentScatterPlot = (props) => {
    
    const containerRef = useRef();
    const [data, setData] = useState(defaultSongs);

    console.log(data);

    useEffect(() => { // SCATTERPLOT POPULARITY
        if (data === undefined) return;
    
        try {
            const plot = Plot.plot({
                marks: [
                    Plot.dot(data, {
                        x: (d) => d.popularity,
                        y: (d) => d.name,
                        // fill: (d) => d.bg_color,
                        // size: 64,
                        // title: (d) => d.name,
                    }),
                ],
                // axis: {
                //     x: {
                //         label: "Popularity",
                //         tickFormat: (d) => String(d),
                //     },
                //     y: {
                //         label: "Track",
                //         tickFormat: (d) => d.toString(),
                //         tickRotate: -45,
                //     },
                // },
            });
        
            containerRef.current.append(plot);
            return () => plot.remove();
        }
        catch (error) {
            console.warn(error);
        }
    }, [data]);

    return <div ref={containerRef} />;
}

const PlotComponentHistogram = (props) => {
    
    const containerRef = useRef();
    const [data, setData] = useState(defaultSongs);
        
    useEffect(() => { // HISTOGRAMA INSTUMENTALNESS
        if (data === undefined) return;
        
        try{

            const histogramData = data.map((track) => ({
                instrumentalness: track.audio_features.instrumentalness,
                bg_color: track.bg_color,
            }));
        
            const plot = Plot.plot({
                marks: [
                    Plot.rect(data, {
                        x: (d) => d.audio_features.instrumentalness,
                        y: (d) => d.id,//"count",
                        fill: (d) => d.bg_color,
                    }),
                ],
                encoding: {
                    count: "count()",
                },
                // axis: {
                //     x: {
                //         label: "Instrumentalness",
                //     },
                //     y: {
                //         label: "Count",
                //         tickFormat: (d) => String(d),
                //     },
                // },
            });
        
            containerRef.current.append(plot);
            return () => plot.remove();
        }
        catch (error) {
            console.warn(error);
        }
    }, [data]);

    return <div ref={containerRef} />;
}

export { PlotComponentScatterPlot, PlotComponentHistogram };
