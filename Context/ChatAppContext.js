import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

// INTERNAL IMPORT
import { checkIfWalletConnected, connectWallet, connectingWithContract } from "../Utils/apiFeature";

export const ChatAppContext = React.createContext();
export const ChatAppProvider = ({children}) => {
    // const title = "Hey Welcome to ChatVault";
    // USESTATE
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [friendLists, setFriendLists] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [error, setError] = useState("");

    // CHAT USER DATA
    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");
    const router = useRouter();

    // FETCH DATA TIME OF PAGE LOAD
    const fetchData = async () => {
        try {
            // GET CONTRACT
            const contract = await connectingWithContract();
            // GET ACCOUNT
            const connectAccount = await connectWallet();
            setAccount(connectAccount);
            // GET USER NAME
            // const userName = await contract.getUsername(connectAccount);
            // setUserName(userName);
            // GET FRIEND LISTS
            const friendLists = await contract.getMyFriendList();
            setFriendLists(friendLists);
            // GET ALL APP USER
            const userList = await contract.getAllAppUser();
            setUserLists(userList);
        } catch (error) {
            setError("Please Insatll and Connect your Wallet");
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    // READ MESSAGE
    const readMessage = async (friendAddress) => {
        try {
            const contract = await connectingWithContract();
            const read = await contract.readMessage(friendAddress);
            setFriendMsg(read);
        } catch (error) {
            setError("Currently you have no message");
        }
    };

    // CREATE ACCOUNT
    const createAccount = async({name, accountAddress}) => {
        try {
            // if(name || accountAddress) return setError("Please fill all the fields");
            const contract = await connectingWithContract();
            const getCreatedUser = await contract.createAccount(name);
            setLoading(true);
            await getCreatedUser.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Error while creating account");
        }
    };

    // ADD YOUR FRIEND
    const addFriends = async(name, accountAddress) => {
        try {
            // if(name || accountAddress) return setError("Please fill all the fields");
            const contract = await connectingWithContract();
            const addMyFriend = await contract.addFriend(accountAddress, name);
            setLoading(true);
            await addMyFriend.wait();
            setLoading(false);
            router.push('/');
            window.location.reload();
        } catch (error) {
            setError("Something went wrong");
        }
    };

    // SEND MESSAGE
    const sendMessage = async({msg, address}) => {
        try {
            if(msg || address) return setError("Please fill all the fields");
            const contract = await connectingWithContract();
            const sendMsg = await contract.sendMessage(address, msg);
            setLoading(true);
            await sendMsg.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Something went wrong");
        }
    };

    // READ INFO
    const readUser = async(userAddress) => {
        const contract = await connectingWithContract();
        const userName = await contract.getUsername(userAddress);
        setCurrentUserName(userName);
        setCurrentUserAddress(userAddress);
    };
    
    return (
        <ChatAppContext.Provider value={{ readMessage, createAccount, addFriends, sendMessage, readUser, connectWallet, checkIfWalletConnected, 
            account, userName, friendLists, friendMsg, loading, userLists, error, currentUserName, currentUserAddress }}>
            {children}
        </ChatAppContext.Provider>
    );
}
