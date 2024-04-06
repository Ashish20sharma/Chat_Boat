import { Box, Button, DrawerBody, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SelectField, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import { json } from 'react-router-dom';

function GroupChatModel({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const { user,chats,setChats} = ChatState();
    const [GrooupChatName, setGroupChatName] = useState();
    const [serach, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [selectedUser, setselectedUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            setSearchResult([]);
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: { Autherization: `Bearer ${user.token}` }
            }
            const { data } = await axios.get(`/searchUser/Search/${query}`, config);
            setLoading(false);
            setSearchResult(data.user);
        } catch (error) {
            toast({
                title: 'Error occured.',
                description: "Failed to Load the ",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top-left"
            })
        }

    }

    const handleDelete = (deleteUser) => {
        const remove=selectedUser.filter((selected)=>{
            return selected._id!==deleteUser._id
        });
        setselectedUser(remove);
    }
    
    const handleGroup = (userToAdd) => {
        if (selectedUser.includes(userToAdd)) {
            toast({
                title: 'User already added.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "top-left"
            });
            return;
        }
        setselectedUser([...selectedUser, userToAdd]);
    }
    const handleSubmit = async() => {
        if(!GrooupChatName || selectedUser.length==0){
            toast({
                title: 'Please fill all the fields.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "top-left"
            });
            return;
        }
        else{
            try {
                const config={
                    headers:{Autherization:`Bearer ${user.token}`}
                }
                const {data}=await axios.post("/chat/createGroupChat/",{name:GrooupChatName,users:JSON.stringify(selectedUser.map((u)=>u._id))},config);
                setChats([data,...chats])
                onClose();
                toast({
                    title: 'New Group is created.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: "top-left"
                });
            } catch (error) {
                toast({
                    title: 'The Group is not craeted.',
                    description:`${error.message}`,
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                    position: "top-left"
                });
            }
        }
        
    }
    return (
        <>
            <span onClick={onOpen}>{children}</span>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Group Chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input ref={initialRef} placeholder='Group name' onInput={(e) => setGroupChatName(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4} mb={2}>
                            <Input placeholder='Add users eg: Jon,Piyush, Jane' onInput={(e) => handleSearch(e.target.value)} />
                        </FormControl>
                        <Box w="100%" display="flex" flexWrap="wrap">
                            {selectedUser.map((chat) => {
                                return <UserBadgeItem key={user._id} user={chat} handleFunction={() => handleDelete(chat)} />
                            })}
                        </Box>
                        {loading ? (<ChatLoading />) :
                            searchResult.map((user) => {
                                return <UserListItem
                                    key={user._id} user={user} handleFunction={() => handleGroup(user)} />
                            })}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModel
