import { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Avatar, TextArea } from "@components/index";

export default function Translator() {
  const [points, setPoints] = useState("");
  return (
    <>
      <Grid
        container
        style={{
          height: "calc(100vh - 2rem)",
          width: "calc(100vw - 2rem)",
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
