import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Avatar } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 11,
    color: '#BECCE2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#91A3C0',
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: 'bold',
    wordBreak: 'break-word'
  },
  bubble: {
    background: '#F4F6FA',
    borderRadius: '10px 10px 0 10px',
    maxWidth: '50%'
  },
  avatar: {
    height: 20,
    width: 20,
    marginTop: '7px'
  }
}));

const SenderBubble = ({ id, time, text, reff, otherUser, lastSeenMessage }) => {
  const classes = useStyles();



  return (
    <Box ref={reff} className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>

      {lastSeenMessage.current === id ?
        <Avatar
          alt={otherUser.username}
          src={otherUser.photoUrl}
          className={classes.avatar}
        />
        : <>
        </>}

    </Box>
  );
};

export default SenderBubble;
