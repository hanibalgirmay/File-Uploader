import { Grid, Button } from '@material-ui/core'
import React from 'react'

export interface FileHeaderProp {
    file:File;
    onDelete:(file: File) => void;
}

const FileHeader = ({file, onDelete}: FileHeaderProp) => {
    return (
        <Grid container justify="space-between" alignItems="center">
            <Grid item>
                {file.name}
            </Grid>
            <Grid item><Button onClick={() => onDelete(file)} variant="outlined" size="small" color="secondary">Delete</Button></Grid>
        </Grid>
    )
}

export default FileHeader
