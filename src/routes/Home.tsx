import { useEffect, useState } from "react";
import { PiArrowRight } from "react-icons/pi";
import { get10lastTrades, Trade } from "../classes/Trade";
import { Timestamp } from "firebase/firestore";

export default function Home() {


    // const { isLogged, displayName } = useAuth();
    const [lastTrades, setLastTrades] = useState<Trade[]>([]);
    const [welcome, setWelcome] = useState(false);

    useEffect(() => {
        get10lastTrades().then((trades) => {
            if (trades == null) return;
            setLastTrades(trades);
            trades.forEach((trade) => {
                console.log(trade.timestamp)
            })
        });
        setInterval(() => {
            get10lastTrades().then((trades) => {
                if (trades == null) return;
                setLastTrades(trades);
            });
        }, 10000);
    }, []);


    return (
        <>
            <div className="grid grid-cols-1 grid-rows-3 p-4 h-dvh bg-[#00000060]">
                <div className="flex flex-col w-full p-0">
                    <h1 className="mc text-emerald-400">recent trades</h1>
                    <div className="flex gap-2 overflow-auto w-full">
                        {lastTrades.length === 0 ? <div className="loading loading-spinner loading-lg"></div> : lastTrades.map((trade, index) => (
                            <div key={index} className="flex flex-col gap-2 p-2 min-w-52 bg-[#00000080] rounded-md">
                                <div className="flex gap-2 justify-between">
                                    <img src={`https://minotar.net/helm/${trade.seller.displayName}`} className="w-8 h-8" />
                                    <PiArrowRight className="text-3xl" />
                                    <img src={`https://minotar.net/helm/${trade.buyer.displayName}`} className="w-8 h-8" />
                                </div>
                                <div className="flex gap-2 justify-between">
                                    <p className="text-gray-400">{trade.seller.displayName}</p>
                                    <p className="text-gray-400">{trade.buyer.displayName}</p>
                                </div>
                                <div className="flex flex-col overflow-auto max-h-32 gap-2">
                                    {trade.items.map((item, index) => (
                                        <div key={index} className="flex gap-2">
                                            <img src={`https://minecraft-api.vercel.app/images/items/${item}.png`} className="w-8 h-8" />
                                            <div className="flex gap-1">
                                                <p className="text-gray-400">{item}</p>
                                                <p className="text-gray-400">x{trade.quantity[index]}</p>
                                            </div>
                                        </div>
                                    ))
                                    }
                                </div>
                                <p className="text-gray-400">à {trade.timestamp.toDate().toLocaleDateString("fr", { hour: "2-digit", minute: "2-digit" })}</p>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}