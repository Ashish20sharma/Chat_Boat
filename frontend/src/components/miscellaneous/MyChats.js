import { Box, Button, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

function MyChats() {
  const [loggedUser, setLoggedUser] = useState()
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