import React from 'react'
import ScrollableFeed from "react-scrollable-feed"
import { isLastMessage, isSameSender } from '../../config/chatLogics'
import { ChatState } from '../../Context/ChatProvider'
import { Avatar, Tooltip } from '@chakra-ui/react';
function ScrollableChat({messages}) {
    const{user}=ChatState();
  return (
    <ScrollableFeed>
      {messages && messages.map((m,i)=>{
        return (<div style={{display:"flex"}} key={m._id}>
            {
                (isSameSender(messages,m,i,user._id)
            || isLastMessage(messages,i,user._id))
            && (
                <Tooltip label={m.sender.name} placement='bootom-start' hasArrow >
                    <Avatar mt="7px" mr={1} size="sm" cursor="pointer" name={m.sender.name} src="m.sender.pic" />
                </Tooltip>
            )
            }
        </div>)
      })}
    </ScrollableFeed>
  )
}

export default ScrollableChat
