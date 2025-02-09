import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "./firebase";

const auth = getAuth(app);
const provider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();
const firebaseapp = app;

export const signInWithGithub = () => {
    return signInWithPopup(auth, provider);
}

export const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
}

export async function checkIfUserExists(uid: string): Promise<boolean | null> {
    const db = getFirestore(firebaseapp);
    const docRef = doc(db, "users", uid);
    try {
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getDisplayName(uid: string): Promise<string | null> {
    const db = getFirestore(firebaseapp);
    const docRef = doc(db, "users", uid);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists())
            return docSnap.data().displayName;
        else
            return null;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}