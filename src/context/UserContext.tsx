import { getUserInfo } from "@/api/api";
import { checkExpire, getToken } from "@/storage/token";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface UserContextType {
    userInfo: {
        invitedCode: string,
        points: number,
        referrals: number,
        space: number,
    },
    setPoints: (points: number) => void,
    setReferrals: (referrals: number) => void,
    setSpace: (space: number) => void,
    setUser: (userInfo: {
        invitedCode: string,
        points: number,
        referrals: number,
        space: number,
    }) => void,

    update: () => Promise<void>,
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserContextProviderProps {
    children: ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [userInfo, setUserInfo] = useState({
        invitedCode: "87ED",
        points: 0,
        referrals: 0,
        space: 0,
    });

    const update = async () => {
        try {
            if (checkExpire()) {
                throw new Error(`Login status has expired`);
            }
            const { accessToken } = await getToken();
            const user = await getUserInfo(accessToken);
            setUserInfo(user);
        } catch (error) {
            console.error("Failed to update user info:", error);
        }
    }

    const setPoints = (points: number) => {
        setUserInfo({
            invitedCode: userInfo.invitedCode,
            points: points,
            referrals: userInfo.referrals,
            space: userInfo.space
        });
    }

    const setReferrals = (referrals: number) => {
        setUserInfo({
            invitedCode: userInfo.invitedCode,
            points: userInfo.points,
            referrals: referrals,
            space: userInfo.space
        });
    }

    const setSpace = (space: number) => {
        setUserInfo({
            invitedCode: userInfo.invitedCode,
            points: userInfo.points,
            referrals: userInfo.referrals,
            space: space
        });
    }

    const setUser = (userInfo: {
        invitedCode: string,
        points: number,
        referrals: number,
        space: number,
    }) => {
        setUserInfo(userInfo)
    }

    useEffect(() => {
        update();

        const intervalId = setInterval(update, 60 * 60 * 1000);
        return () => clearInterval(intervalId);
    }, []);


    return (
        <UserContext.Provider value={{ userInfo, setPoints, setReferrals, setSpace, setUser, update }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be used within a UserContextProvider');
    }

    return context;
};