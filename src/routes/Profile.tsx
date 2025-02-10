import { useEffect, useLayoutEffect, useState } from "react";
import { PiArrowsLeftRight, PiWarning } from "react-icons/pi";
import { useSearchParams } from "react-router";
import User, { findUserByName } from "../classes/User";
import { useAuth } from "../tools/useAuth";

export default function Profile() {

    const [user, setUser] = useState<User | null>(null);
    const [urlParams, setUrlParams] = useSearchParams();
    const { isLogged, displayName } = useAuth();

    useLayoutEffect(() => {
        const query = urlParams.get('q');
        if (query == null) {
            if (isLogged) {
                console.log(query)
                console.log("Logged in as:", displayName);
                findUserByName(displayName).then((users) => {
                    if (users == null || users.length === 0) return;
                    setUser(users[0]);
                }).catch((error) => {
                    console.error("Error finding server:", error);
                });
            }
        } else {

            findUserByName(query).then((users) => {
                console.log("Servers found:", users);
                if (users == null || users.length === 0) return;
                setUser(users[0]);
            }).catch((error) => {
                console.error("Error finding server:", error);
            });
        }
    }, [isLogged, displayName]);



    return (
        <div className="m-5 h-dvh p-5">
            <div className="flex gap-5">
                <img src={`https://minotar.net/helm/${user?.displayName}`} alt={`${user?.displayName} avatar`} />
                <div>
                    <h1 className="mc">Profil de {user?.displayName || "personne"}</h1>
                    {displayName !== user?.displayName &&
                        <section className="flex gap-5">
                            <button className="btn btn-success btn-soft hover:!border-success"><PiArrowsLeftRight /> Proposer un échange</button>
                            <button className="!btn !btn-error btn-dash hover:!border-error"><PiWarning />Signaler</button>
                        </section>
                    }
                </div>
            </div>
            <main className="mt-5">
                <h1 className="mc">Historique des échanges</h1>
                <div className="flex gap-2">

                </div>
            </main>
        </div>
    )
}