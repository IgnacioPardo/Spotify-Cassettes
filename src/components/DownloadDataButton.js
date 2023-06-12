import React from "react";

export const DownloadDataButton = ({ data }) => {
  return <button
    className="download_json_btn"
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
      fontFamily: "SF Pro Display",
      fontSize: "20px",
      // fontWeight: "bold",
      color: "white",
      backgroundColor: "black",
      borderRadius: "50%",
      width: "50px",
      height: "50px",
      border: "none",
      outline: "none",
      cursor: "pointer",
    }}
  >
    􀯵
  </button>;
};
