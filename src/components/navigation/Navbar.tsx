import { getAuth } from "firebase/auth"
import { PiArrowsLeftRightBold, PiBellBold, PiUser, PiUsersBold } from "react-icons/pi"
import { useAuth } from "../../tools/useAuth"

export default function Navbar() {
    const isMobile = window.innerWidth < 768

    const { isLogged, displayName } = useAuth();

    return (
        <nav className="w-full bg-[#25253ca0] border-b-4 border-b-primary px-5 p-3">
            {isMobile ?
                <img src="/minazon.png" alt="logo" />
                :
                <div className="flex items-center">
                    <img src="/minazon.png" className="w-1/6" alt="logo" />
                    <div className="flex-auto"></div>

                    <div className="flex-auto"></div>
                    <div className="flex items-center gap-4">
                        <a className="flex items-center text-2xl mc btn !text-white" href=""><PiArrowsLeftRightBold className="text-3xl" /> Echanges</a>
                        <details className="dropdown">
                            <summary className="flex items-center text-2xl mc btn"><PiBellBold className="text-3xl" /> Notifications</summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><a>Item 1</a></li>
                                <li><a>Item 2</a></li>
                            </ul>
                        </details>
                        <a className="flex items-center text-2xl mc btn !text-white" href=""><PiUsersBold className="text-3xl" /> Amis</a>
                        <div>
                            {isLogged ?
                                <details className="dropdown pr-5">
                                    <summary className="flex cursor-pointer">
                                        <div className="avatar online">
                                            <div className="w-16 rounded-full">
                                                <img src={`https://minotar.net/helm/${displayName}`} />
                                            </div>
                                        </div>
                                    </summary>
                                    <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 shadow-sm -translate-x-1/2">
                                        <li><button onClick={() => getAuth().signOut()}>Se deconnecter</button></li>
                                    </ul>
                                </details>
                                :
                                <a className="flex items-center text-2xl mc btn !text-white" href="/#login"><PiUser className="text-3xl" />Se connecter</a>
                            }
                        </div>
                    </div>
                </div>
            }
        </nav>
    )
}