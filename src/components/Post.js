import { Avatar,Button } from '@material-ui/core'
import React, {useState,useEffect} from 'react'
import { db } from '../firebase'
import '../Post.css'
import firebase from 'firebase'





function Post({postId,user,userName,caption,imageUrl}) {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    const postComment = (event) => {
        event.preventDefault()
        
        db.collection('posts')
        .doc(postId)
        .collection("comments")
        .add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('')
    }


    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe = db
            .collection('posts')
            .doc(postId)
            .collection("comments")
            .orderBy("timestamp","desc")
            .onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map((doc)=>doc.data()))
            })
        }
    }, [postId])

    return (
        <div className="post">
            <div className="post__header">
                <Avatar className="post__avatar" src="https://www.w3schools.com/howto/img_avatar.png" alt="Username"/>
                <h3>{userName}</h3>
            </div>
            
            <img className="post__image" src={imageUrl} alt="postImg"/>
            
            <h4 className="post__text"><strong>{userName}</strong> {caption}</h4>
            {comments.map((comment)=>(
                <p><strong>{comment.username}</strong> {comment.text}</p>
                ))
            }

            {user && (
                <form className="post__commentBox">
                <input 
                    className="post__input"
                    placeholder="Add a comment..." 
                    type="text" 
                    value={comment} 
                    onChange={(e)=>setComment(e.target.value)}/>
                <Button 
                    className="post__button"
                    disabled={!comment}
                    type="submit" 
                    onClick={postComment}>
                Post
                </Button>
                </form>
            )}

            
        </div>
    )
}

export default Post
