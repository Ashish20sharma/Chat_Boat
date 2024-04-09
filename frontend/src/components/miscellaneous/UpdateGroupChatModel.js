import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Box, Input, FormControl, useToast, Spinner } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import axios from "axios"

const UpdateGroupChatModel = ({ fetchAgain, setFetchAgain }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, selectedChat, setSelectedChat } = ChatState();
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState();
    const [renameloading, setRenameloading] = useState(false)
    const [loading, setLoading] = useState(false)
    const toast = useToast();
    const handleremove = async (user1) => {
        console.log(selectedChat)
        console.log(user)
        if (selectedChat.groupAdmin._id !== user.data._id && user1._id !== user.data._id) {
            toast({
                title: 'Only admin can remove someone!.',
                description: "Failed to Update the group",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top-left"
            })
            return;
        }
        try {
            setLoading(true)
            const config = {
                headers: {
                    Autherization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.post("/chat/removeFromGroup/", { chatId: selectedChat._id, userId: user1._id }, config)

            user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            toast({
                title: 'Error occured.',
                description: "Failed to Update the group",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top-left"
            })
        }
    }
    const handleRename = () => {

    }
    const handleSearch = () => {

    }
    const handleRemove = () => {

    }
    return (
        <>
            <IconButton icon={<i class="ri-eye-line"></i>} display={{ base: "flex" }} onClick={onOpen} />

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="35px" fontFamily="Work sans" display="flex" justifyContent="center">{selectedChat.chatName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
                            {selectedChat.users.map((u) => {
                                return <UserBadgeItem key={user._id} user={u} handleFunction={() => handleremove(u)} />
                            })}
                        </Box>
                        <FormControl display="flex">
                            <Input placeholder="Chat name" mb={3} value={groupChatName} onChange={(e) => setGroupChatName(e.target.value)} />
                            <Button variant="solid" colorScheme='teal' ml={1} isLoading={renameloading} onClick={handleRename}>Update</Button>
                        </FormControl>
                        <FormControl>
                            <Input placeholder="Add User to Group" mb={3} value={groupChatName} onChange={(e) => handleSearch(e.target.value)} />
                        </FormControl>
                    </ModalBody>
                    {loading && <Spinner />}
                    <ModalFooter>
                        <Button colorScheme='red' onClick={() => handleRemove(user)}>
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupChatModel
