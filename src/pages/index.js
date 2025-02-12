import { XSPACE_URL } from "@/config/config";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from 'axios';
import { useEffect, useState } from "react";

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSignMessage, useAccountEffect, useDisconnect } from 'wagmi'
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
    const router = useRouter();

    const { isConnected, address } = useAccount();
    const { data: session, status } = useSession()
    const { signMessageAsync } = useSignMessage();
    const { data: signMessageData, error, isLoading, signMessage, variables } = useSignMessage()

    const [challenge, setChallenge] = useState(null)
    const [signature, setSignature] = useState(null)

    /**
     * Check if account exists before creating and signing
     * Add next auth
     */

    // const buttonConnectFunc = async () => {
    //     //Perform button activity
    //     router.push('/data-space')

    //     const request = await fetch(API_URL.DID_CREATE, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ sig: '0xF73A2f5E6a56C9f1e6b78137f59b1f9FCA3b0e63', address: '0xF73A2f5E6a56C9f1e6b78137f59b1f9FCA3b0e63' }),
    //     })
    // }

    // const fetchToken = async () => {
    //     const request = await fetch(API_URL.DID_CREATE_MSG + '?' + new URLSearchParams({ address: address }), {
    //         method: "GET",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });


    //     const response = await request.json()
    //     setChallenge(response.msg)
    // }

    const Login = async () => {
        try {
            if (isConnected) {
                // const response = await fetch(XSPACE_URL.CHALLENGE + '?' + new URLSearchParams({ address: address }), {
                //     method: "GET",
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Origin': 'https://xspace.com'
                //     }
                // })

                const response = await axios.get(
                    XSPACE_URL.CHALLENGE,
                    {
                        params: {
                            address,
                        },
                        headers: {
                            'Content-Type': 'application/json',
                            'Origin': 'https://xspace.com'
                        }
                    }
                );

                if (response.status == 200) {
                    const message = response.data
                    console.log(message)
                    const signature = await signMessageAsync({ message: message })

                    const logResponse = await axios.post(
                        XSPACE_URL.LOG_IN,
                        {
                            "message": message,
                            "signature": signature
                        },
                        {
                            params: {
                                address,
                            },
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );

                    const token = logResponse.data.accessToken
                    if (logResponse.status == 200) {
                        await signIn("credentials", {
                            redirect: false, // Set to true if you want to redirect after sign-in
                            token, // Pass the identifier to your provider
                        });
                        window.location.replace('/data-space')
                    }
                }
            } else {
                alert("please connect wallet first!")
            }
        } catch (e) {
            alert(e)
        }
    }

    // useEffect(() => {
    //     if (isConnected && status == "authenticated") {
    //         window.location.replace('/data-space')
    //     } if (isConnected && status == "unauthenticated") {
    //         Login()
    //     }
    // }, [isConnected, status, router])


    // useEffect(() => {
    //     const signTx = async (challenge) => {
    //         await signMessage({ message: challenge })
    //         await setSignature(signMessageData)
    //     }

    //     if (address && isConnected && status == "unauthenticated" && signature === null && challenge !== null) {
    //         signTx(challenge)
    //     }
    // }, [challenge])//, isConnected, signature, status, address, signMessage, signMessageData])

    // useEffect(() => {
    //     const createAPi = async () => {
    //         const request = await fetch(API_URL.DID_CREATE, {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ address: address, sig: signMessageData })
    //         });

    //         const response = await request.json()
    //         console.log(response)

    //         const token = response.did
    //         if (response.did) {
    //             console.log('Session Key: ', response.did)
    //             await signIn("credentials", {
    //                 redirect: false, // Set to true if you want to redirect after sign-in
    //                 token // Pass the identifier to your provider
    //             });
    //         }
    //         if ('did' in response) {
    //             //router.push('/data-space')
    //         }
    //     }

    //     if (signMessageData !== undefined) {
    //         console.log("[*] == ", signMessageData)
    //         createAPi()
    //     }
    // }, [signMessageData])

    return (
        <div className="w-full min-h-screen px-8 flex justify-center items-center bg-gradient-to-r from-[#00110A] to-[#000402]">

            <div className="rounded-2xl border-2 border-solid border-x-green px-8 py-12 w-full relative">
                <div className="bg-[#000A06] size-fit -top-[43px] inset-x-0 mx-auto absolute px-4">
                    <Image src={"/images/solar_wallet-broken.svg"} width={86} height={86} alt="" />
                </div>
                <h1 className="paytone-one text-3xl mt-4 text-center">Connect Your <span className="text-x-green">Wallet {signature}</span></h1>
                <p className=" text-center my-4">Connect your wallet to create your unique MEMO Identity</p>
                <ConnectButton.Custom>
                    {({
                        account,
                        chain,
                        openAccountModal,
                        openChainModal,
                        openConnectModal,
                        authenticationStatus,
                        mounted,
                    }) => {
                        return (
                            <button onClick={() => {
                                if (status == "authenticated") {
                                    signOut();
                                }
                                openConnectModal();
                                Login();
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