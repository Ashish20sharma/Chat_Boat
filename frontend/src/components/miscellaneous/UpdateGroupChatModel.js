import { Button,Lorem, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Box, Input, FormControl } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const UpdateGroupChatModel = ({ fetchAgain, setFetchAgain }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {user,selectedChat,setSelectedChat} = ChatState();
    const [groupChatName,setGroupChatName]=useState();
    const [search,setSearch]=useState();
    const [renameloading,setRenameloading]=useState(false)
    const [loading,setLoading]=useState(false)
    const handleremove=()=>{

    }
    const handleRename=()=>{

    }
    const handleSearch=()=>{

    }
    const handleRemove=()=>{

    }
    return (
        <>
            <IconButton icon={<i class="ri-eye-line"></i>} display={{base:"flex"}} onClick={onOpen}/>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="35px" fontFamily="Work sans" display="flex" justifyContent="center">{selectedChat.chatName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
                            {selectedChat.users.map((u)=>{
                                return <UserBadgeItem key={user._id} user={u} handleFunction={() => handleremove(u)} />
                            })}
                        </Box>
                        <FormControl display="flex">
                            <Input placeholder="Chat name" mb={3} value={groupChatName} onChange={(e)=>setGroupChatName(e.target.value)}/>
                            <Button variant="solid" colorScheme='teal' ml={1} isLoading={renameloading} onClick={handleRename}>Update</Button>
                        </FormControl>
                        <FormControl>
                        <Input placeholder="Add User to Group" mb={3} value={groupChatName} onChange={(e)=>handleSearch(e.target.value)}/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' onClick={()=>handleRemove(user)}>
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupChatModel
