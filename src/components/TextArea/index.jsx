export default function TextArea({ placeholder, points, setPoints }) {
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
