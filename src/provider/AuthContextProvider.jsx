import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.config";

// create a context
const AuthContext = createContext(null);

// fireBase provider
const googleProvider = new GoogleAuthProvider();

// ==== Component AuthContextProvider start =====
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // google sign in
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //  register user with email password
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //  sign in user with email password
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign out user
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // update profile
  const updateUserProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // use observer to check user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // context data
  const authInfo = {
    googleSignIn,
    registerUser,
    signInUser,
    signOutUser,
    updateUserProfile,
    loading,
    setLoading,
    user,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

// ==== Component AuthContextProvider end =====

export { AuthContext };
export default AuthContextProvider;
