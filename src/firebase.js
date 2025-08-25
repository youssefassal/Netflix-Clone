import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut
} from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore 
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyANLvXeSZf5lxRLNx8BUyI3ysR1Z9K1Lzc",
  authDomain: "netflix-clone-6523f.firebaseapp.com",
  projectId: "netflix-clone-6523f",
  storageBucket: "netflix-clone-6523f.firebasestorage.app",
  messagingSenderId: "692604468372",
  appId: "1:692604468372:web:9423f3278df76171100881"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })
    } catch (err) {
        console.error(err);
        toast.error(err.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email, password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }catch (err) {
        console.error(err);
        toast.error(err.code.split('/')[1].split('-').join(' '));
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, signup, login, logout };