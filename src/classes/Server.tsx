import { collection, getDocs } from "firebase/firestore";
import { db } from "../tools/firebase";

export default interface Server {
    id: number
    name: string
    ip: string
}

export async function getAllServers(): Promise<Server[] | null> {
    try {
        const querySnapshot = await getDocs(collection(db, "servers"));
        let servers: Server[] = [];
        querySnapshot.forEach((doc) => servers.push(doc.data() as Server));
        return servers;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function findServerByName(name: string): Promise<Server[] | null> {
    try {
        const querySnapshot = await getDocs(collection(db, "servers"));
        let servers: Server[] = [];

        querySnapshot.forEach((doc) => {
            const server = doc.data() as Server;
            console.log(name.toLowerCase())
            if (server.name.toLowerCase().includes(name.toLowerCase()))
                servers.push(server);
        });
        return servers;
    } catch (error) {
        console.log(error);
        return null;
    }
}