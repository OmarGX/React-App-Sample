import { createMuiTheme } from "@material-ui/core";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#800080",
            contrastText: "#ffffff"
        },
        secondary: {
            main: "#0F625A",
            contrastText: "#ffffff"
        }
    },
    offsets: {
        toolbar: 64
    }
});

export default theme;