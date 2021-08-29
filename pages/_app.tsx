import { AppBar, Box, Container, createStyles, makeStyles, CssBaseline, IconButton, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import BrightnessIcon from '@material-ui/icons/Brightness4';
import DarkIcon from '@material-ui/icons/Brightness7';
import { display } from '@material-ui/system';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { darkTheme, lightTheme } from './themes/themes';

const useStyles = makeStyles(() =>
    createStyles({
        title: {
            flexGrow: 1,
        },
        toolbar:{
            height:'60px',
            width: '100%',
            display:'flex',
            margin: 'auto',
            padding: 'auto',
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        }
    })
)

const App = ({ Component, pageProps }: AppProps) => {
    const classes = useStyles();
    const [theme, setTheme] = useState(darkTheme);
    const isDark = theme === darkTheme;

    useEffect(() => {
        // remove serverside css integration
        const jsStyles = document.querySelector('#serverSide');
        if (jsStyles) {
            jsStyles.parentElement.removeChild(jsStyles);
        }
    }, [])

    return (
        <React.Fragment>
            <Head>
                <title>React File Upload using Nextjs and material-ui</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=7" />
            </Head>
            <ThemeProvider theme={theme}>
                <AppBar className={classes.toolbar} position="fixed">
                    <Toolbar variant="regular">
                        <Typography variant="h5" className={classes.title}>
                            File Uploads
                        </Typography>
                        <IconButton
                            aria-label={isDark ? 'Change to Light theme' : 'Change to Dark Theme'}
                            onClick={() => {
                                const newTheme = isDark ? lightTheme : darkTheme;
                                setTheme(newTheme);
                            }}>
                            {isDark ? <BrightnessIcon /> : <DarkIcon />}
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Container>
                    <Box marginTop={10}>
                        <Component {...pageProps} />
                    </Box>
                </Container>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;