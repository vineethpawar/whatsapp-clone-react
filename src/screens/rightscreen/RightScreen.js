import React,{useState,useEffect,createContext} from 'react'
import './RightScreen.css'
import ChatHeader from './../../components/chatheader/ChatHeader';
import ChatInput from '../../components/chatinput/ChatInput';
import ChatContent from '../../components/chatcontent/ChatContent';
function RightScreen() {

    const ChatHeightContext = createContext(); 

    const calcChatHeight = () =>{
        setChatInputHeight(document.getElementById('chat__input__wrapper').offsetHeight) 
    }


    const [chatInputHeight,setChatInputHeight]=useState(0);
    useEffect(()=>{
        calcChatHeight()
    })
   

    return (
        <div className="right__screen ">
            <div className="overlay"></div>

            <div className="chat__header__wrapper">
                <ChatHeader/>
            </div>

           
               
             
                
                {/* <textarea className="ppp" spellCheck='false' style={{height:theight}} onKeyPress={(e)=>autogrow(e)} name="" id=""  >awdawdawdawd</textarea> */}
            
                <div className="chat__messages__content" style={{marginBottom:`${chatInputHeight}px`}} >
                      <ChatContent/>
                </div>
           
              
                    <div id="chat__input__wrapper" className="chat__input__wrapper">
                        <ChatInput/>
                    </div>
               

          
        
        </div>
    )
}

export default RightScreen

