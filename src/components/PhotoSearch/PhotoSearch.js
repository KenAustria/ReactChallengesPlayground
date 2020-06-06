import React, { useState } from "react";
import axios from "axios";
// Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const PhotoSearch = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <TextField
        name="search"
        value={search}
        placeholder="What's on your mind?"
        onChange={event => setSearch(event.target.value)}
      />
      <Button variant="contained" color="primary">
        Submit
      </Button>
    </div>
  );
};

export default PhotoSearch;
