import { Button, Input } from '@material-ui/core'
import React,{useState} from 'react'
import { db, storage } from './firebase'
import firebase from 'firebase'
import './ImageUpload.css'



function ImageUpload({username}) {
    const [image, setImage] = useState(null)
    const [caption, setCaption] = useState('')
    const [progress, setProgress] = useState(0)

    const handleCaptionChange = (event) => {
        setCaption(event.target.value)
    }
    const handleChange = (event) => {
        if(event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }
    const handleUpload = () => {
        console.log("in handleupload"+username+caption+image)
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        
        console.log("jhsbdhbfhfkhkhfhfkhsjsfhkjsfsjfs")

        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes)* 100
                )
                setProgress(progress)
            },
            (error)=>{
                console.log(error)
                alert(error.message)
            },
            ()=>{
                //complete function
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url=>{
                    //post img in db
                    console.log(url)
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username,
                    }) 
                    setProgress(0)
                    setCaption("")
                    setImage(null)

                })
            }
        )

    }
    return (
        <div className="imageUplaod">
            <progress className="imageUpload_progress" value={progress} max="100"/>
            <Input type="text" placeholder="Enter a caption" onChange={handleCaptionChange} value={caption}/>
            <Input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
