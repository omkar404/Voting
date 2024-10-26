import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Your primary color
        },
        secondary: {
            main: '#dc004e', // Your secondary color
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif', // Customize your font
    },
});

export default theme;