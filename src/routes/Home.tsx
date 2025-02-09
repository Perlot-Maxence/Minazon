import { useEffect, useState } from "react";
import { PiArrowRight } from "react-icons/pi";
import { useAuth } from "../tools/useAuth";

export default function Home() {

    function renderRecentTrades(dataset: number) {
        // Trades exemples
        var recentTrades;

        if (dataset === 1)
            recentTrades = [
                { id: 1, timestamp: new Date().getTime(), seller: "Hitokii", buyer: "Syhix", quantity: [5, 2, 53], items: ["dirt", "diamond", "bread"] },
                { id: 1, timestamp: new Date().getTime(), seller: "Syhix", buyer: "herobrinex", quantity: [1, 2], items: ["dirt", "diamond"] },
                { id: 1, timestamp: new Date().getTime(), seller: "Outrxges", buyer: "Phonaxy", quantity: [64, 64], items: ["grass_block", "cobblestone"] },
                { id: 1, timestamp: new Date().getTime(), seller: "TheFantasio974", buyer: "BobLennon", quantity: [1], items: ["flint_and_steel"] },
            ]
        if (dataset === 2)
            recentTrades = [
                { id: 1, timestamp: new Date().getTime(), seller: "Bobby", buyer: "test", quantity: [1, 1, 1], items: ["diamond_sword", "diamond_chestplate", "shield"] },
                { id: 1, timestamp: new Date().getTime(), seller: "Alarm", buyer: "test", quantity: [1, 2], items: ["golden_apple", "book"] },
                { id: 1, timestamp: new Date().getTime(), seller: "Hitokii", buyer: "test", quantity: [1, 64], items: ["fox_spawn_egg", "sweet_berries"] },
            ]

        return recentTrades!.map((trade) => {
            return (
                <div className="border rounded flex flex-col gap-2 p-2 min-w-48">
                    <div className="flex gap-2 items-center">
                        <img src={`https://minotar.net/helm/${trade.seller}`} className="w-12 h-12 rounded-full" />
                        <PiArrowRight className="text-2xl" />
                        <img src={`https://minotar.net/helm/${trade.buyer}`} className="w-12 h-12 rounded-full" />
                    </div>
                    <div>
                        {trade.items.map((item, index) => {
                            return (
                                <div key={index} className="flex gap-2 items-center mc">
                                    <img src={`https://minecraft-api.vercel.app/images/items/${item}.png`} alt="" />
                                    <span>x{trade.quantity[index]}</span>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            )
        })
    }

    const { isLogged, displayName } = useAuth();

    const [welcome, setWelcome] = useState(false);

    useEffect(() => {
        if (isLogged) {
            setWelcome(true);
            setTimeout(() => {
                setWelcome(false);
            }, 2000);
        }
    }, [isLogged])

    return (
        <>
            <div className={`toast toast-top toast-center transition ${welcome ? "show" : "hidden"}`}>
                <div className="alert alert-success">
                    <span>Bonjour {displayName}!</span>
                </div>
            </div>
            <div className="grid grid-cols-1 grid-rows-3 p-4 h-dvh bg-[#00000060]">
                <div className="flex flex-col w-full p-0">
                    <h1 className=" text-emerald-400">recent trades</h1>
                    <div className="flex gap-2 overflow-auto w-full">
                        {renderRecentTrades(1)}
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <h1 className="mc">current trades</h1>
                    <div className="flex gap-2 overflow-auto w-full">
                        {renderRecentTrades(2)}
                    </div>
                </div>
                <div>test3</div>
                <div>test4</div>
            </div>
        </>
    )
}