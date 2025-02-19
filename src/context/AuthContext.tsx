import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";


interface AuthContextType {
    accountAddress: string;
    isConnect: boolean;
    setIsconnect: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [accountAddress, setAccountAddress] = useState("-");
    const [isConnect, setIsconnect] = useState(false);
    const { address, isConnected } = useAccount();
    useEffect(() => {
        if (address) {
            setAccountAddress(address)
            setIsconnect(true)
            console.log("accountAddress:", accountAddress)
        }
    }, [address]);

    useEffect(() => {
        if (!isConnect) {
            setAccountAddress("-")
        }
    }, [isConnect])

    useEffect(() => {
        if (isConnected) {
            setIsconnect(true)
        }
    }, [isConnected])

    return (
        <AuthContext.Provider value={{ accountAddress, isConnect, setIsconnect }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useWallet must be used within a AuthContextProvider');
    }

    return context;
};