import React, { useState, useEffect, useRef } from "react";
// https://react.dev/reference/react/useState
// https://react.dev/reference/react/useEffect

import * as Plot from "@observablehq/plot";
// https://observablehq.com/plot/getting-started#plot-in-react

const PlotComponentScatterPlot = (props) => {
    
    const containerRef = useRef();
    const [data, setData] = useState(props.data);

    useEffect(() => { // SCATTERPLOT POPULARITY
        if (data === undefined) return;
    
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
            axis: {
                x: {
                    label: "Popularity",
                    tickFormat: (d) => String(d),
                },
                y: {
                    label: "Track",
                    tickFormat: (d) => d.toString(),
                    tickRotate: -45,
                },
            },
        });
    
        containerRef.current.append(plot);
        return () => plot.remove();
    }, [data]);

    return <div ref={containerRef} />;
}

const PlotComponentHistogram = (props) => {
    
    const containerRef = useRef();
    const [data, setData] = useState(props.data);
        
    useEffect(() => { // HISTOGRAMA INSTUMENTALNESS
        if (data === undefined) return;
    
        const histogramData = data.map((track) => ({
            instrumentalness: track.audio_features.instrumentalness,
            bg_color: track.bg_color,
        }));
    
        const plot = Plot.plot({
            marks: [
                Plot.rect(histogramData, {
                    x: "instrumentalness",
                    y: "count",
                    fill: (d) => d.bg_color,
                }),
            ],
            encoding: {
                count: "count()",
            },
            axis: {
                x: {
                    label: "Instrumentalness",
                },
                y: {
                    label: "Count",
                    tickFormat: (d) => String(d),
                },
            },
        });
    
        containerRef.current.append(plot);
        return () => plot.remove();
    }, [data]);

    return <div ref={containerRef} />;
}

export {PlotComponentScatterPlot, PlotComponentHistogram};
