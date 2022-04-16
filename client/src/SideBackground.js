import {
    Box,
    Typography,
    Paper,
} from '@material-ui/core';

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({


    bgCover: {
        position: 'relative',
        color: '#fff',
        backgroundSize: 'cover',
        backgroundImage: `linear-gradient(
      #3a8dffdb, 
      #86B9FF99), 
      url(https://res.cloudinary.com/dudegkgw9/image/upload/v1649547464/bg-img_vibhmf.png)`,
        height: '100vh',
        opacity: 0.85
    },
    bgTextContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    bgText: {
        position: 'relative'
    },
    bgIcon: {
        marginBottom: '40px'
    },

}));



export default function SideBackground() {
    const classes = useStyles()

    return (
        <Paper className={classes.bgCover}>


            <Box className={classes.bgTextContainer}>

                <Typography variant="h4" className={classes.bgText} align="center">
                    <img src={'https://res.cloudinary.com/dudegkgw9/image/upload/v1649547522/bubble_pzjwcj.svg'} className={classes.bgIcon} /> <br />

                    Converse with anyone <br />
                    with any language
                </Typography>
            </Box>

        </Paper>
    );

}