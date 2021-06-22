import React,{useEffect,useState,createContext} from 'react'
import uuid from 'react-uuid'
import './App.css';
import LeftScreen from './screens/leftscreen/LeftScreen';
import RightScreen from './screens/rightscreen/RightScreen';
import firebase from 'firebase'
import {db,auth} from './firebase'
import Auth from './screens/authentication/Auth';
import {format,isToday,isThisWeek,isYesterday} from 'date-fns'

export const AuthContext = createContext();




function App() {


  const  getTimeOnly = (timestamp) =>{
      return format(new Date(timestamp), ' hh:mm aaa')
  }


  const  getDateOnly = (timestamp) =>{
    if(isToday(new Date(timestamp))) return 'today'
    else if(isYesterday(new Date(timestamp))) return 'yesterday'
    else if(isThisWeek(new Date(timestamp))) return format(new Date(timestamp), 'eeee')
    else  return format(new Date(timestamp), ' dd/MM/yyyy')
  }

  
  const  getLastTextTime = (timestamp)=>{
      if(isToday(new Date(timestamp))) return format(new Date(timestamp), ' hh:mm aaa')
      else if(isYesterday(new Date(timestamp))) return 'yesterday'
      else if(isThisWeek(new Date(timestamp))) return format(new Date(timestamp), 'eeee')
      else  return format(new Date(timestamp), ' dd/MM/yyyy')
  }

  
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [isLoading,setIsLoading]=useState(true);

  const updateLoader = (option) =>{
    setIsLoading(option)
  }

  const updateAuth = (status) =>{
    setIsLoggedIn(status);
  }
  
  useEffect(()=>{


    // console.log(`uuid : ${uuid()}`)
    // console.log('time is ',getLastTextTime('Thu Jun 20 2021 22:28:41 GMT+0530 (India Standard Time)'));
 
    // db.collection('dates').doc('2').set({
    //     date:`${new Date()}`
    // })
   

    // db.collection('dates').doc('2').get()
    // .then((date)=>console.log(date.data().date))

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
          updateAuth(true);
          console.log('signed in');
         
      } else{
        updateAuth(false);
        updateLoader(false);
        console.log('Not signed in');
      }
  })
  },[]) 
  //isLoggedIn
  
    // db.collection('chats').doc('chat3').set({
    //   chatid:1113,
    //   description:'3 hai',
    //   groupdp:'data:image/jpeg;base64,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',
    //   groupname:'yoyo bro mereko gang',
    //   messages:[],
    //   type:'group',
    //   members:['raju','mayank'],
    //   timestamp:firebase.firestore.FieldValue.serverTimestamp()
    // });
  

  


  return (

    <AuthContext.Provider value={updateAuth} >
    <div className="app" >

      {isLoggedIn ?

        <div className="screen">
            <div className="app__left">
                <LeftScreen />
            </div>

            <div className="app__right" >
                <RightScreen />
            </div>
        </div>
      
          :

          <Auth isLoading = {isLoading} />

        
      }
  </div>
</AuthContext.Provider>

  
  );
}

export default App;
export const UserContext = createContext()