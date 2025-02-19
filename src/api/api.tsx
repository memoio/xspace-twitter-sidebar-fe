import { XSPACE_URL } from "@/config/config";
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

    console.log(response.status);
    console.log(response.data);

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }

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

    console.log(response.data);

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }

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