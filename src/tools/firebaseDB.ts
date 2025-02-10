import { collection, getDocs } from "firebase/firestore";
import Server from "../classes/Server";
import User from "../classes/User";
import { db } from "./firebase";


export async function searchUserAndServer(search: string): Promise<{ users: User[], servers: Server[] } | null> {
    try {
        const querySnapshotUsers = await getDocs(collection(db, "users"));
        const querySnapshotServers = await getDocs(collection(db, "servers"));
        let users: User[] = [];
        let servers: Server[] = [];

        querySnapshotUsers.forEach((doc) => {
            const user = doc.data() as User;
            if (user.displayName.toLowerCase().includes(search.toLowerCase()))
                users.push(user);
        });

        querySnapshotServers.forEach((doc) => {
            const server = doc.data() as Server;
            if (server.name.toLowerCase().includes(search.toLowerCase()))
                servers.push(server);
        });

        return { users, servers };
    } catch (error) {
        console.log(error);
        return null;
    }
}