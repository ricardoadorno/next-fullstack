import React from "react";
import { Button, Grid } from "@mui/material";

function Comments() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "4rem",
        margin: "8rem",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <ul>
        <li>
          <p>
            <strong>Author:</strong> John Doe
          </p>
          Comment 1
        </li>
        <li>
          <p>
            <strong>Author:</strong> Jane Doe
          </p>
          Comment 1
        </li>
      </ul>

      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <label htmlFor="comment">Leave a Comment</label>
          </Grid>
          <Grid item xs={12}>
            <textarea style={{ resize: "none" }} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Comment
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Comments;
