import React from "react";

export const DownloadDataButton = ({ data }) => {
  return <button
    className="download_json_btn round_btn"
    onClick={(e) => {
      e.preventDefault();
      const element = document.createElement("a");
      const file = new Blob([JSON.stringify(data)], {
        type: "text/plain",
      });
      element.href = URL.createObjectURL(file);
      element.download = "cassettes.json";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }}
    style={{
      position: "absolute",
      bottom: "40px",
      right: "40px",
      zIndex: "100",
    }}
  >
    􀯵
  </button>;
};
