import { AUTHENTICATION_ACTIONS, COMMON_ACTIONS  } from './../../constants'

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

 
const firebaseConfig = {
  apiKey: "AIzaSyCNLmir6s7ANOEmWBj5dHxyH44o1x7uw74",
  authDomain: "expenseapp1.firebaseapp.com",
  projectId: "expenseapp1",
  storageBucket: "expenseapp1.appspot.com",
  messagingSenderId: "761698668538",
  appId: "1:761698668538:web:ba1311e6378d56d32cde43",
  measurementId: "G-V68LKMMKLB"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();


const authenticateUser = () => {
  return (dispatch: (arg0: { type: string, data?: any, error?: string }) => void) => {
    dispatch({ type: AUTHENTICATION_ACTIONS.AUTHENTICATE_USER + COMMON_ACTIONS.REQUEST })
    signInWithPopup(auth, provider)
    .then((result:any) => {
        const temp:any = new Object();
        temp.name = result.user.displayName
        temp.email = result.user.email
        temp.isAuthenticated = true
        temp.oauthAccessToken = result.user.accessToken  
        dispatch({ type: AUTHENTICATION_ACTIONS.AUTHENTICATE_USER + COMMON_ACTIONS.SUCCESS, data: temp })
    })  
    .catch((error:any) => {
        dispatch({ type: AUTHENTICATION_ACTIONS.AUTHENTICATE_USER + COMMON_ACTIONS.ERROR })
  });
      
  }
}
 

export const authenticationActions = {
  authenticateUser 
}
