import { XSPACE_URL, DID_URL } from "@/config/config";
import axios from 'axios';

export async function challenge(address: string): Promise<string> {
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

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }
    console.log(response.data);

    return response.data;
}

export async function login(message: string, signature: string): Promise<{ accessToken: string, refreshToken: string }> {
    const response = await axios.post(
        XSPACE_URL.LOG_IN,
        {
            "message": message,
            "signature": signature
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }
    console.log(response.data);

    return {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken
    };
}

export async function refresh(refreshToken: string): Promise<string> {
    const response = await axios.post(
        XSPACE_URL.REFRESH,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`
            },
        }
    );

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }

    return response.data.accessToken;
}

export async function getUserInfo(accessToken: string): Promise<{ points: number, referrals: number, space: number, invitedCode: string }> {
    const response = await axios.get(
        XSPACE_URL.GET_USER_INFO,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    );

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }

    return {
        points: response.data.Points,
        referrals: response.data.Referrals,
        space: response.data.Space,
        invitedCode: response.data.InvitedCode,
    };
}

export async function getDIDInfo(address: string): Promise<{ did: string, number: string }> {
    console.log(address);
    const response = await axios.get(
        DID_URL.DID_INFO,
        {
            params: {
                address,
            },
        }
    );

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }
    console.log(response.data);

    return {
        did: response.data.did,
        number: response.data.number,
    };
}