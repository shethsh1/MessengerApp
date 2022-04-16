import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search, Chat, CurrentUser } from './index';
import { useSelector } from 'react-redux'

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 21,
    paddingRight: 21,
    flexShrink: 0,
    width: '325px',
    overflow: 'auto'
  },
  title: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 15,
  },
}));

const Sidebar = ({
  handleChange,
  searchTerm,
  handleLogout
}) => {
  const classes = useStyles();
  const conversations = useSelector(state => state.conversations.conversations)

  return (
    <Box className={classes.root}>
      <CurrentUser handleLogout={handleLogout} />
      <Typography className={classes.title}>Chats</Typography>
      <Search handleChange={handleChange} />
      {conversations
        .filter((conversation) =>
          conversation.otherUser.username.includes(searchTerm)
        )
        .map((conversation) => {
          return (
            <Chat
              conversation={conversation}
              key={conversation.otherUser.username}
            />
          );
        })}
    </Box>
  );
};

export default Sidebar;
