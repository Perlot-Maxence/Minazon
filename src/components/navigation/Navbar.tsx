import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { PiArrowsLeftRightBold, PiBellBold, PiDoorOpen, PiNotification, PiUser, PiUsersBold } from "react-icons/pi";
import Server, { findServerByName } from "../../classes/Server";
import User, { findUserByName } from "../../classes/User";
import { searchUserAndServer } from "../../tools/firebaseDB";
import { useAuth } from "../../tools/useAuth";

export default function Navbar() {
    const isMobile = window.innerWidth < 768

    const { isLogged, displayName } = useAuth();

    const [query, setQuery] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const timeOutId = setTimeout(() => setSearch(query), 500);
        return () => clearTimeout(timeOutId);
    }, [query]);


    useEffect(() => {
        if (search.length == 0) return;


        switch (search[0]) {
            case "@":
                findUserByName(search.slice(1)).then((users) => {
                    if (users == null) return;
                    const searchResults = document.getElementById("searchResults");
                    if (searchResults == null) throw new Error("searchResults not found");
                    searchResults.innerHTML = "";
                    users.forEach((user) => {
                        const li = document.createElement("li");
                        li.innerHTML = `
                    <a href="/profile?q=${user.displayName}" class="flex items-center gap-5">
                        <div class="avatar online">
                            <div class="w-8">
                                <img src="https://minotar.net/helm/${user.displayName}" />
                            </div>
                        </div>
                        <p>${user.displayName}</p>
                        <div class="flex-auto"></div>
                        <p class="label text-gray-500">Joueur</p>
                    </a>
                                `;
                        searchResults.appendChild(li);
                    });
                });
                break;



            case "#":
                findServerByName(search.slice(1)).then((servers) => {
                    if (servers == null) return;
                    const searchResults = document.getElementById("searchResults");
                    if (searchResults == null) throw new Error("searchResults not found");
                    searchResults.innerHTML = "";
                    servers.forEach((server) => {
                        const li = document.createElement("li");
                        li.innerHTML = `
                    <a href="/server?q=${server.name}" class="flex items-center gap-5">
                        <div class="avatar online">
                            <div class="w-8">
                                <img src="https://eu.mc-api.net/v3/server/favicon/${server.ip}" />
                            </div>
                        </div>
                        <p>${server.name}</p>
                        <div class="flex-auto"></div>
                        <p class="label text-gray-500">Serveur</p>
                    </a>
                                `;
                        searchResults.appendChild(li);
                    });
                });

                break;

            default:
                searchUserAndServer(search).then((result) => {
                    if (result == null) return;
                    const { users, servers } = result;
                    const searchResults = document.getElementById("searchResults");
                    if (searchResults == null) throw new Error("searchResults not found");
                    searchResults.innerHTML = "";
                    users.forEach((user: User) => {
                        const li = document.createElement("li");
                        li.innerHTML = `
                    <a href="/profile?q=${user.displayName}" class="flex items-center gap-5">
                        <div class="avatar online">
                            <div class="w-8">
                                <img src="https://minotar.net/helm/${user.displayName}" />
                            </div>
                        </div>
                        <p>${user.displayName}</p>
                        <div class="flex-auto"></div>
                        <p class="label text-gray-500">Joueur</p>
                    </a>
                                `;
                        searchResults.appendChild(li);
                    });
                    servers.forEach((server: Server) => {
                        const li = document.createElement("li");
                        li.innerHTML = `
                    <a href="/server?q=${server.name}" class="flex items-center gap-5">
                        <div class="avatar online">
                            <div class="w-8">
                                <img src="https://eu.mc-api.net/v3/server/favicon/${server.ip}" />
                            </div>
                        </div>
                        <p>${server.name}</p>
                        <div class="flex-auto"></div>
                        <p class="label text-gray-500">Serveur</p>
                    </a>
                                `;
                        searchResults.appendChild(li);
                    });
                });
                break;
        }

    }, [search]);



    return (
        <nav className="w-full bg-[#25253ca0] border-b-4 border-b-[#ea9962] px-5 p-3">
            {isMobile ?
                <img src="/minazon2.png" alt="logo" />
                :
                <div className="flex items-center">
                    <a href="/" className="flex-1">
                        <img src="/minazon2.png" alt="logo" />
                    </a>
                    <div className="flex-auto"></div>
                    <div className={`dropdown dropdown-center ${search === "" ? "" : "open"}`}>
                        <label className="input input-bordered flex items-center gap-2 w-96">
                            <input type="text" onChange={(e) => setQuery(e.target.value)} placeholder="@utilisateur, #serveur" className="mc text-xl grow" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-8 w-8 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="dropdown-content mt-4 menu bg-base-100 rounded-box z-[1] w-96 p-2 shadow" id="searchResults">
                        </ul>
                    </div>
                    <div className="flex-auto"></div>
                    {isLogged ?
                        <div className="flex items-center gap-4">
                            <a className="flex items-center text-2xl mc btn !text-white" href=""><PiArrowsLeftRightBold className="text-3xl" />Mes echanges</a>
                            <details className="dropdown">
                                <summary className="flex items-center text-2xl mc btn"><PiBellBold className="text-3xl" /> Notifications</summary>
                                <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    <li><p><PiNotification /> Aucune notification</p></li>
                                </ul>
                            </details>
                            <a className="flex items-center text-2xl mc btn !text-white" href=""><PiUsersBold className="text-3xl" /> Amis</a>
                            <div>
                                <details className="dropdown pr-5 ">
                                    <summary className="flex cursor-pointer">
                                        <div className="avatar online">
                                            <div className="w-16 hover:scale-105 transition">
                                                <img src={`https://minotar.net/helm/${displayName}`} />
                                            </div>
                                        </div>
                                    </summary>
                                    <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 shadow-sm -translate-x-1/2 gap-1">
                                        <li><button onClick={() => document.location.href = "/profile"}><PiUser /> Profil</button></li>
                                        <li><button onClick={() => getAuth().signOut()}><PiDoorOpen /> Se deconnecter</button></li>
                                    </ul>
                                </details>
                            </div>
                        </div>
                        :
                        <a className="flex items-center text-2xl mc btn !text-white" href="/login"><PiUser className="text-3xl" />Se connecter</a>
                    }

                </div>
            }
        </nav>
    )
}