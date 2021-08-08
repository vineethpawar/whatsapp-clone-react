import React, { useEffect, useState } from 'react'
import './ChatInput.css'
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import PhotoIcon from '@material-ui/icons/Photo';
import MicNoneOutlinedIcon from '@material-ui/icons/MicNoneOutlined';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import SendIcon from '@material-ui/icons/Send';
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import uuid from 'react-uuid'
import { db } from '../../firebase'
import firebase from 'firebase'
import { ClickAwayListener } from '@material-ui/core';
import 'emoji-picker-element';
import { CLOUD_NAME, UPLOAD_PRESET } from '../../cloudinary'



const umailExtractor = (umail) => {
    return umail.slice(0, umail.lastIndexOf('@'))
}


function ChatInput({ rightScreenChat, user, updateScrollTimeout }) {

    const checkCombo = (event) => {
        if (event.ctrlKey && event.keyCode === 13) sendText();
    }

    const sendText = () => {
        if (!listening && (document.getElementById('chattextbar').value.trim().length > 0 || imgInput.length > 0)) {
            if (rightScreenChat[1] === 'group') {
                db.collection('chats').doc(rightScreenChat[0]).set({
                    messages: firebase.firestore.FieldValue.arrayUnion(
                        {
                            mid: uuid(),
                            uid: user.uid,
                            from: umailExtractor(user.umail),
                            img: imgInput,
                            content: document.getElementById('chattextbar').value.trim(),
                            timePosted: `${new Date()}`,
                            type: 'common'
                        }
                    ),
                    lastTexted: `${new Date()}`,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true })
            }

            else {
                db.collection('chats').doc(rightScreenChat[2]).set({
                    messages: firebase.firestore.FieldValue.arrayUnion(
                        {
                            mid: uuid(),
                            uid: user.uid,
                            from: umailExtractor(user.umail),
                            img: imgInput,
                            content: document.getElementById('chattextbar').value,
                            timePosted: `${new Date()}`,
                            type: 'common'
                        }
                    ),
                    lastTexted: `${new Date()}`,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true })
            }


            document.getElementById('chattextbar').value = '';
            setInputHeight('25px')
            setTextInput('');
            resetImage();
            updateScrollTimeout();
        } else {
            if (listening) {
                toast.error('Turn off mic before sending', {
                    position: "bottom-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
            } else {
                toast.error('Message is empty !! ', {
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


    const uploadImage = (files) => {

        if ((files[0]) && (files[0].type).includes('image')) {

            if (files[0].size < 4100000) {

                toast.dark('Attaching image', {
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
                        setImageInput(response.data.secure_url);
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




    const resetImage = () => {
        setImageInput('');
        document.getElementById('img_upload_input').value = '';


    }

    const [textInput, setTextInput] = useState('');
    const [imgInput, setImageInput] = useState('');
    const [inputHeight, setInputHeight] = useState('25px');

    const [emojiOptions, setEmojiOptions] = useState(false);


    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        console.log('error inspeech recognition')
    }


    const autogrow = (e) => {


        if (!e.target.value) { setInputHeight('25px') }
        else {
            if (e.target.scrollHeight <= 100)
                setInputHeight(`${e.target.scrollHeight}px`);
            else
                setInputHeight(`100px`);

        }

    }



    const listenStart = () => {
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true })
        setEmojiOptions(false);


    }

    const listenStop = () => {
        setTextInput(textInput + transcript)
        SpeechRecognition.stopListening()


    }



    useEffect(() => {
        const chattextbar = document.getElementById('chattextbar');
        const picker = document.getElementById('emojiid');
        picker.addEventListener('emoji-click', event => { chattextbar.value += event.detail.unicode; setTextInput(chattextbar.value) })

    }, [])

    return (
        <div className="chat__name__input theme__bg theme__font">
            <ToastContainer />

            {/* 
        <div>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
        </div> */}






            <div className="emote" title="emote" onClick={listening ? null : () => { setEmojiOptions(!emojiOptions) }}>
                {emojiOptions ?
                    <EmojiEmotionsIcon className="emote__icon" />
                    :
                    <EmojiEmotionsOutlinedIcon className="emote__icon" />
                }
            </div>


            <label htmlFor="img_upload_input">
                <div className="emote" title="photo">
                    <PhotoIcon className="emote__icon" />
                </div>
            </label>

            <div className="input__bar theme__input__bg" style={{ border: '1px solid grey' }}>
                <form style={{ width: '100%' }}>
                    {listening ?
                        <textarea spellCheck='false' placeholder="Type a message" style={{ height: inputHeight }} onKeyDown={(e) => checkCombo(e)} value={listening ? textInput + transcript : textInput} onChange={(e) => { setTextInput(e.target.value); autogrow(e) }} className="input__bar__textarea  theme__font" disabled></textarea>
                        :
                        <textarea id="chattextbar" spellCheck='false' placeholder="Type a message" style={{ height: inputHeight }} onKeyDown={(e) => checkCombo(e)} value={listening ? textInput + transcript : textInput} onChange={(e) => { setTextInput(e.target.value); autogrow(e) }} className="input__bar__textarea  theme__font"  ></textarea>

                    }
                </form>
            </div>

            <div onClick={listening ? listenStop : listenStart} className={listening ? 'emote mic_on' : 'emote'} title="speech to text">
                <MicNoneOutlinedIcon className="emote__icon" />
            </div>

            <div className="send_icon" title="send" onClick={() => sendText()}>
                <SendIcon className="emote__icon" style={{ padding: '3px' }} />
            </div>

            <emoji-picker id="emojiid" style={emojiOptions ? { display: 'block' } : { display: 'none' }}></emoji-picker>

            {imgInput.length > 0 &&
                <div className="img__upload__wrapper theme__bg">
                    <div className="img__bundle">
                        <img className="img__upload" src={imgInput} alt="" />
                        <div className="rem_img_icon emote bg__grey" onClick={() => { resetImage() }}><DeleteForeverIcon className="del_icon" /></div>
                    </div>
                </div>
            }

            <input id="img_upload_input" style={{ display: 'none' }} type="file" onChange={(event) => uploadImage(event.target.files)} name="" />
        </div>
    )
}

export default ChatInput
