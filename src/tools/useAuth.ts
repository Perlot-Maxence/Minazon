import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../tools/firebase";
import { getDisplayName } from "../tools/firebaseLogin";


// custom hook pour récupérer facilement le pseudo et l'état de connexion
export function useAuth() {
    const [isLogged, setIsLogged] = useState(false);
    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLogged(true);
                getDisplayName(user.uid).then((name) => {
                    if (name) {
                        setDisplayName(name);
                    }
                });
            } else {
                setIsLogged(false);
                setDisplayName("");
            }
        });

        return () => unsubscribe();
    }, []);

    return { isLogged, displayName };
}