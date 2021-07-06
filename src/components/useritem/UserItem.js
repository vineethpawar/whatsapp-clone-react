import React from 'react'
import './UserItem.css'


const umailExtractor = (umail)=>{
    return umail.slice(0,umail.lastIndexOf('@'))
}


function UserItem({uname,umail,dp,status}) {
    


    return (
   
                <div  className="chat__item" >
                    <img src={dp} 
                    className="chat__dp" alt="" />
                    <div className="chat__details">
                        <h2 style={{display:'inline-flex',marginRight:'5px'}} className="theme__h4">{uname}  </h2>
                        <h4 style={{display:'inline-flex'}} className="theme__h5 theme__subfont chat__subtext">
                            {umail ? `@${umailExtractor(umail)}` : 'Loading ...'}
                        </h4> 
                        <h4 className="theme__h5 theme__subfont chat__subtext">
                            {status}
                        </h4>
                    </div>
                    
    

                </div>

    )
}

export default UserItem
