import { collection, getDocs } from "firebase/firestore"
import { Trade } from "./Trade"
import { db } from "../tools/firebase"

export default interface User {
    id: string
    displayName: string
    created_at: string
    trades: Trade[]
}


export async function getAllUsers(): Promise<User[] | null> {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        let users: User[] = [];
        querySnapshot.forEach((doc) => users.push(doc.data() as User));
        return users;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function findUserByName(name: string): Promise<User[] | null> {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        let users: User[] = [];

        querySnapshot.forEach((doc) => {
            const user = doc.data() as User;
            if (user.displayName.toLowerCase().includes(name.toLowerCase()))
                users.push(user);
        });
        return users;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function findUserById(id: string): Promise<User | null> {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        let user: User | null = null;

        querySnapshot.forEach((doc) => {
            const userTmp = doc.data() as User;
            if (userTmp.id.match(id))
                user = userTmp;
        });
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}