import React,{useState} from 'react'
import './LeftScreen.css'
import UserProfile from '../../components/userprofile/UserProfile'
import ChatList from '../../components/chatlist/ChatList'

function LeftScreen() {
    const [leftScreen,setLeftScreen]=useState('chatlist');
    
    const leftScreenChange=(component)=>setLeftScreen(component);

    
    return (
        <div className="left__screen">
      

       { leftScreen==='userprofile'  &&     <UserProfile change={leftScreenChange}/> }
       { leftScreen==='chatlist'     &&    <ChatList change={leftScreenChange}/> }

        </div>
    )
}

export default LeftScreen