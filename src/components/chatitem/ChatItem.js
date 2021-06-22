import React,{useState,useEffect} from 'react'
import './ChatItem.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BlockIcon from '@material-ui/icons/Block';
import ArchiveIcon from '@material-ui/icons/Archive';
import GroupIcon from '@material-ui/icons/Group';
import { db } from '../../firebase';
import {format,isToday,isThisWeek,isYesterday} from 'date-fns'
import firebase from 'firebase'


const umailExtractor = (umail)=>{
    return umail.slice(0,umail.lastIndexOf('@'))
}


function ChatItem({uid,umail,chatid,chatname,dp,type,members,description,memebersMail,lastTexted,archieved=false,blocked=false}) {
   

    const  getLastTextTime = (timestamp)=>{
        if(isToday(new Date(timestamp))) return format(new Date(timestamp), ' hh:mm aaa')
        else if(isYesterday(new Date(timestamp))) return 'yesterday'
        else if(isThisWeek(new Date(timestamp))) return format(new Date(timestamp), 'eeee')
        else  return format(new Date(timestamp), ' dd/MM/yyyy')
    }


    const exitGroup = () =>{
        console.log(uid,umail,chatid);
        db.collection('chats').doc(chatid).update({
            members:firebase.firestore.FieldValue.arrayRemove(uid),
            membersMail:firebase.firestore.FieldValue.arrayRemove(umail)
        })
    }
    const archieveItemHandler=()=>{

        setDisplay(false);

        if(archieved){
                db.collection('users').doc(uid).update({
                    archieved:firebase.firestore.FieldValue.arrayRemove(chatid)
                })
        } else {
            db.collection('users').doc(uid).update({
                archieved:firebase.firestore.FieldValue.arrayUnion(chatid)
            })
        }
    }


    const blockItemHandler = () =>{
        setDisplay(false);

        if(blocked){
                db.collection('users').doc(uid).update({
                    blocked:firebase.firestore.FieldValue.arrayRemove(chatid)
                })
        } else {
            db.collection('users').doc(uid).update({
                blocked:firebase.firestore.FieldValue.arrayUnion(chatid)
            })
            
        }
    }

    const [display,setDisplay]=useState(true);
    const [options,setOptions]=useState(false);
    const [user1,setUser1] = useState({
               dp:'data:image/png;base64,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'
    });


    useEffect(()=>{

        
  


        if(type==="personal"){
            if(members[0]===uid){
                db.collection('users').doc(members[1]).get()
                .then((usr)=>{
                    setUser1(usr.data())
                })
               
            }
            else if(members[1]===uid){
                db.collection('users').doc(members[0]).get()
                .then((usr)=>{
                    setUser1(usr.data())
                }) 
            }
        }
    },[]) 

    return (
    <div style={ display ? {display:'block'} : {display:'none'}}>

        {type==='personal' ? 
                <div  className={ false ? "chat__item chat__item__selected":"chat__item"} >
                    <img src={user1.dp} 
                    className="chat__dp" alt="" />
                    <div className="chat__details">
                        <h2 style={{display:'inline-flex',marginRight:'5px'}} className="theme__h4">{user1.uname}  </h2>
                        <h4 style={{display:'inline-flex'}} className="theme__h5 theme__subfont chat__subtext">
                            {user1.umail ? `@${umailExtractor(user1.umail)}` : 'Loading ...'}
                        </h4> 
                        <h4 className="theme__h5 theme__subfont chat__subtext">
                            {user1.status}
                        </h4>
                    </div>
                    
                    <div className="chat__item__options" >
                    <div className="time">{getLastTextTime(lastTexted)}</div>

                    <span className="chat__options__icons">
                    {archieved &&   
                        <span title="Archieved chat">
                        <ArchiveIcon  className="pin__icon"/> 
                        </span>
                    }

                    {blocked &&   
                        <span title="Blocked chat">
                        <BlockIcon  className="block__icon"/> 
                        </span>
                    }

                    <span  onClick={()=>{options ? setOptions(false) : setOptions(true)}}>
                        <ExpandMoreIcon className="expand__icon"/>
                    </span>

                    { options &&
                        <div className="options theme__green__bg" onClick={()=>setOptions(!options)}>
                         {!blocked &&   
                            <div onClick={archieveItemHandler} className="option__item">{archieved ? 'Unarchieve chat':'Archieve chat'}</div>
                         }
                            <div onClick={blockItemHandler} className="option__item">{blocked ? 'Unblock chat' : 'Block chat'}</div>

                                
                            {/* <div className="option__item">Exit group</div> */}
                                
                        </div>
                    }  
                        </span>
                    </div>

                </div>

      :


           <div className={ false ? "chat__item chat__item__selected":"chat__item"} >
           <img src={dp} 
           className="chat__dp" alt="" />
           <div className="chat__details">
               <div style={{display:'flex',alignItems:'center'}} className="">
               <h2  style={{marginRight:'10px'}} className="theme__h4">{chatname}</h2>
               <h4 style={{display:'inline-flex',alignItems:'center',whiteSpace:'nowrap'}} className="theme__h5 theme__subfont chat__subtext">
                           <GroupIcon style={{marginRight:'5px'}}/>{members.length}
                </h4> 
                </div>
               <h4 className="theme__h5 theme__subfont chat__subtext">{description}</h4>
           </div>
           
           <div className="chat__item__options" >
           <div className="time">{getLastTextTime(lastTexted)}</div>

           <span className="chat__options__icons">
           {archieved &&   
               <span title="Archieved chat">
               <ArchiveIcon  className="pin__icon"/> 
               </span>
           }

           {blocked &&   
               <span title="Blocked chat">
               <BlockIcon  className="block__icon"/> 
               </span>
           }

           <span  onClick={()=>{options ? setOptions(false) : setOptions(true)}}>
               <ExpandMoreIcon className="expand__icon"/>
           </span>

           { options &&
               <div className="options theme__green__bg" onClick={()=>setOptions(!options)}> 
                      {!blocked &&   
                          <div onClick={archieveItemHandler} className="option__item">{archieved ? 'Unarchieve chat':'Archieve chat'}</div>
                         }
                <div onClick={blockItemHandler}  className="option__item">{blocked ? 'Unblock chat' : 'Block chat'}</div>

                {!blocked &&   
                   <div onClick={()=>exitGroup()} className="option__item">Exit group</div>
                }

               </div>
           }  
               </span>
           </div>

       </div>

    }    
           

    </div>
    )
}

export default ChatItem
