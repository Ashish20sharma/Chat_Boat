import React from 'react'
import ScrollableFeed from "react-scrollable-feed"
function ScrollableChat({messages}) {
  return (
    <ScrollableFeed>
      {messages && messages.map((m,i)=>{
        return <div style={{display}}>

        </div>
      })}
    </ScrollableFeed>
  )
}

export default ScrollableChat
