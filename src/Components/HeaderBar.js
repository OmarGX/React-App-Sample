import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const useStyle = makeStyles(theme =>({
    root: {
        background:theme.palette.primary,
        zIndex: 99
    },
    title: {
        flexGrow: 1
    },
    offset: theme.mixins.toolbar
}));

function HeaderBar() {
    const classes = useStyle()

    return(
        <React.Fragment>
            <AppBar position="fixed" className={classes.root}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>Filter Products</Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default HeaderBar;