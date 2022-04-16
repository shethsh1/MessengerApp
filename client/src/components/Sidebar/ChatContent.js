import React, { useEffect, useState } from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from 'react-redux'


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
    overflow: 'hidden'

  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  alertBubble: {
    position: 'relative',

    "& .MuiBadge-anchorOriginTopRightRectangular": {
      transform: 'none',
    },
    "& .MuiBadge-badge": {
      position: 'static'
    }
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden'
  },
  userTextContainer: {
    overflow: 'hidden',
    width: '100%',
    marginRight: '5px'
  },
  alertedMessage: {
    fontWeight: "bold",
    letterSpacing: -0.2
  }
}));

const ChatContent = ({ conversation }) => {
  const classes = useStyles();

  const { otherUser, notSeenCount = 0 } = conversation;
  const latestMessageText = conversation.id && conversation.latestMessageText;





  return (
    <Box className={classes.root} sx={{ overflow: 'hidden' }}>
      <Box className={classes.contentContainer}>
        <Box className={classes.userTextContainer}>
          <Typography className={classes.username}>
            {otherUser.username}
          </Typography>


          <Typography className={classes.previewText} >


            {latestMessageText}

          </Typography>


        </Box>


        {notSeenCount !== 0 ?
          <Badge overlap="rectangular" badgeContent={notSeenCount} color="primary" className={classes.alertBubble}>
          </Badge>
          : <></>}


      </Box>
    </Box >
  );
};

export default ChatContent;
