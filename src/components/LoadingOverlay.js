import React from "react";

export const LoadingOverlay = ({ isLoading, showAnatomy }) => {
  return <div
    className="loading_overlay"
    style={{
      display: isLoading ? "flex" : "none",
      opacity: isLoading ? "1" : "0",
      zIndex: isLoading ? "1" : "-1",
    }}
  >
    <div
      className="loading_anim"
      style={{
        opacity: (isLoading && !showAnatomy) ? "1" : "0",
      }}
    >
      <div className="loading_anim_inner"></div>
    </div>
  </div>;
};
