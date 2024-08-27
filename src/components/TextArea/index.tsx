import React, { Dispatch, SetStateAction } from "react";

export default function index({
  placeholder,
  points,
  setPoints,
}: {
  placeholder: string;
  points: string;
  setPoints: Dispatch<SetStateAction<string>>;
}) {
  return (
    <textarea
      placeholder={placeholder}
      style={{
        width: "100%",
        height: "100%",
        padding: "1rem",
        boxSizing: "border-box",
        border: "1px solid #ccc",
        borderRadius: "4px",
        resize: "none",
      }}
      value={points}
      onChange={(event) => setPoints(event.target.value)}
    />
  );
}
