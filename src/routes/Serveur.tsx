import { useEffect, useState } from "react";
import Server, { findServerByName } from "../classes/Server";
import { useSearchParams } from "react-router";

export default function Serveur() {

    const [server, setServer] = useState<Server | null>(null);
    const [urlParams, setUrlParams] = useSearchParams();


    useEffect(() => {
        const query = urlParams.get('q');
        console.log("Query:", query);
        if (query == null) return;
        findServerByName(query).then((servers: Server[] | null) => {
            console.log("Servers found:", servers);
            if (servers == null || servers.length === 0) return;
            setServer(servers[0]);
        }).catch((error: Error) => {
            console.error("Error finding server:", error);
        });
    }, []);


    return (
        <div>
            Server : {server?.name || "null"}
        </div>
    )
}