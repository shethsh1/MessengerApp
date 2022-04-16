
import { createSlice, current } from "@reduxjs/toolkit";
import { socket } from "../../context/socket";
import axios from "axios";




const updateDatabaseMessages = async (conversationId) => {
    try {
        await axios.put(`/api/messages/${conversationId}`)
    } catch (err) {
        console.log(err)
    }
}

function sortByMessages(conversations) {
    conversations.sort(
        (convo1, convo2) =>
            new Date(convo2.messages[convo2.messages.length - 1]?.createdAt) -
            new Date(convo1.messages[convo1.messages.length - 1]?.createdAt)
    );

}

export const conversationsSlice = createSlice({
    name: 'conversationsReducer',
    initialState: {
        conversations: [],
        activeConversation: null,
        loading: false
    },
    reducers: {

        removeOfflineUser: (state, action) => {
            const id = action.payload
            state.conversations = state.conversations.map((convo) => {
                if (convo.otherUser.id === id) {
                    convo.otherUser.online = false
                }
                return convo
            })
        },



        addOnlineUser: (state, action) => {
            const id = action.payload
            state.conversations = state.conversations.map((convo) => {
                if (convo.otherUser.id === id) {
                    convo.otherUser.online = true
                    return convo
                } else {
                    return convo
                }
            })
        },

        setConversations: (state, action) => {
            state.conversations = action.payload
            sortByMessages(state.conversations)
        },



        setActiveChat: (state, action) => {
            const [username, myId] = action.payload
            state.activeConversation = username
        },

        addSearchedUsers: (state, action) => {

            const users = action.payload
            const currentUsers = {};

            // make table of current users so we can lookup faster
            state.conversations.forEach((convo) => {
                currentUsers[convo.otherUser.id] = true;
            });

            const newState = [...state.conversations];
            users.forEach((user) => {
                // only create a fake convo if we don't already have a convo with this user
                if (!currentUsers[user.id]) {
                    let fakeConvo = { otherUser: user, messages: [] };
                    newState.push(fakeConvo);
                }
            });
            state.conversations = newState


        },
        clearSearchedUsers: (state) => {
            state.conversations = state.conversations.filter((convo) => convo.id)
        },
        addMessageToConversation: (state, action) => {
            const { message, sender = null, userId = null } = action.payload;
            if (sender !== null) {
                const newConvo = {
                    id: message.conversationId,
                    otherUser: sender,
                    messages: [message],
                };
                newConvo.latestMessageText = message.text;
                state.conversations.push(newConvo)
                newConvo.notSeenCount = 1
                sortByMessages(state.conversations)
                return
            }

            // need curUser
            //  1: we got a message from the other user
            //  2: we found the index where conversation.username === state.activeConversation
            //  3: then we checked if state.conversations[index].id ==== message.conversationId
            if (userId !== null && message.senderId !== userId) {
                const index = state.conversations.findIndex((conversation) => conversation.otherUser.username === state.activeConversation)
                if (index !== -1 && state.conversations[index].id === message.conversationId) {
                    socket.emit("read-message", message.conversationId, userId)
                    message.seen = true
                    updateDatabaseMessages(message.conversationId)
                }
            }




            state.conversations.forEach((convo) => {
                if (convo.id === message.conversationId) {
                    convo.messages.push(message);
                    convo.latestMessageText = message.text;
                    if (message.seen === false && message.senderId !== userId) {
                        convo.notSeenCount += 1
                    }
                }
            });
            sortByMessages(state.conversations)

            console.log(current(state.conversations))





        },
        addNewConvo: (state, action) => {
            const [recipientId, message] = action.payload


            state.conversations.forEach((convo) => {
                if (convo.otherUser.id === recipientId) {
                    socket.emit("join-room", message.conversationId, recipientId)
                    convo.messages.push(message);
                    convo.latestMessageText = message.text;
                    convo.id = message.conversationId;
                }
            });
            sortByMessages(state.conversations)



        },

        readMessage: (state, action) => {
            const [conversationId, userId, readerId = null] = action.payload
            const index = state.conversations.findIndex((conversation) => conversation.id === conversationId)


            if (readerId && readerId !== userId) {
                for (const message of state.conversations[index].messages) {
                    if (readerId !== userId && message.senderId === userId && message.seen === false) {
                        message.seen = true
                    }

                }
                return

            }


            for (const message of state.conversations[index].messages) {
                if (message.seen === false && message.senderId !== userId) {
                    message.seen = true
                    state.conversations[index].notSeenCount -= 1
                }

            }

        },





    }
})



export const { setConversations, addMessageToConversation, addNewConvo, addSearchedUsers,
    clearSearchedUsers, setActiveChat, removeOfflineUser, addOnlineUser, readMessage } = conversationsSlice.actions



export const clearSeenAlerts = (conversationId, userId) => async dispatch => {
    dispatch(readMessage([conversationId, userId]))
    updateDatabaseMessages(conversationId)
    socket.emit("read-message", conversationId, userId)

}


// FETCH CONVERSATIONS

export const fetchConversations = () => async dispatch => {
    try {
        const { data } = await axios.get("/api/conversations");

        for (const conversation of data) {
            socket.emit("join-room", conversation.id);
        }
        dispatch(setConversations(data))

    } catch (err) {
        return console.log(err)
    }
}

// POST MESSAGE


export const postMessage = (body) => async dispatch => {
    try {

        const data = await saveMessage(body);
        if (!body.conversationId) {
            dispatch(addNewConvo([body.recipientId, data.message]));
        } else {
            data.userId = body.userId
            dispatch(addMessageToConversation(data));
        }

        sendMessage(data, body);
    } catch (error) {
        console.error(error);
    }
};


const saveMessage = async (body) => {
    const { data } = await axios.post("/api/messages", body);
    return data;
};

const sendMessage = (data, body) => {
    socket.emit("new-message", {
        message: data.message,
        recipientId: body.recipientId,
        sender: data.sender,
    });
};


export default conversationsSlice.reducer;
