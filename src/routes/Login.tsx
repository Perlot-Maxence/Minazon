import { getAuth } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { PiGithubLogo, PiGoogleLogo } from "react-icons/pi";
import { db } from "../tools/firebase";
import { checkIfUserExists, signInWithGithub, signInWithGoogle } from "../tools/firebaseLogin";

export default function Login() {
    const [modal, setModal] = useState(false);
    const [query, setQuery] = useState("");
    const [displayName, setDisplayName] = useState("");

    // créer un delay pour éviter les appels trop fréquents
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setDisplayName(query);
        }, 500);
        return () => clearTimeout(timeOutId);
    }, [query])

    // connection avec github
    const handleGitHub = () => {
        signInWithGithub().then((result) => {
            checkIfUserExists(result.user.uid).then((exists) => {
                if (!exists) setModal(true)
                else window.location.href = "/";

            })
        }).catch((error) => {
            console.log(error);
        });
    }

    // verifie que le compte existe dans la bdd pour variables spéciales
    const validateAccount = async (displayName: string) => {
        setModal(false);

        const newUser = {
            id: getAuth().currentUser?.uid as string,
            created_at: new Date().toISOString(),
            displayName: displayName,
        }
        // add user to firestore database "users" collection
        const usersCollection = collection(db, "users");
        await setDoc(doc(usersCollection, newUser.id), newUser);
    }


    return (
        <div className="m-auto border-2 border-gray-300 rounded-lg p-4 bg-[#00000040] shadow-2xl w-96 h-64">
            <dialog id="my_modal_1" className={`modal modal-${modal ? "open" : "close"}`}>
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Bonjour!</h3>
                    <p className="py-4">Votre compte n'est pas encore relié à minazon!<br />
                        merci d'entrer votre pseudo minecraft pour vous identifier plus facilement!
                    </p>
                    <div className="border-4 border-dashed w-28 mx-auto rounded-full h-28">
                        <img src={`https://minotar.net/helm/${displayName}`} className={`rounded-full ${displayName == "" ? "hidden" : "block"} `} />
                    </div>
                    <input type="text" placeholder="Pseudo Minecraft" className="input input-primary w-full mt-4" onChange={(e) => setQuery(e.target.value)} />

                    <div className="modal-action">
                        <button className="btn btn-soft btn-success" onClick={() => validateAccount(displayName)}>C'est moi!</button>
                    </div>
                </div>
            </dialog>


            <h1 className="mc !text-3xl underline text-center">Login</h1>
            <div className="flex flex-col gap-2 mt-4">
                <button onClick={() => signInWithGoogle()} className="flex mc items-center gap-2"><PiGoogleLogo /> Login with Microsoft</button>
                <button onClick={() => handleGitHub()} className="flex mc items-center gap-2"><PiGithubLogo /> Login with Github</button>
            </div>
        </div>
    )
}