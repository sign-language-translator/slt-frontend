import React, { useState } from "react";

import "./App.css";
import Grid from "@mui/material/Grid2";
import { TextArea, Avatar } from "./components";

function App() {
  const [points, setPoints] = useState("");
  return (
    <>
      <Grid
        container
        style={{
          height: "calc(100vh - 1rem)",
        }}
        spacing={2}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <TextArea placeholder="Type something here..." points={points} setPoints={setPoints} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Avatar points={points} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
