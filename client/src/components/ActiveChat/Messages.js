import React, { useEffect, useRef } from 'react';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';
import { useDispatch } from 'react-redux'
import { clearSeenAlerts } from '../../redux/slice/conversationsSlice'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  chatContainer: {
    overflow: 'auto',
    paddingLeft: '41px',
    paddingRight: '41px'

  },
}));

const Messages = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { messages, otherUser, conversationId, userId, notSeenCount } = props;
  const lastSeenMessage = useRef(-1)
  const lastMessage = useRef(null)



  useEffect(() => {
    console.log(notSeenCount)
    console.log(userId)
    if (userId && notSeenCount != null && notSeenCount !== 0) {
      dispatch(clearSeenAlerts(conversationId, userId))
    }

  }, [conversationId, dispatch, userId, notSeenCount])




  const scrollToLastMessage = () => {
    lastMessage.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    // first visit
    console.log('first visit')
    lastMessage.current?.scrollIntoView()
  }, [otherUser])

  useEffect(() => {
    // next visits
    console.log('second visit')
    scrollToLastMessage()
    console.log(lastMessage.current)
  }, [messages])









  return (
    <Box className={classes.chatContainer}>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');

        if (message.seen === true && message.senderId === userId) {
          lastSeenMessage.current = message.id
        }


        return message.senderId === userId ? (
          <SenderBubble reff={lastMessage} key={message.id} id={message.id} text={message.text} time={time} lastSeenMessage={lastSeenMessage} otherUser={otherUser} />

        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            reff={lastMessage}

          />
        );
      })}
    </Box>
  );
};

export default Messages;
