import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function Comments() {
  const navigate = useNavigate();

  const [commentsDisplay, setCommentsDisplay] = useState([]);

  // * Get comments from database
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users/validate-token", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        navigate("/");
      });

    axios
      .get("http://localhost:4000/api/users/get-comments", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCommentsDisplay(res.data.commentsList);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // * Post comments to database
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios
      .post(
        "http://localhost:4000/api/users/add-comments",
        {
          comment: data.get("comment"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        axios
          .get("http://localhost:4000/api/users/get-comments", {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            setCommentsDisplay(res.data.commentsList);
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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
      <Button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
        variant="outlined"
      >
        Log out
      </Button>
      <ul>
        {commentsDisplay.map((display) => (
          <li key={display.firstName}>
            <p>{display.firstName}</p>
            {display.comments.map((comment) => (
              <p>{comment}</p>
            ))}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <label htmlFor="comment">Leave a Comment</label>
          </Grid>
          <Grid item xs={12}>
            <textarea name="comment" style={{ resize: "none" }} />
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
