import Link from "next/link"
import { useRouter } from "next/router"
import { useRef, useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { useConnectModal } from "@rainbow-me/rainbowkit"

export default function DataSpace() {
    const router = useRouter()

    const menu = useRef(null)
    const dataSpaceButton = useRef(null)
    const taskButton = useRef(null)
    const checkInButton = useRef(null)

    const dataSpace = useRef(null)
    const task = useRef(null)
    const [isCheckedIn, setIsCheckedIn] = useState(false)
    const [time, setTime] = useState(null); // State to store time left
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const { accountAddress, setIsconnect } = useAuth();

    useEffect(() => {
        if (time === null) return; // Exit if time hasn't been fetched yet

        const interval = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(interval); // Clear interval if time reaches 0
                    return 0;
                }
                return prevTime - 1; // Decrement time by 1 second
            });
        }, 1000);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [time]);

    useEffect(() => {
        if (time === null) return;

        if (time !== null) {
            const hours = time / 3600
            const minutes = (hours - parseInt(hours)) * 60
            const seconds = (minutes - parseInt(minutes)) * 60


            setHours(parseInt(hours));
            setMinutes(parseInt(minutes));
            setSeconds(parseInt(seconds));
        }
    }, [time]);

    const toggleSection = () => {
        dataSpaceButton.current.classList.toggle('border-b-2')
        dataSpaceButton.current.classList.toggle('border-b-0')
        dataSpaceButton.current.classList.toggle('text-x-green')
        dataSpaceButton.current.classList.toggle('text-white')

        taskButton.current.classList.toggle('border-b-2')
        taskButton.current.classList.toggle('border-b-0')
        taskButton.current.classList.toggle('text-x-green')
        taskButton.current.classList.toggle('text-white')

        dataSpace.current.classList.toggle('flex')
        dataSpace.current.classList.toggle('hidden')
        task.current.classList.toggle('flex')
        task.current.classList.toggle('hidden')
    }

    const toggleCheckIn = () => {
        setTime(18000)//parseInt(response[1]) - Math.floor(Date.now() / 1000))

        checkInButton.current.classList.toggle('bg-x-green')
        checkInButton.current.classList.toggle('bg-x-green/20')
        setIsCheckedIn(true)
    }

    return (
        <div className="p-8 flex flex-col gap-4 min-h-screen bg-gradient-to-r from-[#00110A] to-[#000402]">
            <div className="flex justify-between items-center">
                <h1 className="paytone-one text-3xl">XSpace</h1>
            </div>
            <div className="w-full bg-[#021B12] p-4 rounded-xl font-bold grid grid-cols-2 items-center">

                <p className="truncat">
                    {accountAddress}
                </p>
                <p className="flex justify-end cursor-pointer">
                    <img src="/back.png"
                        className="w-8 h-8"
                        onClick={() => { setIsconnect(false) }}
                    ></img>
                </p>
            </div>


            <div className="w-full bg-[#021B12] p-4 rounded-xl font-bold">
                <div className="grid grid-cols-2">
                    <p className="border-r border-solid border-white/15 font-bold text-sm py-2">Total Points</p>
                    <p className="border-l border-solid border-white/15 font-bold text-sm py-2 text-right">Total Referrals</p>
                </div>
                <div className="grid grid-cols-2">
                    <p className="font-bold text-sm py-2 text-x-green">-</p>
                    <p className="font-bold text-sm py-2 text-x-green text-right">-</p>
                </div>
            </div>

            <div className="w-full bg-[#021B12] p-4 rounded-xl flex flex-col gap-2">
                <h2 className="font-bold">Data DID</h2>
                <p className="inter">You can participate in earning points only after successfully creating a DID.</p>
                <button className="bg-x-green px-4 py-2 rounded-full text-black text-xs w-fit"
                    onClick={() => {
                        window.location.href = 'https://data.memolabs.org/';
                    }}>Create DID</button>
            </div>

            <div className="mt-4 flex flex-col gap-4">
                <div ref={menu} className="flex gap-4">
                    <button ref={dataSpaceButton} onClick={toggleSection} className="px-2 pb-1 border-b-2 border-solid border-x-green text-x-green text-sm">Data Space</button>
                    <button ref={taskButton} onClick={toggleSection} className="px-2 pb-1 border-b-0 border-solid border-x-green text-sm text-white">Task</button>
                </div>

                <div ref={dataSpace} className="flex flex-col gap-4">
                    <div className="w-full bg-[#021B12] p-6 rounded-xl flex items-center justify-between gap-2">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-white text-lg font-bold">Storage Units</h2>
                            <p className="text-x-green text-xs">994 storage units left</p>
                        </div>
                        <Link href={"/add"} className="rounded-full px-4 py-1.5 text-sm bg-x-green text-black">+Add</Link>
                    </div>

                    <div className="w-full bg-[#021B12] p-6 rounded-xl flex flex-col justify-between gap-2">
                        <div className="flex gap-4">
                            <p className="bg-x-green size-6 flex items-center justify-center rounded-full text-sm text-black">1</p>
                            <p className="text-white">Post or reply to a tweet</p>
                        </div>
                        <div className="h-4 w-0.5 bg-x-green relative left-2.5"></div>
                        <div className="flex gap-4">
                            <p className="bg-x-green size-6 flex items-center justify-center rounded-full text-sm text-black">2</p>
                            <p className="text-white">Post or reply to a tweet</p>
                        </div>
                        <div className="h-4 w-0.5 bg-x-green relative left-2.5"></div>
                        <div className="flex gap-4">
                            <p className="bg-x-green size-6 min-h-6 min-w-6 flex items-center justify-center rounded-full text-sm text-black">3</p>
                            <p className="text-white">The generated NFT will be presented in Data NFT</p>
                        </div>
                    </div>
                </div>

                <div ref={task} className="hidden flex-col gap-4">
                    <div className="w-full bg-[#021B12] p-6 rounded-xl flex items-center justify-between gap-2">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-white text-lg font-bold">Check In</h2>
                            <p className="text-xs">Continuous sign-in will earn extra points.</p>
                            {isCheckedIn ? <p className="text-xs text-x-green flex gap-2 items-center"><svg xmlns="http://www.w3.org/2000/svg" className="size-4" height="48px" viewBox="0 -960 960 960" width="48px" fill="#05f292"><path d="M479-82q-74 0-139.5-28t-114-76.5q-48.5-48.5-77-114T120-440.73q0-74.74 28.5-140Q177-646 225.5-695t114-77Q405-800 479-800t139.5 28Q684-744 733-695t77 114.27q28 65.26 28 140 0 74.73-28 140.23-28 65.5-77 114T618.5-110Q553-82 479-82Zm0-357Zm121 161 42-42-130-130v-190h-60v214l148 148ZM214-867l42 42L92-667l-42-42 164-158Zm530 0 164 158-42 42-164-158 42-42ZM479.04-142Q604-142 691-229.04q87-87.05 87-212Q778-566 690.96-653q-87.05-87-212-87Q354-740 267-652.96q-87 87.05-87 212Q180-316 267.04-229q87.05 87 212 87Z" /></svg> {hours}h: {minutes}min: {seconds}s</p> : null}
                        </div>
                        <button ref={checkInButton} onClick={toggleCheckIn} className="rounded-full px-4 py-1.5 text-sm bg-x-green text-black w-fit text-nowrap">Check In</button>
                    </div>
                    <div className="w-full bg-[#021B12] p-6 rounded-xl flex items-center justify-between gap-2">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-white text-lg font-bold">Refer Your Friends</h2>
                            <p className="text-xs">Invite Friends To Earn More Points.</p>
                        </div>
                        <Link href={"/tasks/random-memo"} className="rounded-full px-4 py-1.5 text-sm bg-x-green text-black w-fit text-nowrap">Go</Link>
                    </div>
                    <div className="w-full bg-[#021B12] p-6 rounded-xl flex items-center justify-between gap-2">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-white text-lg font-bold">Community Tasks</h2>
                            <p className="text-xs">Complete tasks & receive points rewards.</p>
                        </div>
                        <Link href={"/tasks/random-memo"} className="rounded-full px-4 py-1.5 text-sm bg-x-green text-black w-fit text-nowrap">Go</Link>
                    </div>
                    <div className="w-full bg-[#021B12] p-6 rounded-xl flex items-center justify-between gap-2">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-white text-lg font-bold">Random Memo</h2>
                            <p className="text-xs">Store tweets & earn points Rewards.</p>
                        </div>
                        <Link href={"/tasks/random-memo"} className="rounded-full px-4 py-1.5 text-sm bg-x-green text-black w-fit text-nowrap">Go</Link>
                    </div>
                </div>
            </div>
        </div >
    )
}