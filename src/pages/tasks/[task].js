import { useRouter } from "next/router"

export default function RandomMemo () {
    const router = useRouter()

    return (
        <div className="bg-grad from-[#00110A] to-[#000402] min-h-screen p-8 flex flex-col gap-4">
            <nav className="flex items-center">
                <button onClick={ () => router.back() }><svg xmlns="http://www.w3.org/2000/svg" className="size-8" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M400-240 160-480l241-241 43 42-169 169h526v60H275l168 168-43 42Z"/></svg></button>
            </nav>
            <div className="flex flex-col gap-4">
                <h1 className="font-bold text-white text-xl">Random MEMO</h1>
                <div className="w-full bg-[#021B12] p-6 rounded-xl flex flex-col justify-between gap-2">
                    <div className="flex gap-4">
                        <p className="bg-x-green size-6 min-h-6 min-w-6 flex items-center justify-center rounded-full text-sm text-black relative before:w-0.5 before:h-[200%] before:left-2.5 before:bg-x-green before:absolute before:top-8">1</p>
                        <p className="text-white">Open the post, tap on &apos;MEMO&apos; button or reply with &apos;@MemoLabsOrg&apos; </p>
                    </div>
                    <div className="h-4 w-0.5 bg-x-green relative left-2.5"></div>
                    <div className="flex gap-4">
                        <p className="bg-x-green size-6 min-h-6 min-w-6 flex items-center justify-center rounded-full text-sm text-black relative z-10 after:w-0.5 after:h-2 after:absolute after:-top-2 after:left-2.5 after:bg-[#021B12] before:w-0.5 before:h-[200%] before:left-2.5 before:bg-x-green before:absolute before:top-8">2</p>
                        <p className="text-white">Once your MEMO tweet successfully generates NFT and stores it in the space, you will be notified</p>
                    </div>
                    <div className="h-4 w-0.5 bg-x-green relative left-2.5"></div>
                    <div className="flex gap-4">
                        <p className="bg-x-green size-6 min-h-6 min-w-6 flex items-center justify-center rounded-full text-sm text-black relative after:w-0.5 after:h-2 after:absolute after:-top-2 after:left-2.5 after:bg-[#021B12]">3</p>
                        <p className="text-white">Each MEMO tweet reply will earn 15 Points!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}