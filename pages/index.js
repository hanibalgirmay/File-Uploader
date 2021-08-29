import React from "react";
import { Card,Button, CardContent, Grid, makeStyles } from "@material-ui/core";
import { Form, Formik } from "formik";
import FileUpload from "./upload/FileUpload";

const useStyle = makeStyles({
  root:{
    padding: '2rem'
  },
})

export default function Home() {
  const classes = useStyle();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Formik initialValues={{files:[]}} onSubmit={() => {}}>
          {({ values, errors }) => (
            <Form>
              <Grid container spacing={2} direction="column">
                <h1>Nextjs File Upload</h1>
               
               <FileUpload name="File" />
              </Grid>

              <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
