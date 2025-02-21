import { jwtDecode } from 'jwt-decode';
import { refresh } from '@/api/api'

const REFRESH_THRESHOLD = 0;

export function setToken(accessToken: string, refreshToken: string) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
}

export async function getToken(): Promise<{ accessToken: string, refreshToken: string } | null> {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (isTokenExpire(accessToken, REFRESH_THRESHOLD)) {
        if (isTokenExpire(refreshToken, 0)) {
            const newAccessToken = await refresh(refreshToken);
            localStorage.setItem("accessToken", newAccessToken);
            return {
                accessToken: newAccessToken,
                refreshToken: refreshToken
            };
        } else {
            localStorage.clear();
            return null;
        }
    }

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    };
}

export function clear() {
    localStorage.clear();
}

export function checkExpire(): boolean {
    const refreshToken = localStorage.getItem("refreshToken");
    return refreshToken ? isTokenExpire(refreshToken, 0) : true;
}

function isTokenExpire(token: string, threshold: number): boolean {
    const payload = jwtDecode(token);
    if ((payload.exp - threshold) * 1000 > Date.now()) {
        return false;
    }
    return true;
}