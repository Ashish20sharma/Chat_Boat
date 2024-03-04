import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react';
import SIdeDrawer from '../components/miscellaneous/SIdeDrawer';
import ChatBox from '../components/miscellaneous/ChatBox';
import MyChats from '../components/miscellaneous/MyChats';

export default function ChatPage() {
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {user && <SIdeDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  )
}
