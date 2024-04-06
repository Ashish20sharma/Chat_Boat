import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, IconButton, Text } from '@chakra-ui/react';

function SingleChat({ fetchAgain, setFetchAgain }) {
    const { user, selectedChat, setSelectedChat } = ChatState();
    return (
        <>
            {selectedChat ? (<>
            <Text fontSize={{base:"28px",md:"30px"}} pb={3} px={2} w="100%" fontFamily="work sans" display="flex" justifyContent={{base:"space-between"}} alignItems="center">
                <IconButton display={{base:"flex" ,md:"none"}} icon={<i class="ri-arrow-left-line"></i>} onClick={()=>setSelectedChat("")}/>
                {!selectedChat.isGroupChat?(<>
                    
                </>):
                (
                    <>
                    {selectedChat.chatName.toUpperCase()}
                    </>
                )}
            </Text>
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
