import React from 'react'

import { Link as DomLink } from 'react-router-dom';
import {
    Box,
    Button,
    Paper,
    Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    linkContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        maxWidth: '80%',
        width: '100%',
        marginTop: '50px',
        gap: '40px'
    },

    links: {
        textDecoration: 'none',
        cursor: 'pointer',
        color: theme.palette.secondary.main

    },

    linkButton: {
        border: 'none',
        color: theme.palette.primary.main,
        textTransform: 'none',
        paddingTop: '12px',
        paddingBottom: '12px',
        width: '170px',

        textDecoration: 'none'
    },





}));

export default function LinksHeader({ textOne, link, textTwo }) {
    const classes = useStyles()

    return (
        <Box className={classes.linkContainer}>
            <Link component={DomLink} to={link} className={classes.links}>
                {textOne}
            </Link>
            <Link component={DomLink} to={link}>
                <Paper elevation={3} component={Button} className={classes.linkButton}>
                    {textTwo}
                </Paper>
            </Link>
        </Box>
    )
}