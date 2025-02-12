import { useRouter } from "next/router"

export default function Add () {
    const router = useRouter()

    return (
        <div className="bg-grad from-[#00110A] to-[#000402] min-h-screen p-8 flex flex-col gap-4">
            <nav className="flex items-center">
                <button onClick={ () => router.back() }><svg xmlns="http://www.w3.org/2000/svg" className="size-8" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M400-240 160-480l241-241 43 42-169 169h526v60H275l168 168-43 42Z"/></svg></button>
            </nav>
            <div className="flex flex-col gap-4">
                <h1 className="font-bold text-white text-xl">Add storage units</h1>
                <input type="text" className="w-full bg-[#021B12] px-6 py-4 rounded-xl flex flex-col justify-between gap-2" />
                <button className="bg-x-green text-black p-3 rounded-full">Confirm</button>
                <p className="text-xs">Note:5 points can be exchanged for 1 storage unit</p>
            </div>
        </div>
    )
}