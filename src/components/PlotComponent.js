import React, { useState, useEffect, useRef } from "react";
// https://react.dev/reference/react/useState
// https://react.dev/reference/react/useEffect

import * as Plot from "@observablehq/plot";
// https://observablehq.com/plot/getting-started#plot-in-react

import cassettes from "../data/cassettes.json";

console.log(cassettes);

const PlotComponent = (props) => {
    
    const containerRef = useRef();
    const [data, setData] = useState(cassettes);

    useEffect(() => {
        //d3.csv("/gistemp.csv", d3.autoType).then(setData);
    }, []);

    useEffect(() => {
        if (data === undefined) return;
        const plot = Plot.plot({
            //y: { grid: true },
            //color: { scheme: "burd" },
            marks: [
                Plot.dot(cassettes.slice(0, 10), {
                    x: (d) => d.audio_features.danceability,
                    y: (d) => d.audio_features.energy,
                    fill: "id",
                    size: 64,
                    title: "name",
                }),
            ]
        });
        containerRef.current.append(plot);
        return () => plot.remove();
    }, [data]);

    return <div ref={containerRef} />;
}

export default PlotComponent;
