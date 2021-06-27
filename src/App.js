import React,{useEffect,useState,createContext} from 'react'
// import uuid from 'react-uuid'
import './App.css';
import LeftScreen from './screens/leftscreen/LeftScreen';
import RightScreen from './screens/rightscreen/RightScreen';
import firebase from 'firebase'
import {db} from './firebase'
import Auth from './screens/authentication/Auth';
// import {format,isToday,isThisWeek,isYesterday} from 'date-fns'

export const AuthContext = createContext();
export const UpdateRightScreen = createContext();
export const ResetRightScreen = createContext();
export const UpdateMobileView= createContext();




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
  const [screenWidth,setScreenWidth]=useState(0);
  const [mobileViewLeft,setMobileViewLeft]=useState(true);
  const [rightScreenChat,setRightScreenChat]=useState([])
  const updateLoader = (option) =>{
    setIsLoading(option)
  }


 
  const updateRightScreenChat = (chatid,type,id) =>{
    setRightScreenChat([chatid,type,id])
  }
 
  const updateMobileView = (status) =>{
    setMobileViewLeft(status)
  }   

  const resetRightScreenChat = () =>{
    setRightScreenChat([])
  }   


  const updateAuth = (status) =>{
    setIsLoggedIn(status);
  }
  
  useEffect(()=>{
    setScreenWidth(document.body.clientWidth);
    window.addEventListener("resize", (event)=> {
      setScreenWidth(document.body.clientWidth);
    })

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        db.collection('users').doc(user.uid).get()
        .then((res)=>{
              
            if(res.exists){
                updateAuth(true);
                updateLoader(false);
            }
          })
        
 
      } else{
       
        updateLoader(false);
  
      }
  })
  },[]) 


  

  return (
    <UpdateMobileView.Provider value={updateMobileView} >
    <AuthContext.Provider value={updateAuth} >
      <UpdateRightScreen.Provider value={updateRightScreenChat} >
        <ResetRightScreen.Provider value={resetRightScreenChat} >
          <div className="app">
             
            {isLoggedIn ?
         
             
              <div className="screen">
               { mobileViewLeft ?
                <> 
                  <div className={ screenWidth <600 ? "app__left app__full" :"app__left" }>
                      <LeftScreen />
                  </div>

                  <div className={screenWidth <600 ? "app__right app__none" :"app__right" }>
                      <RightScreen rightScreenChat={rightScreenChat}/>
                  </div>
                  </>
                  :
                  <> 
                  <div className={ screenWidth <600 ? "app__left app__none":"app__left"}>
                      <LeftScreen />
                  </div>

                  <div className={ screenWidth <600 ? "app__right app__full":"app__right"}  >
                      <RightScreen rightScreenChat={rightScreenChat}/>
                  </div>
                  </>
                }

                 
              </div>
             
                :

                <Auth isLoading = {isLoading} updateLoader={updateLoader} />

            }
          </div>
     </ResetRightScreen.Provider>
  </UpdateRightScreen.Provider>
</AuthContext.Provider>
</UpdateMobileView.Provider>

  
  );
}

export default App;
