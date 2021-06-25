import React,{useState,useEffect,useContext} from 'react'
import './ChatList.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SearchIcon from '@material-ui/icons/Search';
import ChatItem from '../chatitem/ChatItem';
import uuid from 'react-uuid'
import {db,auth} from "../../firebase"
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
                   else if(ele.data.type==='personal' && umailExtractor(ele.data.membersMail[0]).includes(searchInp) && ele.data.membersMail[0]!==user0.umail) return true
                   else if(ele.data.type==='personal' && umailExtractor(ele.data.membersMail[1]).includes(searchInp) && ele.data.membersMail[1]!==user0.umail) return true
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
       
        // db.collection('chats').doc('e6eaf1-017a-5c62-26f6-28f2c01aa4b2').set({
        //     messages:firebase.firestore.FieldValue.arrayUnion(
        //         {   mid:uuid(),
        //             uid:'7Kdecovwk1NKUuIXEXzUuo1UngC3',
        //             img:'data:image/jpeg;base64,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',
        //             from:'vineethpawar99',
        //             content:'How are you guys..eeeeeeeeeeee e e ee sab',
        //             timePosted:`${new Date()}`,
        //             type:'common'
        //         }
        //     )
        //     },{merge:true})

  //  db.collection('users').doc('nuVKNQLZN1ROgl155Uv9uv80fr23').set({
    //    friends:['0']
    //    },{merge:true})



//    db.collection('users').doc('nuVKNQLZN1ROgl155Uv9uv80fr23').set({
//        friends:firebase.firestore.FieldValue.arrayUnion('7Kdecovwk1NKUuIXEXzUuo1UngC3')
//        },{merge:true})

//    db.collection('users').doc('7Kdecovwk1NKUuIXEXzUuo1UngC3').set({
//        friends:firebase.firestore.FieldValue.arrayUnion('nuVKNQLZN1ROgl155Uv9uv80fr23')
//        },{merge:true})


    firebase.auth().onAuthStateChanged((user0)=>{
        if(user0){
           db.collection('users').doc(user0.uid).get()
           .then((userDet)=>{
               setUser0(userDet.data());
                return userDet.data();
           }).then((user)=>{
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
                    <span title="Status">
                        <DonutLargeIcon className="chat__icon"/>
                    </span>
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
   