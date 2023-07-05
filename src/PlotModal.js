import React, { useEffect } from "react";
import {
  PlotSongBubbles,
  MetricComponent,
} from "./components/PlotComponent.js";

export const PlotModal = ({
  showPlots,
  songs,
  plotKeyName,
  setPlotKeyName,
  setControlAction,
}) => {
  useEffect(() => {
    if (showPlots) {
      // Wait for the modal to be visible then set backdrop filter to blur, if done inminediatly it will not work
      // Hide loading overlay
      document.querySelector(".loading_overlay").style.display = "none";
      document.querySelector(".song_info").style.display = "none";
      document.querySelector(".player_time").style.display = "none";
      setTimeout(() => {
        document.querySelector(".plotsModal").style.backdropFilter =
          "blur(10px)";
      }, 100);
    } else {
      document.querySelector(".plotsModal").style.backdropFilter = "blur(0px)";
      document.querySelector(".loading_overlay").style.display = "flex";
      document.querySelector(".song_info").style.display = "flex";
      document.querySelector(".player_time").style.display = "flex";
    }
  }, [showPlots]);

  return (
    <div
      className="plotsModal"
      style={{ display: showPlots ? "flex" : "none" }}
    >
      <div className="plotsModalContent">
        <div className="plotContainer">
          <div className="metricsContainer">
            <MetricComponent
              title="Danceability"
              color="black"
              data={songs}
              selected={plotKeyName === "danceability" ? true : false}
              icon="🕺"
              onClick={() => {
                setPlotKeyName("danceability");
              }}
            />

            <MetricComponent
              title="Speechiness"
              color="black"
              data={songs}
              selected={plotKeyName === "speechiness" ? true : false}
              icon="🗣"
              onClick={() => {
                setPlotKeyName("speechiness");
              }}
            />

            <MetricComponent
              title="Instrumentalness"
              color="black"
              data={songs}
              selected={plotKeyName === "instrumentalness" ? true : false}
              icon="🎻"
              onClick={() => {
                setPlotKeyName("instrumentalness");
              }}
            />
          </div>

          {/* <PlotComponentScatterPlot data={songs.slice(0, 10)} /> */}
          <PlotSongBubbles data={songs.slice(0, 10)} key_name={plotKeyName} />
        </div>
      </div>
    </div>
  );
};
