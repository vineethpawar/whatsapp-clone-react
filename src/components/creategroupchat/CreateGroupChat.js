import React,{useState,useEffect,useContext} from 'react'
import Axios from 'axios'
import './CreateGroupChat.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {db} from '../../firebase'
import uuid from 'react-uuid'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../App';
import firebase from 'firebase'
import EditIcon from '@material-ui/icons/Edit';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import UserItem from './../useritem/UserItem';
import  SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import  {CLOUD_NAME,UPLOAD_PRESET} from '../../cloudinary'


const umailExtractor = (umail)=>{
    return umail.slice(0,umail.lastIndexOf('@'))
}



function CreateGroupChat({change}) {
    
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
const [groupName,setGroupName]=useState('');
const [description,setDescription]=useState('');
const [groupImage,setGroupImage]=useState('https://res.cloudinary.com/dpjkblzgf/image/upload/v1623514492/Frame_2_rsaqpn.png')
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




    },[]);



const createGroupHandler =()=>{
    if(!groupName.trim().length){
        toast.error('Enter Group Name', {
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

    let dok = uuid();     
    db.collection('chats').doc(dok).set({
        chatid:dok,
        chatname:groupName.trim(),
        description:description.trim(),
        dp:groupImage,
        lastTexted:`${new Date()}`,
        members:[...addedContactsUid,user2.uid],
        membersMail:[...addedContactsMail,user2.umail],
        messages:[{
            content:`${umailExtractor(user2.umail)} created this group with ${addedContactsUid.length} other(s)`,
            type:'info',
            timePosted:`${new Date()}`,
            mid:uuid()
        }],
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        type:'group'
    },{merge:true})      
       
      change('chatlist');
}



const uploadImage=(files)=>{
    
    if((files[0])&&(files[0].type).includes('image')){

        if(files[0].size<1100000){

        toast.dark('Uploading image', {
            position: "bottom-left",
            autoClose: 4300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            });
        
        const formData = new FormData()
        formData.append("file",files[0])
        formData.append("upload_preset",UPLOAD_PRESET)

        Axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,formData)
        .then((response)=>{
            setGroupImage(response.data.secure_url);
        }) 
        
    } else {
        toast.error('Keep image size below 1Mb', {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            });
    } 


 } else{
     if(files[0]){
    toast.error('Not an image', {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        });
  } 
 }
}

    return (
        <div className="user__profile theme__bg theme__font">
           <div className="profile__header sticky__top theme__green__bg">
               <span onClick={()=>change('chatlist')}>
                   
                <ArrowBackIcon className="profile__back"/> 
                </span>
                <h2 className="theme__h2"> Create Group </h2>
           </div>

           <div className="profile__content">
                 <div className="profile__image">
                      <img src={groupImage} alt="" />
                      <input id="uploadId" type="file" onChange={(event)=>uploadImage(event.target.files)}/>
                      <ToastContainer
                            position="bottom-left"
                            autoClose={2500}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick={true}
                            rtl={false}
                            pauseOnFocusLoss={false}
                            draggable={false}
                            pauseOnHover={false}
                            />
                     
                    <label htmlFor="uploadId">   
                      <h3 className="chpic theme__h3" ><CameraAltIcon className="cam__icon" /> Add Photo</h3> 
                    </label>
                 </div>

                <h3 className="theme__h3 edit__head">Group Name  <label htmlFor="name"> <EditIcon className="edit__pen"/></label> </h3>  
               
               

                <div className="inp__name">
                    <input id="name" spellCheck="false" className=" theme__font " type="text" value={groupName} onChange={(e)=>setGroupName(e.target.value)}/>
                    
                  
                    
               
                </div>
               
                <h3 className="about__prof theme__h3 edit__head">Description  <label htmlFor="about"> <EditIcon className="edit__pen"/></label></h3>
                <div className="inp__status">

                    <input id="about" maxLength="50" placeholder="( optional )" spellCheck="false" className="status__inp  theme__font " type="text" value={description}  onChange={(e)=>setDescription(e.target.value)}/>
                    
                </div>
                <h3 className="theme__h3 noc">{50-description.length}</h3>


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

export default CreateGroupChat
