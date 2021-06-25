import React,{useEffect,useState,createContext} from 'react'
// import uuid from 'react-uuid'
import './App.css';
import LeftScreen from './screens/leftscreen/LeftScreen';
import RightScreen from './screens/rightscreen/RightScreen';
import firebase from 'firebase'
// import {db,auth} from './firebase'
import Auth from './screens/authentication/Auth';
// import {format,isToday,isThisWeek,isYesterday} from 'date-fns'

export const AuthContext = createContext();
export const UpdateRightScreen = createContext();
export const ResetRightScreen = createContext();


function App() {


  // const  getTimeOnly = (timestamp) =>{
  //     return format(new Date(timestamp), ' hh:mm aaa')
  // }


  // const  getDateOnly = (timestamp) =>{
  //   if(isToday(new Date(timestamp))) return 'Today'
  //   else if(isYesterday(new Date(timestamp))) return 'Yesterday'
  //   else if(isThisWeek(new Date(timestamp))) return format(new Date(timestamp), 'eeee')
  //   else  return format(new Date(timestamp), ' dd/MM/yyyy')
  // }

  
  // const  getLastTextTime = (timestamp)=>{
  //     if(isToday(new Date(timestamp))) return format(new Date(timestamp), ' hh:mm aaa')
  //     else if(isYesterday(new Date(timestamp))) return 'yesterday'
  //     else if(isThisWeek(new Date(timestamp))) return format(new Date(timestamp), 'eeee')
  //     else  return format(new Date(timestamp), ' dd/MM/yyyy')
  // }

  
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [isLoading,setIsLoading]=useState(true);
  const [rightScreenChat,setRightScreenChat]=useState([])
  const updateLoader = (option) =>{
    setIsLoading(option)
  }




  const updateRightScreenChat = (chatid,type,id) =>{
    setRightScreenChat([chatid,type,id])
  }

  const resetRightScreenChat = () =>{
    setRightScreenChat([])
  }   


  const updateAuth = (status) =>{
    setIsLoggedIn(status);
  }
  
  useEffect(()=>{


    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
          updateAuth(true);
 
      } else{
        updateAuth(false);
        updateLoader(false);
  
      }
  })
  },[]) 


  

  return (
    
    <AuthContext.Provider value={updateAuth} >
      <UpdateRightScreen.Provider value={updateRightScreenChat} >
        <ResetRightScreen.Provider value={resetRightScreenChat} >
          <div className="app" >

            {isLoggedIn ?

              <div className="screen">
                  <div className="app__left">
                      <LeftScreen />
                  </div>

                  <div className="app__right"  >
                      <RightScreen rightScreenChat={rightScreenChat}/>
                  </div>
              </div>
            
                :

                <Auth isLoading = {isLoading} />

            }
          </div>
     </ResetRightScreen.Provider>
  </UpdateRightScreen.Provider>
</AuthContext.Provider>

  
  );
}

export default App;
export const UserContext = createContext()