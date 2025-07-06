import React from "react";

const DarkModeToggle = ({ dark, toggle }) => {
  return (
    <button onClick={toggle} style={{ marginRight: "10px" }}>
      {dark ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
