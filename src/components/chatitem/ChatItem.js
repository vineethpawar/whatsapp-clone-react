import React,{useState,useEffect} from 'react'
import './ChatItem.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BlockIcon from '@material-ui/icons/Block';
import ArchiveIcon from '@material-ui/icons/Archive';
import { db } from '../../firebase';


function ChatItem({uid,chatid,chatname,dp,type,members,description}) {

    const [options,setOptions]=useState(false);
    const [user,setUser] = useState({});
    useEffect(()=>{
        if(type=="personal"){
            if(members[0]==uid){
                db.collection('users').doc(members[1]).get()
                .then((usr)=>{
                    setUser(usr.data())
                    console.log(usr.data())
                })
            }
            else {
                db.collection('users').doc(members[0]).get()
                .then((usr)=>{
                    setUser(usr.data())
                    console.log(usr.data())
                }) 
            }
        }
    },[]) 

    return (
    <div>

        {type=='personal' ? 
                <div className={ false ? "chat__item chat__item__selected":"chat__item"} >
                    <img src={user.dp} 
                    className="chat__dp" alt="" />
                    <div className="chat__details">
                        <h2 className="theme__h4">{user.uname}</h2>
                        <h4 className="theme__h5 theme__subfont chat__subtext">
                            {user.status}
                        </h4>
                    </div>
                    
                    <div className="chat__item__options" >
                    <div className="time">2:02 am</div>

                    <span className="chat__options__icons">
                    {true &&   
                        <span title="Archieved chat">
                        <ArchiveIcon  className="pin__icon"/> 
                        </span>
                    }

                    {true &&   
                        <span title="Blocked chat">
                        <BlockIcon  className="block__icon"/> 
                        </span>
                    }

                    <span  onClick={()=>{options ? setOptions(false) : setOptions(true)}}>
                        <ExpandMoreIcon className="expand__icon"/>
                    </span>

                    { options &&
                        <div className="options theme__green__bg" onClick={()=>setOptions(!options)}>
                            <div className="option__item">Archieve chat</div>
                            <div className="option__item">Block chat</div>

                                
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
               <h2 className="theme__h4">{chatname}</h2>
               <h4 className="theme__h5 theme__subfont chat__subtext">{description}</h4>
           </div>
           
           <div className="chat__item__options" >
           <div className="time">2:02 am</div>

           <span className="chat__options__icons">
           {true &&   
               <span title="Archieved chat">
               <ArchiveIcon  className="pin__icon"/> 
               </span>
           }

           {true &&   
               <span title="Blocked chat">
               <BlockIcon  className="block__icon"/> 
               </span>
           }

           <span  onClick={()=>{options ? setOptions(false) : setOptions(true)}}>
               <ExpandMoreIcon className="expand__icon"/>
           </span>

           { options &&
               <div className="options theme__green__bg" onClick={()=>setOptions(!options)}>
                   <div className="option__item">Archieve chat</div>
                   <div className="option__item">Block chat</div>  
                   <div className="option__item">Exit group</div>
                       
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
