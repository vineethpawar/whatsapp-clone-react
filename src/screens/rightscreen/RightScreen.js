import React,{useState,useEffect,useContext} from 'react'
import './RightScreen.css'
import ChatHeader from './../../components/chatheader/ChatHeader';
import ChatInput from '../../components/chatinput/ChatInput';
import ChatContent from '../../components/chatcontent/ChatContent';
import { AuthContext } from '../../App';
import firebase from 'firebase'
import {db} from '../../firebase'
import ChatDetails from './../../components/chatdetails/ChatDetails';
import UpdateGroupChat from './../../components/updategroupchat/UpdateGroupChat';
import uuid from 'react-uuid';

const updateScroll = () =>{
    var element = document.getElementById("chat__messages__content");
    if(element)   element.scrollTop = element.scrollHeight;
    
}

const updateScrollTimeout = () =>{
    setTimeout(() => { updateScroll() }, 10);
}






function RightScreen({rightScreenChat}) {
    const [groupUpdate,setGroupUpdate]=useState(false)
    const  [count,setCount]=useState('0')
    const updateGroup = (status) => setGroupUpdate(status);
   

    const updateChatDetailsVisibility = (status)=>{
        setIsChatDetailsActive(status)
    }

 

    const [isChatDetailsActive,setIsChatDetailsActive]=useState(false)
    const [user0,setUser0]=useState({})
  
    const updateAuth = useContext(AuthContext);
    

    useEffect(()=>{
        if(rightScreenChat.length>0)  db.collection('chats').doc(rightScreenChat[3].id).onSnapshot(()=>setCount(uuid()));
        updateChatDetailsVisibility(false)
     
        firebase.auth().onAuthStateChanged((user0)=>{
            if(user0){
               db.collection('users').doc(user0.uid).get()
               .then((userDet)=>{
                   setUser0(userDet.data());
                  
                    
               })
            } else{
             updateAuth(false);
            }
        })   
    },[rightScreenChat])
   

    return ( <>
    
    {!isChatDetailsActive ?
        <div className="right__screen " >


            {!rightScreenChat.length>0 ?

                    <div className="nc__selected theme__dark">
                         <div className="overlay_cmp"></div>
                         <div className="center_content">
                               <img className="img__right" src="https://res.cloudinary.com/dpjkblzgf/image/upload/v1624266352/user_1_f2gpxz.svg" alt="" />
                                <h4 className="theme__font choose__chat ">Choose a chat to display messages...</h4>
                        </div>
                    </div>


                  : 
                  
                   <>  
                    <div className="overlay"></div>

                    <div className="chat__header__wrapper">
                        <ChatHeader rightScreenChat={rightScreenChat} updateChatDetailsVisibility={updateChatDetailsVisibility} />
                    </div>

                   {rightScreenChat.length &&
                    <div id='chat__messages__content' className="chat__messages__content" style={{marginBottom:`62px`}} >
                        <ChatContent count={count} rightScreenChat={rightScreenChat} updateScrollTimeout={updateScrollTimeout} user={user0}/>
                    </div>
                    }
              
                    <div id="chat__input__wrapper" className="chat__input__wrapper">
                        <ChatInput rightScreenChat={rightScreenChat} user={user0} updateScrollTimeout={updateScrollTimeout}/>
                    </div>
                    </>
            } 

        </div>
        :
        <>
        {
         groupUpdate ? 
          <UpdateGroupChat chatid={rightScreenChat[3].id} updateGroup={updateGroup} />
          :
          <ChatDetails rightScreenChat={rightScreenChat} user={user0} updateChatDetailsVisibility={updateChatDetailsVisibility} updateGroup={updateGroup} />
        }
         </>
      }
   
        </>
    )
}

export default RightScreen

