import { Grid, LinearProgress } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import FileHeader from './FileHeader';
// import dotenv from 'dotenv';

// dotenv.config(); 

export interface SingleFileUpload {
    file: File;
    onDelete: (file: File) => void;
    onUpload: (file: File, url: string) => void;
}

const SingleFileUpload = ({ file, onDelete, onUpload }: SingleFileUpload) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const upload = async () => {
            const url = await uploadFile(file, setProgress);
            onUpload(file, url);
            console.log('url', url);
        }
        upload();
    }, []);

    return (
        <Grid item>
            <FileHeader file={file} onDelete={onDelete} />
            <LinearProgress variant="determinate" value={progress} />
            {/* {progress} */}
        </Grid>
    )
}

const uploadFile = (data: File, onProgress: (percentage: number) => void) => {
    const url = "https://api.cloudinary.com/v1_1/demo/image/upload"; //process.env.UPLOAD_URL;
    const key = "docs_upload_example_us_preset"; //process.env.UPLOAD_KEY;

    return new Promise<string>((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);

        xhr.onload = () => {
            const response = JSON.parse(xhr.responseText);
            res(response.secure_url);
        }
        xhr.onerror = (e) => rej(e);
        xhr.upload.onprogress = (e) => {
            //check if the file can be measurable or not 
            if (e.lengthComputable) {
                const percentage = (e.loaded / e.total) * 100;

                onProgress(Math.round(percentage));
            }

        };
        const formData = new FormData();
        formData.append('file', data);
        formData.append('upload_preset', key);
        xhr.send(formData);
    })
}

export default SingleFileUpload
