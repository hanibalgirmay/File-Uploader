import { createTheme } from '@material-ui/core/styles'

// light theme instance
export const lightTheme = createTheme();

// dark theme instance
export const darkTheme = createTheme({
    palette:{
        type: 'dark'
    }
})