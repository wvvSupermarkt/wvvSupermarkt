import React from 'react';
import { Container, fade } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Link as MuiLink } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    footer: {
        padding: theme.spacing(4, 1),
        marginTop: 'auto',
        background: `linear-gradient(60deg, ${fade(theme.palette.secondary.light, 0.7)} 30%, ${fade(theme.palette.secondary.main, 0.7)} 90%)`
        // backgroundColor:
        //     theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[300],
    },
}));

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'© '}
            <MuiLink color="inherit" href="https://dominic-plein.jimdofree.com/">
                Dominic Plein
            </MuiLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <Typography variant="body1" align="center">
                    This is my first Next.js (React) + Material-UI + Typescript project 😍
                </Typography>
                <Copyright />
            </Container>
        </footer>
    );
}

export default Footer;
