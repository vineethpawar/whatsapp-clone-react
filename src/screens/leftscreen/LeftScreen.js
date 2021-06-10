import React from 'react'
import './LeftScreen.css'
import UserProfile from '../../components/userprofile/UserProfile'
import ChatList from '../../components/chatlist/ChatList'
function LeftScreen() {
    return (
        <div className="left__screen">
            {/* <UserProfile /> */}
            <ChatList/>
        </div>
    )
}

export default LeftScreen
