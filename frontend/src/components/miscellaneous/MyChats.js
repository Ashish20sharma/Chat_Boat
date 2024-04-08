import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import GrooupChatModel from "./GroupChatModel";
import ChatLoading from '../ChatLoading';
import { getSender } from '../../config/chatLogics';

function MyChats({fetchAgain}) {
  const [loggedUser, setLoggedUser] = useState()
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Autherization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.get("/chat/fetchChats", config);
      console.log(data)
      setChats(data)
    } catch (error) {
      toast({
        title: 'Error occured.',
        description: "Failed to Load the chats",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "top-left"
      })
    }
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("user")));
    fetchChats();
  }, [fetchAgain])
  return (
    <Box display={{ base: selectedChat?"none":"flex", md: "flex" }} flexDir="column" alignItems="center" p={3} bg="white" w={{ base: "100%", md: "31%" }} borderRadius="lg" borderWidth="1px">
      <Box pb={3} px={3} fontSize={{ base: "28px", md: "30px" }} fontFamily="work sans" display="flex" width="100%" justifyContent="space-between" alignItems="center">
        My Chats
        <GrooupChatModel>
          <Button display="flex" fontSize={{ base: "17px", md: "10px", lg: "17px" }} rightIcon={<i className="ri-add-line"></i>}>New Group Chat</Button>
        </GrooupChatModel>
      </Box>
      <Box display="flex" flexDir="column" p={3} bg="#F8F8F8" width="100%" height="100%" borderRadius="lg" overflow="hidden">
        {chats? (<Stack overflowY="scroll">
          {chats.map((chats)=>{
            return <Box onClick={()=>setSelectedChat(chats)} cursor="pointer" bg={selectedChat===chats?"#38B2AC":"#E8E8E8"} _hover={{background:"#38B2AC",color:"white"}} color={selectedChat===chats?"White":"black"} px={3} py={2} borderRadius="lg" key={chats} >
            <Text>
              {!chats.isGroupChat?(
                getSender(loggedUser,chats.users)
              ):chats.chatName}
            </Text>
          </Box>
          }) }
        </Stack>):(
          <ChatLoading/>
        )}
      </Box>
    </Box>
  )
}
export default MyChats
// base:selectedChat ? "none":"flex"