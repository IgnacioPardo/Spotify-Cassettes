import React from "react";

export const LoadingOverlay = ({ isLoading }) => {
  return <div
    className="loading_overlay"
    style={{
      opacity: isLoading ? "1" : "0",
      zIndex: isLoading ? "1" : "-1",
    }}
  >
    <div
      className="loading_anim"
      style={{
        opacity: isLoading ? "1" : "0",
      }}
    >
      <div className="loading_anim_inner"></div>
    </div>
  </div>;
};
