import React ,{createContext, useState, useEffect}from 'react'
import { GoogleAuthProvider, createUserWithEmailAndPassword, 
        getAuth, 
        onAuthStateChanged, 
        signInWithEmailAndPassword, 
        signInWithPopup, 
        signOut, 
        updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config'
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext()
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // create an account

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // signup with gmail account
    const signUpWithGmail = ()=>{
       return  signInWithPopup(auth, googleProvider)
    }

    //login using email password
    const login = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    //log out

    const logOut = () => {
        signOut(auth)
        window.location.reload(false);
    }

    //update profile
    const updateUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
          })
    }

    //sign-in user
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
              setUser(currentUser)
              setLoading(false)
            } else {
                setLoading(false)
                
              // User is signed out
              // ...
            }
          })

          return () => {
            return unsubscribe();
          }
    },[])
    const authInfo = {
        user,
        createUser,
        signUpWithGmail,
        login,
        logOut,
        updateUserProfile,
        loading
    }
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider