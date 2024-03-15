import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { json } from 'react-router-dom';
import { ChatState } from '../../Context/ChatProvider';

function MyChats() {
  const [loggedUser, setLoggedUser] = useState()
  const {selectedChat,setSelectedChat,user,chats,setChats}=ChatState();
  console.log(user);
  const toast=useToast();
  const fetchChats=async ()=>{
    try {
      const config={
        headers:{
          Autherization:`Bearer ${user.token}`
        }
      }
      console.log(config)
     const {data}= await axios.get("/chat/fetchChats",config);
      setChats(data)
    } catch (error) {
      toast({
        title: 'Error occured.',
        description:"Failed to Load the chats",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position:"top-left"
    })
    }
  }

  useEffect(()=>{
    setLoggedUser(JSON.parse(localStorage.getItem("user")));
    fetchChats();
  },[])
  return (
    <Box display={{ base: "none", md: "flex" }} flexDir="column" alignItems="center" p={3} bg="white" w={{ base: "100%", md: "31%" }} borderRadius="lg" borderWidth="1px">
      <Box pb={3} px={3} fontSize={{ base: "28px", md: "30px" }} fontFamily="work sans" display="flex" width="100%" justifyContent="space-between" alignItems="center">
        My Chats
        <Button display="flex" fontSize={{base:"17px" , md:"10px" ,lg:"17px"}} rightIcon={<i class="ri-add-line"></i>}>New Grout Chat</Button>
      </Box>
      <Box display="flex" flexDir="column" p={3} bg="#F8F8F8" width="100%" height="100%" borderRadius="lg" overflow="hidden">
            <Stack overflowY="scroll">
                <Box cursor="pointer" bg={"#E8E8E8"} color={"black"} px={3} py={2} borderRadius="lg" key="" >
                  <Text>
                    Ashish sharma
                  </Text>
                </Box>
            </Stack>
      </Box>
    </Box>
  )
}

export default MyChats
// base:selectedChat ? "none":"flex"