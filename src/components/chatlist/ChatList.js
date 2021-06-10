import React,{useState} from 'react'
import './ChatList.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SearchIcon from '@material-ui/icons/Search';
import ChatItem from '../chatitem/ChatItem';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function ChatList() {

   const [menuOptions,setMenuOptions]=useState(false);

    return (
        <div className="chat__list theme__bg theme__font">
          
         
           <div className="sticky__top">  


          { true ? 
            <div className="chatlist__header theme__green__bg archieved__header">
            
                <img className="user__img" src="data:image/jpeg;base64,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" alt="" />  
                <div className="chat__icons">
                    <span title="Status">
                        <DonutLargeIcon className="chat__icon"/>
                    </span>
                    <span title="New chat">
                        <AddIcon className="chat__icon"/>
                    </span>

                    <span title="Menu" className="menu__span" onClick={()=>{menuOptions?setMenuOptions(false):setMenuOptions(true)}}>
                        <MoreHorizIcon className="chat__icon"/>

                        {menuOptions && 
                        <div className="menu__options theme__green__bg">
                            <div className="menu__option__item">awdawdawd</div>
                            <div className="menu__option__item">awdawdae4terwd</div>
                            <div className="menu__option__item">awdawdawd</div>
                        </div>
                        }
                    </span>
                </div>
         
            </div>

           :
        
          
              <div className="chatlist__header theme__green__bg">
                  <h2 className="theme__h2 archieved__header"><ArrowBackIcon className="arch__back__icon" />  Archieved chat</h2>
              </div>
            
        }





            <div className="search__container theme__search theme__green__bg">
                   <SearchIcon className="search__icon" /> 
                   <input spellcheck="false" className="search__inp theme__font" type="text" placeholder="Search or start new chat" id="" />
            </div>
         </div>
        


              <div className="chatlist__container">
               
                 <div className="chat__container" style={{overflowX:"hidden"}}>

                        <ChatItem/>
                        <ChatItem/>
                        <ChatItem/>
                        <ChatItem/>
                        <ChatItem/>
                        <ChatItem/>
                        <ChatItem/>
                        <ChatItem/>
                        <ChatItem/>
                        <ChatItem/>
                        <ChatItem/>
                        <ChatItem/>
                        <ChatItem/>
                        <ChatItem/>
                        <ChatItem/>
                        <ChatItem/>
                        <ChatItem/>
                        <ChatItem/>
                        <ChatItem/>
                        <ChatItem/>
                        <ChatItem/>
                        <ChatItem/>

                 </div>
             
            </div>






             

        </div>
    )
}

export default ChatList
   