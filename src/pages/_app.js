import "@/styles/reset.css";
import "@/styles/globals.css";
import "@/styles/style.css";

import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { RainbowKitProvider, getDefaultConfig, darkTheme, connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
    metaMaskWallet,
    injectedWallet,
    coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';

import { mainnet } from "wagmi/chains";
import { SessionProvider } from "next-auth/react";
import "@rainbow-me/rainbowkit/styles.css";
import { AuthContextProvider } from "@/context/AuthContext";


const connectors = connectorsForWallets(
    [
        {
            groupName: 'Recommended',
            wallets: [metaMaskWallet, injectedWallet, coinbaseWallet],
        },
    ],
    {
        appName: 'Droppod',
        projectId: '5fd8403601f35f35b33ad4b1dfe61b65',
    }
);

export default function App({ Component, pageProps }) {
    const config = getDefaultConfig({
        connectors,
        appName: 'Droppod',
        projectId: '5fd8403601f35f35b33ad4b1dfe61b65',
        chains: [mainnet],
        ssr: true, // If your dApp uses server side rendering (SSR)
        autoConnect: true,
    });

    const queryClient = new QueryClient();

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <SessionProvider session={pageProps.session} refetchInterval={0}>
                    <RainbowKitProvider locale="en-US" modalSize="compact" theme={darkTheme()}>
                        <AuthContextProvider>
                            <Component {...pageProps} />
                        </AuthContextProvider>
                    </RainbowKitProvider>
                </SessionProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}