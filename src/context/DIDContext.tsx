import { getDIDInfo } from "@/api/api";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface DIDContextType {
    didInfo: {
        did: string,
        number: string,
    },
};

const DIDContext = createContext<DIDContextType | undefined>(undefined);

interface DIDContextProviderProps {
    children: ReactNode;
}

export const DIDContextProvider = ({ children }: DIDContextProviderProps) => {
    const [didInfo, setDIDInfo] = useState({
        did: "",
        number: "",
    });
    const { address, isConnected } = useAccount();

    const updateDIDInfo = async () => {
        if (address) {
            try {
                const { did, number } = await getDIDInfo(address);
                setDIDInfo({
                    did: did,
                    number: number,
                });
            } catch (e: any) {
                alert(e);
            }
        }
    }

    useEffect(() => {
        updateDIDInfo();
    }, [address]);

    return (
        <DIDContext.Provider value={{ didInfo }}>
            {children}
        </DIDContext.Provider>
    );
}

export const useDid = (): DIDContextType => {
    const context = useContext(DIDContext);

    if (!context) {
        throw new Error('useDid must be used within a DIDContextProvider');
    }

    return context;
};