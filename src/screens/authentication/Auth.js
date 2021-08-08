import React,{useEffect,useState,useContext} from 'react'
import './Auth.css'
import {db} from '../../firebase'
import firebase from 'firebase'
import {AuthContext} from '../../App'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auth({isLoading,updateLoader}) {

   const updateAuth = useContext(AuthContext);

    const [userCount,setUserCount] = useState([]) ;

       const signin = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */

            var user = result.user;
           
            db.collection('users').doc(user.uid).get()
            .then((res)=>{
                if(res.exists){
                    updateAuth(true);
                }
                else{
                    updateLoader(true);

                    toast.dark('Setting up account', {
                        position: "top-left",
                        autoClose: 3300,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        });  
                        
                     db.collection('users').doc(user.uid).set({
                     
                        uid:user.uid, 
                        uname:user.displayName,
                        umail:user.email,
                        dp:user.photoURL,
                        status:"Hey there! I am using Whatsapp",
                        friends:[],
                        archieved:[0],
                        blocked:[0],
                        theme:'dark',
         
                     },{merge:true})
                     .then(()=>{
                        updateAuth(true);
                     });
                     

                     

                  
     
                }
            })

        })
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(()=>{
        
        db.collection('users').get()
        .then((snapshot)=>{

            setUserCount(snapshot.docs.map(doc=>(
                {
                    id:doc.id,
                    data:doc.data(),
                  
                }
              
            )))

       })
    },[])

    return (
        <div className="auth theme__bg">
              <ToastContainer
                            position="top-left"
                            autoClose={3300}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss={false}
                            draggable={false}
                            pauseOnHover={false}
                            />

            <div className="wave"></div>
                <img className="w__logo" src="https://res.cloudinary.com/dpjkblzgf/image/upload/v1625326357/icon1_ggxci6.png" alt="" />
                    {/* <span className="center text_white">
                        Made by:
                         <a href="#" className="name">Vineeth Pawar</a>   
                         </span>  
                     */}
            <h1 className="theme__h3 font__large"><PermIdentityIcon className="usrcount__icon" /> {!userCount.length ? '--' : userCount.length } </h1>

            {isLoading ?  
              <img src="https://thumbs.gfycat.com/WhirlwindQuarterlyAustraliansilkyterrier-size_restricted.gif" className="preloader" alt="" />
                :
                <div className="btn__container">
                    <button className="join__btn" onClick={()=>{signin()}}>Sign in 
                    <img className="google__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png" alt="" />
                    </button>
            </div>
            }
        </div>
    )
}

export default Auth
