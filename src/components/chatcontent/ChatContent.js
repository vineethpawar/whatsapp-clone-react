import React,{useEffect,useState} from 'react'
import './ChatContent.css'
import {db} from '../../firebase'
import {format,isToday,isThisWeek,isYesterday} from 'date-fns'

const  getTimeOnly = (timestamp) =>{
      return format(new Date(timestamp), ' hh:mm aaa')
  }

 const  getDateOnly = (timestamp) =>{
    if(isToday(new Date(timestamp))) return 'Today'
    else if(isYesterday(new Date(timestamp))) return 'Yesterday'
    else if(isThisWeek(new Date(timestamp))) return format(new Date(timestamp), 'eeee')
    else  return format(new Date(timestamp), ' dd/MM/yyyy')
  }

function ChatContent({rightScreenChat,user,updateScrollTimeout}) {

    const [chatMessages,setChatMessages]=useState([]);
    useEffect(()=>{
       
        if(rightScreenChat[1]==='group'){
            db.collection('chats').doc(rightScreenChat[0]).onSnapshot((snapshot)=>{
                setChatMessages(snapshot.data().messages)
                updateScrollTimeout();
            })
            } else {
                db.collection('chats').doc(rightScreenChat[2]).onSnapshot((snapshot)=>{
               setChatMessages(snapshot.data().messages)
               updateScrollTimeout();
                } )      
               }

          
        },[rightScreenChat])
  
    
    
    return (

        <div id='chat_content' className="chat__content">

           { chatMessages.map((ele)=> 
               <div key={ele.mid} className={ele.uid===user.uid ? "chat__message theme__bg align_right":"chat__message theme__bg"}>
               <span className="cm__name">{rightScreenChat[1]==='group'? ele.from : null}</span>
                {ele.img.length ? <img style={{}} className="cm__img" src={ele.img} alt="" /> : null}
                
                {ele.content}               
                <span className="cm__time">{`${getDateOnly(ele.timePosted)},  ${getTimeOnly(ele.timePosted)}`}</span>
           </div>
               )}
            {/* <div className="chat__message theme__bg ">
                <span className="cm__name">Vineeth pawar ~ vineethpawar99</span>
                <img className="cm__img" src="" alt="" />
                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio numquam possimus quasi fugiat in corrupti, aperiam autem fuga quo cumque animi nobis sunt expedita! Necessitatibus aliquam quo quidem velit harum.               
                <span className="cm__time">2:02 pm</span>
            </div> */}


            {/* <div className="chat__message theme__bg align_right">
                <span className="cm__name">Vineeth pawar ~ vineethpawar99</span>
                    {rightScreenChat[2]}            
            </div>

           

            <div className="chat__message theme__bg align_right">
                <img className="cm__img" src="data:image/jpeg;base64,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" alt="" />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor corporis repellat aliquam. Nostrum soluta aperiam accusamus ea rem ut nesciunt eaque perspiciatis porro debitis consectetur maxime quam ducimus error modi facere, quasi odit aspernatur sit ab fugit quisquam sapiente necessitatibus?           
            </div>


            <div className="chat__message theme__bg cm__info">
                awdawdawdaw adwwwwwwwwwwwwwwww  awdaw awdawd awd awdawdawdawd
            </div> */}






        </div>
    )
}

export default ChatContent
