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
export const UpdateTheme = createContext();



function App() {



     let cssPropertiesLight = {};
     cssPropertiesLight['--darkInputBackground']='rgb(238, 231, 231)'
      cssPropertiesLight['--darkBackground'] = 'rgb(238, 231, 231)'
      cssPropertiesLight['--darkGreenBackground'] = '#3fdbb7'
      cssPropertiesLight['--darkFontColor'] = 'rgb(43, 42, 42)'
      cssPropertiesLight['--darkFontSHColor'] = 'grey'
      cssPropertiesLight['--darkFontSHColor'] = 'grey'
      cssPropertiesLight['--darkChatBG'] = '#fee4c3cc'
    
       let cssPropertiesDark = {};
       cssPropertiesDark['--darkInputBackground']='#343836'
       cssPropertiesDark['--darkBackground'] = 'rgb(27, 39, 39)'
       cssPropertiesDark['--darkGreenBackground'] = '#343836'
       cssPropertiesDark['--darkFontColor'] = '#fff'
       cssPropertiesDark['--darkFontSHColor'] = 'rgb(153, 151, 151)'
       cssPropertiesDark['--darkChatBG'] = 'rgba(27, 26, 26, 0.89)'

  

  const [userUid,setUserUid]=useState('')
  const [theme,setTheme]=useState('dark');
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [isLoading,setIsLoading]=useState(true);
  const [screenWidth,setScreenWidth]=useState(0);
  const [mobileViewLeft,setMobileViewLeft]=useState(true);
  const [rightScreenChat,setRightScreenChat]=useState([])

  const updateLoader = (option) =>{
    setIsLoading(option)
  }

  const updateTheme = () =>{
    if(theme==='light') {
      setTheme('dark');
       db.collection('users').doc(userUid).set({
         theme:'dark',
       },{merge:true}) 
    }
    else {
      setTheme('light');
      db.collection('users').doc(userUid).set({
        theme:'light',
      },{merge:true}) 
    }
  }
 
  const updateRightScreenChat = (chatid,type,id,selectedChat) =>{
    setRightScreenChat([chatid,type,id,selectedChat])
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
              setUserUid(res.data().uid);
                 setTheme(res.data().theme); 
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
    <UpdateTheme.Provider value={updateTheme}>
    <UpdateMobileView.Provider value={updateMobileView} >
    <AuthContext.Provider value={updateAuth} >
      <UpdateRightScreen.Provider value={updateRightScreenChat} >
        <ResetRightScreen.Provider value={resetRightScreenChat} >
          <div className="app" style={theme==='light' ? cssPropertiesLight : cssPropertiesDark}>
             
            {isLoggedIn ?
         
             
              <div className="screen">
               { mobileViewLeft ?
                <> 
                  <div className={ screenWidth <600 ? "app__left app__full" :"app__left" }>
                      <LeftScreen />
                  </div>

                  <div className={screenWidth <600 ? "app__right app__none" :"app__right" }>
                      <RightScreen   rightScreenChat={rightScreenChat}/>
                  </div>
                  </>
                  :
                  <> 
                  <div className={ screenWidth <600 ? "app__left app__none":"app__left"}>
                      <LeftScreen />
                  </div>

                  <div className={ screenWidth <600 ? "app__right app__full":"app__right"}  >
                      <RightScreen  rightScreenChat={rightScreenChat}/>
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
</UpdateTheme.Provider>
  
  );
}

export default App;
