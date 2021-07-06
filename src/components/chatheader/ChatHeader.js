import React,{useState,useEffect,useContext} from 'react'
import './ChatHeader.css'
import {db} from '../../firebase'
import {UpdateMobileView} from '../../App'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const umailExtractor = (umail)=>{
    return umail.slice(0,umail.lastIndexOf('@'))
}


function ChatHeader({rightScreenChat,updateChatDetailsVisibility}) {
    const [screenWidth,setScreenWidth]=useState(0);
    const updateMobileView = useContext(UpdateMobileView);
    useEffect(()=>{
        setScreenWidth(document.body.clientWidth);
        window.addEventListener("resize", (event)=> {
          setScreenWidth(document.body.clientWidth);
        })

        if(rightScreenChat[1]==='group'){
        db.collection('chats').doc(rightScreenChat[0]).get()
        .then((snapshot)=>{
          
            setChatHeader({
                dp:snapshot.data().dp,
                chatName:snapshot.data().chatname,
                description:snapshot.data().description
            })
           
        })
    }
    else {
        db.collection('users').doc(rightScreenChat[0]).get()
        .then((snapshot)=>{
          
            setChatHeader({
                dp:snapshot.data().dp,
                name:snapshot.data().uname,
                umail:snapshot.data().umail,
                status:snapshot.data().status
            })
           
        })
    }  
    },[rightScreenChat])



    const [chatHeader,setChatHeader]=useState({
        dp:'https://res.cloudinary.com/dpjkblzgf/image/upload/v1624507908/mess_zq9mov.png',
        chatName:'Loading...',
        name:'Loading...',
        description:''
    });

    return (

      <div className="theme__green__bg chat__header theme__font" onClick={()=>updateChatDetailsVisibility(true)} style={{position:'relative'}}>

          {rightScreenChat[1]==='personal' ?
          <div className="chat__user__details__wrapper">
              { screenWidth <600 &&
                        <span onClick={()=>{updateMobileView(true);}}>
                        <ArrowBackIcon className="arch__back__icon" />
                        </span>
              }
             <img src={chatHeader.dp} alt="" className="ch__user__img" />
             <div className="chat__user__details">
                 <h4 className="theme__h4">{chatHeader.name}<span className="theme__uname">  {(chatHeader.umail) ? `@${umailExtractor(chatHeader.umail)}`  : ''}</span> </h4>
                 <h5 className="theme__h5 theme__subfont">{chatHeader.status}</h5>
             </div>
          </div>
          :
          <div className="chat__user__details__wrapper">
               { screenWidth <600 &&
                        <span  onClick={()=>{updateMobileView(true);}}>
                        <ArrowBackIcon className="arch__back__icon" />
                        </span>
                 }
             <img src={chatHeader.dp} alt="" className="ch__user__img" />
             <div className="chat__user__details">
                 <h4 className="theme__h4">{chatHeader.chatName} <span className="theme__uname"></span> </h4>
                 <h5 className="theme__h5 theme__subfont">{chatHeader.description}</h5>
             </div>
          </div>
          }
       </div>

    )
}

export default ChatHeader
