import React, { useCallback, useState, useEffect } from "react";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import {Alert, AlertTitle} from '@material-ui/lab';
import SingleFileUpload from "./SingleFileUpload";
import { useField } from "formik";

const useStyle = makeStyles({
  formControl: {
    margin: "1rem",
    minWidth: 120,
  },
  btn: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    "&:hover": {
      boxShadow: "10px 3px 34px rgba(0,0,0,.3)",
    },
  },
  drag: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "2rem",
    // backgroundColor: '#808',
    border: "1px dashed #000",
    padding: "1rem 2rem",
    transition: ".3s ease-in",
    "&:hover": {
      background: "rgba(156,156,156,.3)",
      cursor: "pointer",
    },
  },
  selectBox: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
});

export interface UploadableFile {
  file: File;
  errors: FileError[];
  url?: string;
}

const FileUpload = ({ name }: { name: string }) => {
  const classes = useStyle();
  const [selectValue, setSelectValue] = useState("");
  const [, , helper] = useField(name);

  const [files, setFiles] = useState<UploadableFile[]>([]);

  const onDrop = useCallback(
    (acceptData: File[], rejectData: FileRejection[]) => {
      //Todo
      const mappedData = acceptData.map((file) => ({ file, errors: [] }));
      setFiles((f) => [...f, ...mappedData, ...rejectData]);
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: selectValue+"/*" });

  useEffect(() => {
    helper.setValue(files);
  }, [files]);

  const handleDeleteFile = (file: File) => {
    setFiles((f) => {
      return f.filter((item) => item.file !== file);
    });
  };

  const handleOnUpload = (file: File, url: string) => {
    setFiles((f) =>
      f.map((_item) => {
        if (_item.file === file) {
          return { ..._item, url };
        }
        return _item;
      })
    );
  };

  const handleSelect = (e) => {
    setSelectValue(e.target.value)
  }

  return (
    <React.Fragment>
      {/* <select onChange={(e) => setSelectValue(e.target.value)} value={selectValue} name="formtType" id="">
        <option value="image">Image</option>
        <option value="file">File</option>
        <option value="video">Video</option>
      </select> */}
      <div className={classes.selectBox}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">
            File Upload Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectValue}
            onChange={handleSelect}
          >
            <MenuItem disabled>select</MenuItem>
            <MenuItem value={"image"}>image</MenuItem>
            <MenuItem value={"file"}>file</MenuItem>
            <MenuItem value={"video"}>video</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="h6">selected type: {selectValue}</Typography>
      </div>

      <div className={classes.drag} {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p className="justify-self-center">
            Drag 'and' drop some {selectValue} here, or <br></br>
            <Button className={classes.btn}>click to select</Button>
          </p>
        )}
      </div>
      {files.map((singleFile, index) => (
        <Grid item>
          {singleFile.errors.length ? (
            <Alert severity="error"><AlertTitle>Error</AlertTitle>File format is not allowed or invalid!</Alert>
          ) : (
            <SingleFileUpload
              key={index}
              onUpload={handleOnUpload}
              onDelete={handleDeleteFile}
              file={singleFile.file}
            />
          )}
          ;
        </Grid>
      ))}
    </React.Fragment>
  );
};

export default FileUpload;
