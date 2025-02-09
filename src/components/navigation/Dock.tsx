import { PiBell, PiHouse, PiUser, PiUsers } from "react-icons/pi";
import { useAuth } from "../../tools/useAuth";
import { getAuth } from "firebase/auth";

export default function Dock() {
    const { isLogged, displayName } = useAuth()

    return (
        <nav className="fixed bottom-0 left-0 bg-amber-800 w-full flex justify-between px-5 p-2 ">
            <a href="/"><PiHouse className="text-6xl" /></a>
            <a><PiBell className="text-6xl" /></a>
            <a><PiUsers className="text-6xl" /></a>
            {isLogged ?
                <details className="dropdown dropdown-top md:dropdown-bottom pr-5">
                    <summary className="flex cursor-pointer">
                        <div className="avatar online">
                            <div className="w-16 rounded-full">
                                <img src={`https://minotar.net/helm/${displayName}`} />
                            </div>
                        </div>
                    </summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 shadow-sm -translate-x-1/2 ">
                        <li><button onClick={() => getAuth().signOut()}>Se deconnecter</button></li>
                    </ul>
                </details>
                :
                <a className="flex items-center" href="/#login"><PiUser className="text-6xl" /></a>
            }
        </nav>
    )
}