import React, { useState,useEffect } from 'react'
import './App.css';
import AppHeader from './components/AppHeader';
import Post from './components/Post';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import {db, auth } from './firebase';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';



function getModalStyle() {
  const top = 50 ;
  const left = 50 ;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({

  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

}));






function App() {
  const [posts,setPosts] = useState([])
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalStyle] = useState(getModalStyle);
  const [user, setUser] = useState(null);
  const classes = useStyles();

  const handleSignup = (event) => {
    event.preventDefault()

    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      // displayName: username
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))

    setOpen(false)
  }

  const handleSignIn = (event) => {
    event.preventDefault()

    auth
    .signInWithEmailAndPassword(email,password)
    // .then((authUser) => {
    //   // displayName: username
    //   return authUser.user.updateProfile({
    //     username: authUser.displayName
    //   })
    // })
    .catch((error) => alert(error.message))

    setOpenSignIn(false)
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form className="app__signup">
        <center>
        <img 
        className="app__ModalImage" 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" 
        alt="App_Logo" />
        </center>
        <Input 
        placeholder="username" 
        type="text" 
        value={username} 
        onChange={(e)=>setUsername(e.target.value)}/>
        <Input 
        placeholder="email" 
        type="text" 
        value={email} 
        onChange={(e)=>setEmail(e.target.value)}/>
        <Input 
        placeholder="password" 
        type="text" 
        value={password} 
        onChange={(e)=>setPassword(e.target.value)}/>
        <Button  type="submit" onClick={handleSignup}>SignUp</Button>
      </form>
    </div>
  );

  const bodySingIn = (
    <div style={modalStyle} className={classes.paper}>
      <form className="app__signup">
        <center>
        <img 
        className="app__ModalImage" 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" 
        alt="App_Logo" />
        </center>
        <Input 
        placeholder="email" 
        type="text" 
        value={email} 
        onChange={(e)=>setEmail(e.target.value)}/>
        <Input 
        placeholder="password" 
        type="text" 
        value={password} 
        onChange={(e)=>setPassword(e.target.value)}/>
        <Button  type="submit" onClick={handleSignIn}>SignIn </Button>
      </form>
    </div>
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        //user logged in
        setUser(authUser)
      }else{
        //user logged out
        setUser(null)
      }
    })

    return ()=>unsubscribe()
  }, [user,username])

  useEffect(() => {
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
        id: doc.id,
        post: doc.data()})))
    })
  }, [posts])

  return (
    <div className="app">
      <AppHeader setOpen={setOpen} setOpenSignIn={setOpenSignIn} user={user}/>

      <Modal open={open} onClose={() => setOpen(false)} >
        {body}
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)} >
        {bodySingIn}
      </Modal>

      <div className="app_posts">
        <div className="app_postsleft">
          {
          posts.map(({id,post}) => (
            <Post key={id} postId={id} user={user} userName={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
          ))}
        </div>
        <div className="app__postsright">
          <InstagramEmbed
            url='https://instagr.am/p/Zw9o4/'
            maxWidth={220}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>

      {user?.displayName? ( 
      <ImageUpload username={user.displayName}/>
      ):(
        <h3>Sorry you need to Login to Upload.</h3>
      )}
    </div>

    

  );
}

export default App;