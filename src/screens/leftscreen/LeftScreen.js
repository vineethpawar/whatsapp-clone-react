import React,{useState} from 'react'
import './LeftScreen.css'
import UserProfile from '../../components/userprofile/UserProfile'
import ChatList from '../../components/chatlist/ChatList'
import ArchievedList from './../../components/archieved/ArchievedList';
import BlockedList from './../../components/blocked/BlockedList';
import AddContact from './../../components/addcontact/AddContact';

function LeftScreen() {
    const [leftScreen,setLeftScreen]=useState('chatlist');
    
    const leftScreenChange=(component)=>setLeftScreen(component);
    
    
    return (
        <div className="left__screen">
      

       { leftScreen==='userprofile'  &&     <UserProfile change={leftScreenChange}/> }
       { leftScreen==='chatlist'     &&    <ChatList change={leftScreenChange}/> }
       { leftScreen==='archieved'  &&   <ArchievedList change={leftScreenChange}/>}
       { leftScreen==='blocked'  &&    <BlockedList change={leftScreenChange}/>}
       { leftScreen==='createuserchat'  &&    <AddContact change={leftScreenChange}/>}
        </div>
    )
}

export default LeftScreen