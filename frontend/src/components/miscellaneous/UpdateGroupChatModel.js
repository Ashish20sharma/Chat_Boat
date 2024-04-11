import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Box, Input, FormControl, useToast, Spinner } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import axios from "axios"
import UserListItem from '../UserAvatar/UserListItem';

const UpdateGroupChatModel = ({ fetchAgain, setFetchAgain }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, selectedChat, setSelectedChat } = ChatState();
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult,setSearchResult]=useState([]);
    const [renameloading, setRenameloading] = useState(false)
    const [loading, setLoading] = useState(false)
    const toast = useToast();
    const handleremove = async (user1) => {
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
            const { data } = await axios.put("/chat/removeFromGroup", { chatId: selectedChat._id, userId: user1._id }, config)

            user1._id === user.data._id ? setSelectedChat() : setSelectedChat(data);
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
    const handleRename = async() => {
        if(!groupChatName){
            toast({
                title: 'Error occured.',
                description: "Please fill the group name",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top-left"
            })
            return;
        }
            try {
                setRenameloading(true)
                const config = {
                headers: {
                    Autherization: `Bearer ${user.token}`
                }
            }
                const {data}=await axios.put(`/chat/updateGroupName/`,{chatId:selectedChat._id,chatName:groupChatName},config);
                setSelectedChat(data)
                setFetchAgain(!fetchAgain)
                setRenameloading(false)
            } catch (error) {
                toast({
                title: 'Error occured.',
                description: "Failed to Update the Group Name",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top-left"
            })
            setRenameloading(false)
            }
            setGroupChatName("");
    }

    const handleSearch=async(quary)=>{
        setSearch(quary)
        if(!quary){
            return;
        }
        try {
            setLoading(true)

            const config={
                headers:{
                    Autherization:`Bearer ${user.token}`
                }
            }

            const {data}=await axios.get(`/searchUser/Search/${search}`,config)
            console.log(data)
            setLoading(false)
            setSearchResult(data.user)
        } catch (error) {
            toast({
                title: 'Error Occured!.',
                description:'Failed to Load the Search Result',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position:"top-left"
            })
            setLoading(false);
        }
    }

    const handleAddUser=async(id)=>{
        if(selectedChat.users.find((u)=>u._id === id._id)){
            toast({
                description:'User Alraedy in the Group.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position:"top-left"
            });
            return;
        }
        if(selectedChat.groupAdmin._id !== user._id){
            toast({
                description:'Only admin can Add someone.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position:"top-left"
            });
            return;
        }
        try {
            setLoading(true);
            const config={
                headers:{
                    Autherization:`Bearer ${user.token}`
                }
            }
            const {data}=await axios.post("/chat/addToGroup",{chatId:selectedChat._id,userId:id._id},config);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            toast({
                title: 'Error Occured!.',
                description:'Failed to Add to group.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position:"top-left"
            });
            setLoading(false);
        }
    }
    const handleRemove = async(user1) => {
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
            const { data } = await axios.put("/chat/removeFromGroup", { chatId: selectedChat._id, userId: user1._id }, config)

            user1._id === user.data._id ? setSelectedChat() : setSelectedChat(data);
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
                            <Input placeholder="Add User to Group" mb={3}  onChange={(e) => handleSearch(e.target.value)} />
                        </FormControl>
                        {loading ?<Spinner size="lg"/>:
                        (
                            searchResult.map((user)=>{
                                return <UserListItem key={user._id} user={user} handleFunction={()=>handleAddUser(user)}/>
                            })
                        )}
                    </ModalBody>
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
