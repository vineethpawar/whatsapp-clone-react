import React,{useState,useEffect,useContext} from 'react'


import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {db} from '../../firebase'
import uuid from 'react-uuid'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../App';
import firebase from 'firebase'

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import UserItem from './../useritem/UserItem';
import  SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';

const umailExtractor = (umail)=>{
    return umail.slice(0,umail.lastIndexOf('@'))
}



function UpdateGroupChat({chatid,updateGroup}) {
    
 const updateAuth = useContext(AuthContext);


 const filterFun=(searchInp)=>{
    if(searchInp.length) {
        setFilteredUsers(users.filter((ele)=>
        {   
        if(umailExtractor(ele.data.umail).toLowerCase().includes(searchInp.toLowerCase()) && !addedContactsMail.includes(ele.data.umail)) return true
        else return false
        })
     )
   }
 }

const [searchName,setSearchName] = useState('');
const [users,setUsers]=useState([]);
const [filteredUsers,setFilteredUsers]=useState([]);
const [addedContactsMail,setAddedContactsMail]=useState([])
const [addedContacts,setAddedContacts]=useState([])
const [addedContactsUid,setAddedContactsUid]=useState([])

const [user2,setUser2]=useState({});

useEffect(()=>{


    firebase.auth().onAuthStateChanged((usera)=>{
        if(usera){
           db.collection('users').doc(usera.uid).get()
           .then((userDet)=>{
               setUser2(userDet.data());

               db.collection('users').where('uid','!=',userDet.data().uid).limit(10).onSnapshot((snapshot)=>{

                setUsers(snapshot.docs.map(doc=>(
                    {
                        id:doc.id,
                        data:doc.data()
                    }
                )))
     
            });

           })
           
        } else{
         updateAuth(false);
        }
    })

    db.collection('chats').doc(chatid).get()
    .then((chat)=>{
        setAddedContactsUid(chat.data().members)
        setAddedContactsMail(chat.data().membersMail)

    })




    },[]);



const createGroupHandler =()=>{


     if(!addedContacts.length)  {
        toast.error('Add atleast 1 contact', {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            });
            return;
          } 

      
    db.collection('chats').doc(chatid).set({
        chatid:chatid,
  
        lastTexted:`${new Date()}`,
        members:[...addedContactsUid],
        membersMail:[...addedContactsMail],
        messages:firebase.firestore.FieldValue.arrayUnion({
            content:`${umailExtractor(user2.umail)} added ${addedContacts.length} member(s)`,
            type:'info',
            timePosted:`${new Date()}`,
            mid:uuid()
        }),
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
    
    },{merge:true}).then(()=>{
        updateGroup(false)
    })
    
    toast.dark('Group updated', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        });
       
  
}




    return (
        <div className="user__profile theme__bg theme__font">
           <div className="profile__header sticky__top theme__green__bg">
               <span 
               onClick={()=>updateGroup(false)}
               >
                   
                <ArrowBackIcon className="profile__back"/> 
                </span>
                <h2 className="theme__h2"> Add people to Group </h2>
           </div>

           <div className="profile__content">
          


                {addedContacts.length > 0 &&
                <div className="contact_add_list">
                    {addedContacts.map((ele)=>
                        <div key={ele.uid} className="contact_add_item"><p>{umailExtractor(ele.umail)}</p> <CancelIcon onClick={()=>{setAddedContacts([...addedContacts.filter((e)=>e !== ele)]);setAddedContactsMail([...addedContactsMail.filter((e)=>e !== ele.umail)]);setAddedContactsUid([...addedContactsUid.filter((e)=>e !== ele.uid)]);setSearchName('');}} className="cancel_icn" /></div>
                    )}
                     
                </div>
                }

                <div style={{marginTop:'20px'}} className="search__container theme__search theme__input__bg">
                  <SearchIcon className="search__icon" /> 
                  <input spellCheck="false" className="search__inp theme__font" type="text" value={searchName} onChange={(e)=>{setSearchName(e.target.value);filterFun(e.target.value)}} placeholder="Add contacts" />
              </div>

            
              
              <div className="chat__container">

                
              { searchName.length >0 &&
                  
                  filteredUsers.map(({id,data:{uid,uname,umail,dp,status}})=>
                      <div key={id} onClick={()=>{ setAddedContacts([...addedContacts,{uid:uid,umail:umail}]);setAddedContactsMail([...addedContactsMail,umail]);setAddedContactsUid([...addedContactsUid,uid]);setSearchName('');}} >
                          <UserItem uname={uname} umail={umail} dp={dp} status={status} />
                      </div>
                      )
              }     
                      
                 <button className="create_group_btn" onClick={()=>{createGroupHandler()}}><ArrowForwardIcon className="arr_icon"/></button>
                 
                
              </div>
          
        


           </div>

           
        </div>
    )
}

export default UpdateGroupChat
