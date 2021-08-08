import React, { useState, useEffect } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import './ChatDetails.css'
import Popup from 'reactjs-popup';
import { toast } from 'react-toastify';
import { db } from '../../firebase'
import Axios from 'axios'
import UserListItem from './../userlistitem/UserListItem';
import UserItem from '../useritem/UserItem';
import { CLOUD_NAME, UPLOAD_PRESET } from '../../cloudinary'
function ChatDetails({ rightScreenChat, updateChatDetailsVisibility, updateGroup }) {
    const [userArray, setUserArray] = useState([])



    const uploadImage = (files) => {

        if ((files[0]) && (files[0].type).includes('image')) {

            if (files[0].size < 4100000) {

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
                formData.append("file", files[0])
                formData.append("upload_preset", UPLOAD_PRESET)

                Axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData)
                    .then((response) => {
                        setChatImage(response.data.secure_url);
                        db.collection('chats').doc(rightScreenChat[0]).set({
                            dp: response.data.secure_url
                        }, { merge: true });
                    })

            } else {
                toast.error('Keep image size below 4Mb', {
                    position: "bottom-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
            }


        } else {
            if (files[0]) {
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




    const [chatName, setChatName] = useState('Loading...');
    const [defDesc, setDefDesc] = useState('Loading...');
    const [description, setDescription] = useState('Loading...');
    const [defChatName, setDefChatName] = useState('');
    const [chatImage, setChatImage] = useState('https://res.cloudinary.com/dpjkblzgf/image/upload/v1624507908/mess_zq9mov.png');

    useEffect(() => {

        if (rightScreenChat[1] === 'group') {
            db.collection('chats').doc(rightScreenChat[0]).onSnapshot((snapshot) => {
                setDefChatName(snapshot.data().chatname)
                setDefDesc(snapshot.data().description)
                setChatName(snapshot.data().chatname)
                setChatImage(snapshot.data().dp)
                setDescription(snapshot.data().description)

                setUserArray(snapshot.data().members)

            })
        } else if (rightScreenChat[1] === 'personal') {
            db.collection('users').doc(rightScreenChat[0]).get()
                .then((snapshot) => {

                    // setChatName({
                    //     dp:snapshot.data().dp,
                    //     name:snapshot.data().uname,
                    //     umail:snapshot.data().umail,
                    //     status:snapshot.data().status
                    // })
                    setDefDesc(snapshot.data().status)
                    setChatName(snapshot.data().uname)
                    setDefChatName(snapshot.data().uname)
                    setChatImage(snapshot.data().dp)
                    setDescription(snapshot.data().status)

                })
        }

    }, [rightScreenChat])





    return (
        <div className="chat__info theme__bg theme__font">
            <input id="uploadId" type="file" onChange={(event) => uploadImage(event.target.files)} />

            <div className="cd__heading theme__green__bg theme__font sticky__top">
                <span onClick={() => updateChatDetailsVisibility(false)}>
                    <CloseIcon className="close_icon " />
                </span>
                <h3 className='cd__heading__title'>{rightScreenChat[1] === 'group' ? 'Group Info' : 'User Info'}</h3>
            </div>

            <div className="cd__profile__img">
                <Popup trigger={<img className="cm__img" src={chatImage} />} modal>
                    {close => (<img className="full__img" src={chatImage} onClick={close} />)}
                </Popup>



                {rightScreenChat[1] === 'group' &&
                    <label htmlFor="uploadId" >
                        <h3 style={{ paddingLeft: '20px', paddingRight: '20px' }} className="chpic theme__h3" ><CameraAltIcon className="cam__icon" /> Change Photo</h3>
                    </label>
                }


                <div className="chat__specs ">
                    {rightScreenChat[1] === 'group' ? <h3 className="theme__h3">Group name</h3> : <h3 className="theme__h3">Name</h3>}
                    <div className="inp__name">
                        {rightScreenChat[1] === 'group' ?
                            <input spellCheck="false" className=" theme__font " type="text" value={chatName} onChange={(e) => setChatName(e.target.value)} />
                            :
                            <input spellCheck="false" className=" theme__font " type="text" value={chatName} disabled />
                        }
                        {chatName.trim() !== defChatName.trim() && chatName.trim().length >= 1 &&

                            <div className="inp__tick"

                                onClick={() => {
                                    setDefChatName(chatName)
                                    db.collection('chats').doc(rightScreenChat[0]).set({
                                        chatname: chatName
                                    }, { merge: true })
                                        .then((res) => {

                                            toast.dark('Updated Group name', {
                                                position: "bottom-left",
                                                autoClose: 1000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: false,
                                                draggable: false,
                                                progress: undefined,
                                            });
                                        })
                                }
                                }
                            >
                                <DoneIcon />
                            </div>
                        }


                    </div>


                </div>
            </div>


            <div className="cd__profile__info">
                {rightScreenChat[1] === 'group' ? <h3 className="theme__h3">Description</h3> : <h3 className="theme__h3">Status</h3>}

                <div className="inp__name">
                    {rightScreenChat[1] === 'group' ?
                        <>
                            <input id="name" spellCheck="false" className=" theme__font " type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </>
                        :
                        <input id="name" maxLength="50" spellCheck="false" className=" theme__font " type="text" value={description} disabled />
                    }
                    {description.trim() !== defDesc.trim() && description.trim().length >= 1 &&

                        <div className="inp__tick"

                            onClick={() => {
                                setDefDesc(description)
                                db.collection('chats').doc(rightScreenChat[0]).set({
                                    description: description
                                }, { merge: true })
                                    .then((res) => {

                                        toast.dark('Updated Group Description', {
                                            position: "bottom-left",
                                            autoClose: 1000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: false,
                                            draggable: false,
                                            progress: undefined,
                                        });
                                    })
                            }
                            }
                        >
                            <DoneIcon />
                        </div>
                    }
                </div>
                {rightScreenChat[1] === 'group' ?
                    <>
                        <h3 className="theme__h3 noc">{50 - description.length}</h3>
                    </>
                    :
                    null
                }

            </div>




            {rightScreenChat[1] === 'group' &&
                <div className="cd__profile__info">
                    <h3 className="theme__h3">Participants</h3>
                    <span onClick={() => { updateGroup(true); }}>
                        <UserItem uname="Add friend" umail="[Enter unique id] " dp="https://res.cloudinary.com/dpjkblzgf/image/upload/v1627946505/plussSign_dmhjqd.png" />
                    </span>
                    {userArray.map(user => <UserListItem key={user} uid={user} />)}

                </div>


            }







        </div>
    )
}

export default ChatDetails
