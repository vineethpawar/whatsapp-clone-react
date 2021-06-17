import React,{useEffect,useState,useContext} from 'react'
import './Auth.css'
import {db,auth} from '../../firebase'
import firebase from 'firebase'
import {AuthContext} from '../../App'


function Auth({isLoading}) {

   const updateAuth = useContext(AuthContext);
  

       const signin = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
           
            db.collection('users').doc(user.uid).get()
            .then((res)=>{
                if(res.exists){

                    console.log('Old User');
                    updateAuth(true);
                }
                else{
                    console.log('New User');
                     db.collection('users').doc(user.uid).set({
                        uid:user.uid, 
                        uname:user.displayName,
                        umail:user.email,
                        dp:user.photoURL,
                        status:"Hey there! I am using Whatsapp",
                        archieved:[],
                        blocked:[],
         
                     },{merge:true});
                     updateAuth(true);
                }
            })
            
            
 
        })
        .catch((error) => {
            console.log(error);
        });
    }


    return (
        <div className="auth theme__bg">
            <div className="wave"></div>
   <img className="w__logo" src="https://i.pinimg.com/originals/91/9d/f0/919df067a8fbd22ce7b6f401b7688b35.png" alt="" />
               {/* <span className="center text_white">
               Made by:
              <a href="#" className="name">Vineeth Pawar</a>   
              </span>  */}
            {isLoading ?  
              <img src="https://thumbs.gfycat.com/WhirlwindQuarterlyAustraliansilkyterrier-size_restricted.gif" className="preloader" alt="" />
                :
            <button className="join__btn" onClick={()=>{signin()}}>Sign in 
            <img className="google__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png" alt="" />
            </button>
            }
        </div>
    )
}

export default Auth
