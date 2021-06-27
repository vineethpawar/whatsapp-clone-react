import React,{useState,useEffect,useContext} from 'react'
import './ChatList.css'
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SearchIcon from '@material-ui/icons/Search';
import ChatItem from '../chatitem/ChatItem';
import {db} from "../../firebase"
import { AuthContext } from '../../App';
import firebase from 'firebase'
import {ResetRightScreen} from '../../App'


const umailExtractor = (umail)=>{
    return umail.slice(0,umail.lastIndexOf('@'))
}

function ChatList({change}) {
    const resetRightScreenChat = useContext(ResetRightScreen);
    const [selectedChat,setSelectedChat]=useState('0')
    const changeSelectedChat=(chat)=>{
        setSelectedChat(chat);
    }


    const updateAuth = useContext(AuthContext);

    const signout = () =>{
        resetRightScreenChat();
        firebase.auth().signOut().then(()=>{
            updateAuth(false)
        })
    }

 
   

    const filterFun=(arr,searchInp)=>{

        if(searchInp.length) {
        setFilteredChats(arr.filter((ele)=>
               {   
                   if(ele.data.chatname.toLowerCase().includes(searchInp.toLowerCase())) return true 
                   else if(ele.data.type==='personal' && umailExtractor(ele.data.membersMail[0]).toLowerCase().includes(searchInp.toLowerCase()) && ele.data.membersMail[0]!==user0.umail) return true
                   else if(ele.data.type==='personal' && umailExtractor(ele.data.membersMail[1]).toLowerCase().includes(searchInp.toLowerCase()) && ele.data.membersMail[1]!==user0.umail) return true
                   else return false
             })
     
         )
       }
     }


   const [searchName,setSearchName] = useState('');
  
    
   const [chats,setChats]=useState([]);
   const [filteredChats,setFilteredChats]=useState([]);
  
   const [user0,setUser0]=useState({
       dp:'data:image/png;base64,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'
   });

   const [menuOptions,setMenuOptions]=useState(false);
   const [newChatOptions,setNewChatOptions]=useState(false);
   
   useEffect(()=>{
      
    firebase.auth().onAuthStateChanged((user0)=>{
        if(user0.uid){
           db.collection('users').doc(user0.uid).get()
           .then((userDet)=>{
               setUser0(userDet.data());
                return userDet.data();
           }).then((user)=>{
               if(user!==undefined){
            db.collection('chats').where('members','array-contains',user.uid).orderBy('timestamp','desc').onSnapshot((snapshot)=>{

                setChats(snapshot.docs.map(doc=>(
                    {
                        id:doc.id,
                        data:doc.data(),
                        userid:user.uid,
                        usermail:user.umail,
                        userArchieved: user.archieved,
                        userBlocked:user.blocked
                    }
                  
                  )))
                })

            }

             });
        
           } else {
            updateAuth(false);
           }
    })


   },[]);
   
    return (
        <div className="chat__list theme__bg theme__font">
          
         
           <div className="sticky__top theme__bg">  

             
        
            <div className="chatlist__header theme__green__bg archieved__header">
               
                <img onClick={()=>change('userprofile')} className="user__img" src={user0.dp} alt="" />  
               
                <div className="chat__icons">
                   
                    <span title="New chat" className="menu__span" onClick={()=>{newChatOptions?setNewChatOptions(false):setNewChatOptions(true)}}>
                        <AddIcon className="chat__icon"/>
                        {newChatOptions && 
                        <div className="menu__options theme__green__bg">
                            <div onClick={()=>change('createuserchat')} className="menu__option__item">Add new contact</div>
                            <div onClick={()=>change('creategroupchat')} className="menu__option__item">Create group</div>
                        </div>
                        }
                    </span>

                    <span title="Menu" className="menu__span" onClick={()=>{menuOptions?setMenuOptions(false):setMenuOptions(true)}}>
                        <MoreHorizIcon className="chat__icon"/>

                        {menuOptions && 
                        <div className="menu__options theme__green__bg" >
                            <div onClick={()=>change('userprofile')} className="menu__option__item">User Profile</div>
                            <div onClick={()=>change('archieved')} className="menu__option__item">Archived</div>
                            <div onClick={()=>change('blocked')} className="menu__option__item">Blocked</div>
                            <div onClick={()=>signout()} className="menu__option__item">Logout</div>
                        </div>
                        }
                    </span>
                </div>
         
            </div>

           
        
          
     
        




            <div className="search__container theme__search theme__green__bg">
                   <SearchIcon className="search__icon" /> 
                   <input spellCheck="false" className="search__inp theme__font" type="text" value={searchName} onChange={(e)=>{setSearchName(e.target.value);filterFun(chats,e.target.value)}} placeholder="Search a chat by group name or user unique id" />
            </div>
         </div>
        


              <div className="chatlist__container">
               
                 <div className="chat__container">

                   
                   {!searchName.length ?
                     chats.map(({id,userid,usermail,userArchieved,userBlocked,data:{chatid,chatname,dp,type,members,membersMail,description,lastTexted}})=>
                     <div key={id} >
                        {!userArchieved.includes(chatid) && !userBlocked.includes(chatid) &&
                         <ChatItem changeSelectedChat={changeSelectedChat} selectedChat={selectedChat} uid={userid} umail={usermail} chatid={chatid} chatname={chatname} dp={dp} type={type} members={members} description={description} membersMail={membersMail} lastTexted={lastTexted}/>
                        }
                     </div>
                     )  :
                     
                     filteredChats.map(({id,userid,usermail,userArchieved,userBlocked,data:{chatid,chatname,dp,type,members,membersMail,description,lastTexted}})=>
                     <div  key={id} >
                        {!userArchieved.includes(chatid) && !userBlocked.includes(chatid) &&
                         <ChatItem changeSelectedChat={changeSelectedChat} selectedChat={selectedChat} uid={userid} umail={usermail} chatid={chatid} chatname={chatname} dp={dp} type={type} members={members} description={description} membersMail={membersMail} lastTexted={lastTexted} />
                        }
                     </div>
                    )
                        
                    }    
                    
                    
                   
                 </div>
             
            </div>






             

        </div>
    )
}

export default ChatList
   