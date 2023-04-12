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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result) 
        console.log(result.user.email) 
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      return result;
    })
    .catch((error) => {
      console.log(error);
    });
};