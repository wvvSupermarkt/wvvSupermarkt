// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sticky-footer/StickyFooter.js
import React from 'react';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { NextComponentType } from 'next';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    appBar: {
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 100%)`
    }
}));

const SiteLayout: React.FC<{ children: NextComponentType }> = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h5">
                        CodingConcert
                    </Typography>
                </Toolbar>
            </AppBar>

            <div>{children}</div>

            <Footer  />

        </div>
    );
};

export const getLayout = (page: NextComponentType) => <SiteLayout>{page}</SiteLayout>;

export default SiteLayout;
