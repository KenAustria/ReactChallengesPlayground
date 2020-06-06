import React, { useState } from "react";
import axios from "axios";
// Material UI
import TextField from "@material-ui/core/TextField";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

const PhotoSearch = () => {
  const [search, setSearch] = useState("");
  const [apiUrl, setApiUrl] = useState("https://pixabay.com/api");
  const [apiKey, setApiKey] = useState("10264275-868d83de96a4d0c47db26f9e0"); // hide this
  const [results, setResults] = useState([]);

  // v1: search as user types
  const onInputChange = event => {
    const val = event.target.value;
    setSearch(val);
    if (val === "") {
      setResults([]);
    } else {
      axios
        .get(
          `${apiUrl}/?key=${apiKey}&q=${search}&image_type=photo&safesearch=true`
        )
        .then(res => setResults(res.data.hits))
        .catch(err => console.log(err));
    }
  };

  // v2: search on button click

  return (
    <>
      <div>
        <TextField
          name="search"
          value={search}
          placeholder="What's on your mind?"
          fullWidth={true}
          onChange={onInputChange}
        />
      </div>
      <br />
      {results.length > 0 ? <PhotoResults results={results} /> : null}
    </>
  );
};

const PhotoResults = (props) => {
  const [open, setOpen] = useState(false);
  const [currentResult, setCurrentResult] = useState("");

  const handleOpen = result => {
    setOpen(true);
    setCurrentResult(result);
  };

  const handleClose = () => setOpen(false);

  let resultList;
  if (props.results) {
    resultList = (
      <GridList col={3}>
        {props.results.map(img => (
          <GridListTile
            title={img.tags}
            key={img.id}
            subtitle={
              <span>
                by <strong>{img.user}</strong>
              </span>
            }
            actionIcon={
              <IconButton onClick={() => handleOpen(img.largeImageURL)}>
                <Zoom color="white" />
              </IconButton>
            }
          >
            <img src={img.largeImageURL} alt="" />
          </GridListTile>
        ))}
      </GridList>
    );
  } else {
    resultList = null;
  }

  const actions = [
    <Button key="0" label="Close" primary={true} onClick={handleClose} />
  ];

  return (
    <div>
      {resultList}
      <Dialog
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={handleClose}
      >
        <img src={currentResult} alt="" style={{ width: "100%" }} />
      </Dialog>
    </div>
  );
};

export default PhotoSearch;
