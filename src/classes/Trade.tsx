import { User } from "firebase/auth"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { app } from "../tools/firebase"
import Item from "./Item"

export interface Trade {
    id: string
    timestamp: string
    seller: User
    buyer: User
    quantity: number[]
    items: Item[]
}

export async function getTradeById(id: string): Promise<Trade | null> {
    const db = getFirestore(app);
    const docRef = doc(db, "trades", id);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists())
            return docSnap.data() as Trade;
        else
            return null;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};