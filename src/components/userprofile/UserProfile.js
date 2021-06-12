import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import './UserProfile.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DoneIcon from '@material-ui/icons/Done';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {db} from '../../firebase'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function UserProfile({change}) {
const [username,setUsername]=useState('');
const [status,setStatus]=useState('');


const [user,setUser]=useState({
    username:'',
    status:'',
    dp:'data:image/png;base64,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'

});

useEffect(()=>{
   db.collection('users').doc('vineeth').get()
   .then((res)=> {
        setUser(res.data());
        setUsername(res.data().username);
        setStatus(res.data().status);
        
   });
  
},[]);


const uploadImage=(files)=>{
    
    if((files[0])&&(files[0].type).includes('image')){

        if(files[0].size<1100000){

        toast.dark('Uploading image', {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            });
        
        const formData = new FormData()
        formData.append("file",files[0])
        formData.append("upload_preset","xy4zdrfi")

        Axios.post("https://api.cloudinary.com/v1_1/dpjkblzgf/image/upload",formData)
        .then((response)=>{
            setUser({...user,dp:response.data.secure_url});
            db.collection('users').doc('vineeth').set({
                dp:response.data.secure_url
            },{merge:true});
        }) 
        
    } else {
        toast.error('Keep image size below 1Mb', {
            position: "bottom-left",
            autoClose: 5000,
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
        autoClose: 5000,
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
           <div className="profile__header theme__green__bg">
               <span onClick={()=>change('chatlist')}>
                   
                <ArrowBackIcon className="profile__back"/> 
                </span>
                <h2 className="theme__h2"> Profile </h2>
           </div>

           <div className="profile__content">
                 <div className="profile__image">
                      <img src={user.dp} alt="" />
                      <input id="uploadId" type="file" onChange={(event)=>uploadImage(event.target.files)}/>
                      <ToastContainer
                            position="bottom-left"
                            autoClose={2500}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss={false}
                            draggable={false}
                            pauseOnHover={false}
                            />
                     
                    <label htmlFor="uploadId">   
                      <h3 className="chpic theme__h3" ><CameraAltIcon className="cam__icon" /> Change Photo</h3> 
                    </label>
                 </div>

                <h3 className="theme__h3">Your Name</h3>  

                <div className="inp__name">
                    <input spellCheck="false" className=" theme__font " type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    
                    {username.trim()!==user.username && username.length >=3 &&
                       
                       <div className="inp__tick " onClick={()=>
                        {setUser({...user,username:username});
                         db.collection('users').doc('vineeth').set({
                            ...user,
                            username:username
                         },{merge:true});  
                         }  
                        }>
                             <DoneIcon/>
                        </div>
                    }
                    
               
                </div>
               
                <h3 className="about__prof theme__h3">About</h3>
                <div className="inp__status">

                    <textarea maxLength="50" rows="1" spellCheck="false" className="status__inp  theme__font " type="text" value={status} onChange={(e)=>setStatus(e.target.value)}/>
                    
                    {status.trim()!==user.status  &&
                        <div  className="inp__tick " onClick={()=>
                            {setUser({...user,status:status});
                             db.collection('users').doc('vineeth').set({
                                ...user,
                                status:status
                             },{merge:true});  
                             }  
                            }>
                             <DoneIcon/>
                        </div>
                    }

                   
                    
               
                </div>
                <h3 className="theme__h3 noc">{50-status.length}</h3>

           </div>
        </div>
    )
}

export default UserProfile
