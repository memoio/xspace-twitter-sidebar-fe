// import { XSPACE_URL } from "@/config/config";
import Image from "next/image";
import { useRouter } from "next/router";
// import axios from 'axios';
import { challenge, login } from "@/api/api";
import { setToken, checkExpire } from "@/storage/token";

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSignMessage } from 'wagmi';
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();

    const { isConnected, address } = useAccount();
    const { signMessageAsync } = useSignMessage();

    function sendStorageData(accessToken, refreshToken) {
        const data = {
            type: "tokenData",
            payload: {
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        };
        console.log("send data");
        window.parent.postMessage(data, '*'); // 发送给宿主页面
    };

    const Login = async () => {
        try {
            if (isConnected) {
                const message = await challenge(address);
                console.log(message);
                const signature = await signMessageAsync({ message: message });
                const { accessToken, refreshToken } = await login(message, signature);
                setToken(accessToken, refreshToken);

                sendStorageData(accessToken, refreshToken);
                router.push("/data-space");
            }
        } catch (e) {
            alert(e);
        }
    }

    useEffect(() => {
        if (checkExpire()) {
            Login();
        } else {
            router.push("/data-space");
        }
    }, [isConnected])

    return (
        <div className="w-full min-h-screen px-8 flex justify-center items-center bg-gradient-to-r from-[#00110A] to-[#000402]">

            <div className="rounded-2xl border-2 border-solid border-x-green px-8 py-12 w-full relative">
                <div className="bg-[#000A06] size-fit -top-[43px] inset-x-0 mx-auto absolute px-4">
                    <Image src={"/images/solar_wallet-broken.svg"} width={86} height={86} alt="" />
                </div>
                <h1 className="paytone-one text-3xl mt-4 text-center">Connect Your <span className="text-x-green">Wallet</span></h1>
                <p className=" text-center my-4">Connect your wallet to create your unique MEMO Identity</p>
                <ConnectButton.Custom>
                    {({
                        openConnectModal,
                        authenticationStatus,
                    }) => {
                        return (
                            <button onClick={() => {
                                openConnectModal();
                            }} className="bg-x-green p-2 rounded-full flex gap-2 w-fit mx-auto relative">
                                <Image src={"/images/clarity_arrow-line.svg"} width={25} height={25} alt="" />
                                Connect Wallet
                            </button>
                        )
                    }}
                </ConnectButton.Custom>

            </div>
        </div>
    )
}