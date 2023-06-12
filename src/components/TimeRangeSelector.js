import React from "react";

export const TimeRangeSelector = ({ setRange, timeRange }) => {
  return (
    <>
      <div className="time_range_selector switch-field">
        <input
          type="radio"
          id="short_term"
          name="time_range"
          value="short_term"
          checked={timeRange === "short_term"}
          onChange={() => setRange("short_term")} />
        <label htmlFor="short_term">4 Weeks</label>
        <input
          type="radio"
          id="medium_term"
          name="time_range"
          value="medium_term"
          checked={timeRange === "medium_term"}
          onChange={() => setRange("medium_term")} />
        <label htmlFor="medium_term">6 Months</label>
        <input
          type="radio"
          id="long_term"
          name="time_range"
          value="long_term"
          checked={timeRange === "long_term"}
          onChange={() => setRange("long_term")} />
        <label htmlFor="long_term">All Time</label>
      </div>
    </>
  );
};
