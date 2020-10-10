import { Button } from '@material-ui/core'
import React from 'react'
import  '../AppHeader.css'
import { auth } from '../firebase'

function AppHeader({user,setOpenSignIn,setOpen}) {
    return (
        <div className="app__header">
        {/* HEADER */}
        <img className="app__headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="App_Logo" />
        {user ? (
        <Button className="" onClick={()=>auth.signOut()}>Sign out</Button>
        ):(
        <div className="app__signincontainer">
            <Button className="" onClick={() =>setOpenSignIn(true)}>Sign in</Button>
            <Button className="" onClick={() =>setOpen(true)}>Sign up</Button>
        </div>
      )}
        </div>
    )
}

export default AppHeader
