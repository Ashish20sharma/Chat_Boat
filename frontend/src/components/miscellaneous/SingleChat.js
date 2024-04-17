import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, IconButton, Text, Spinner, FormControl, Input, useToast } from '@chakra-ui/react';
import { getSender, getSenderFull } from '../../config/chatLogics';
import ProfileModel from './ProfileModel';
import UpdateGroupChatModel from './UpdateGroupChatModel';
import axios from 'axios';
import "./style.css";
import ScrollableChat from './ScrollableChat';

function SingleChat({ fetchAgain, setFetchAgain }) {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([])
    const [newMessage, setnewMessage] = useState()
    const { user, selectedChat, setSelectedChat } = ChatState();
    const toast = useToast()

    const fetchMessages=async()=>{
        if(!selectedChat){
            return;
        }

        try {
            setLoading(true)
            const config={
                headers:{
                    Autherization:`Bearer ${user.token}`
                }
            }
            const {data}=await axios.get(`/message/${selectedChat._id}`,config);
            console.log(messages)
            setMessages(data);
            setLoading(false)
        } catch (error) {
            toast({
                    description: 'Failed to load messages.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: "top-left"
                });
        }
    }

    useEffect(()=>{
        fetchMessages();
    },[setSelectedChat])

    const sendMessage = async(event) => {
        if (event.key === "Enter" && newMessage) {
            try {
                setLoading(true)
                const config = {
                    headers: {
                        "Content-Type":"application/json",
                        Autherization: `Bearer ${user.token}`
                    }
                }
                setnewMessage("")
                const { data } =await axios.post("/message/", { content: newMessage, chatId: selectedChat._id }, config);
                // console.log(data)
                setMessages([...messages,data])
                setLoading(false)
            } catch (error) {
                toast({
                    description: 'Something went wrong.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: "top-left"
                });
                setLoading(false)
            }
        }
    }
    const typingHandler = (e) => {
        setnewMessage(e.target.value);

        // typing indicator Logic
    }
    return (
        <>
            {selectedChat ? (<>
                <Text fontSize={{ base: "28px", md: "30px" }} pb={3} px={2} w="100%" fontFamily="work sans" display="flex" justifyContent={{ base: "space-between" }} alignItems="center">
                    <IconButton display={{ base: "flex", md: "none" }} icon={<i class="ri-arrow-left-line"></i>} onClick={() => setSelectedChat("")} />
                    {!selectedChat.isGroupChat ? (<>
                        {getSender(user, selectedChat.users)}
                        <ProfileModel user={getSenderFull(user, selectedChat.users)} />
                    </>) :
                        (
                            <>
                                {selectedChat.chatName.toUpperCase()}
                                {<UpdateGroupChatModel fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages}/>}
                            </>
                        )}
                </Text>
                <Box display="flex" flexDir="column" justifyContent="flex-end" p={3} bg="#E8E8E8" w="100%" h="100%" border="lg"
                    overflow="hidden">
                    {loading ? (
                        <Spinner size="xl" w={20} h={20} alignItems="center" margin="auto" />
                    ) : (
                        <div className='messages'>
                            <ScrollableChat messages={messages}/>
                        </div>
                    )}
                    <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                        <Input variant="filled" bg="#E0E0E0" placeholder='Enter a message..' onChange={(e) => typingHandler(e)} value={newMessage} />
                    </FormControl>
                </Box>
            </>) : (
                <Box display="flex" alignItems="center" justifyContent="center" h="100%">
                    <Text fontSize="3xl" pb={3} fontFamily="work sans">
                        Click on a user to start chatting
                    </Text>
                </Box>
            )}
        </>
    )
}

export default SingleChat
