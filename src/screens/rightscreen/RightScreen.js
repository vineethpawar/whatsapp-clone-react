import React,{useState,useEffect,createContext} from 'react'
import './RightScreen.css'
import ChatHeader from './../../components/chatheader/ChatHeader';
import ChatInput from '../../components/chatinput/ChatInput';
import ChatContent from '../../components/chatcontent/ChatContent';


const updateScroll = () =>{
    var element = document.getElementById("chat__messages__content");
    element.scrollTop = element.scrollHeight;
}


function RightScreen() {

    const calcChatHeight = () =>{
        setChatInputHeight(document.getElementById('chat__input__wrapper').offsetHeight) 
    }


    const [chatInputHeight,setChatInputHeight]=useState(0);
    useEffect(()=>{
        if(document.getElementById('chat__input__wrapper'))
            calcChatHeight()

            setTimeout(updateScroll,10);   
    },[])
   

    return (
        <div className="right__screen ">


            { false ?

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
                        <ChatHeader/>
                    </div>

 
                    <div id='chat__messages__content' className="chat__messages__content" style={{marginBottom:`${chatInputHeight}px`}} >
                        <ChatContent/>
                    </div>
            
              
                    <div id="chat__input__wrapper" className="chat__input__wrapper">
                        <ChatInput/>
                    </div>
                    </>
            } 

        </div>
    )
}

export default RightScreen

