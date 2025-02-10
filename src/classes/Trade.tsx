import { collection, doc, getDoc, getDocs, getFirestore, Timestamp } from "firebase/firestore"
import { app, db } from "../tools/firebase"
import User, { findUserById } from "./User"

export interface Trade {
    id: string
    timestamp: Timestamp
    seller_id: string
    seller: User
    buyer_id: string
    buyer: User
    quantity: number[]
    items: string[]
}

export async function getTradeById(id: string): Promise<Trade | null> {
    const db = getFirestore(app);
    const docRef = doc(db, "trades", id);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const trade = docSnap.data() as Trade;
            const seller = await findUserById(trade.seller_id);
            if (seller) {
                trade.seller = seller;
            }
            const buyer = await findUserById(trade.buyer_id);
            if (buyer) {
                trade.buyer = buyer;
            }
            return trade;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getTradesBySellerId(seller_id: string): Promise<Trade[] | null> {
    try {
        const querySnapshot = await getDocs(collection(db, "trades"));
        let trades: Trade[] = [];
        querySnapshot.forEach((doc) => {
            const trade = doc.data() as Trade;
            if (trade.seller_id === seller_id) {
                trades.push(trade);
            }
        });
        return trades;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function get10lastTrades(): Promise<Trade[] | null> {
    try {
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, "trades"));
        const trades: Trade[] = [];

        const tradePromises = querySnapshot.docs.map(async (doc) => {
            const trade = doc.data() as Trade;
            const seller = await findUserById(trade.seller_id);
            if (seller) {
                trade.seller = seller;
            }
            const buyer = await findUserById(trade.buyer_id);
            if (buyer) {
                trade.buyer = buyer;
            }
            trades.push(trade);
        });

        await Promise.all(tradePromises);
        return trades;
    } catch (error) {
        console.log(error);
        return null;
    }
}