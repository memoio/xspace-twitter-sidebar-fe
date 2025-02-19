export const DEV_DID_SERVER_URL = "https://didapi.memolabs.org/did"

export const Test_DID_SERVER_URL = "https://testdidapi.memolabs.org/did"

export const TEST_AIRDROP_BACKEND_URL = "https://apapitest.memoscan.org/api"

export const PRODUCT_AIRDROP_BACKEND_URL = "https://apapi.memoscan.org/api"

export const TEST_SXPACE_SERVER_URL = "https://test-xs-api.memolabs.net"

export const DEV_SXPACE_SERVER_URL = "https://xs-api.memolabs.net"

export const XSPACE_SERVER_URL = TEST_SXPACE_SERVER_URL


export const AIRDROP_BACKEND_URL = TEST_AIRDROP_BACKEND_URL
export const DID_SERVER_URL = Test_DID_SERVER_URL

export const API_URL = {
    "DID_CREATE": DID_SERVER_URL + "/create",
    "DID_CREATE_ADMIN": DID_SERVER_URL + "/createadmin",
    "DID_CREATE_ADMIN_TON": DID_SERVER_URL + "/ton/createadmin",
    "DID_INFO": DID_SERVER_URL + "/info",
    "DID_EXIST": DID_SERVER_URL + "/exist",
    "DID_CREATE_MSG": DID_SERVER_URL + "/createsigmsg",

    "AIRDROP_RECORD_ADD": AIRDROP_BACKEND_URL + "/record/add",
    "AIRDROP_USER_WALLET_BIND": AIRDROP_BACKEND_URL + "/user/bind",
    "AIRDROP_USER_INFO": AIRDROP_BACKEND_URL + "/user/info",
    "AIRDROP_POINTS_RANK": AIRDROP_BACKEND_URL + "/points/rank",//+
    "AIRDROP_INVITE_BIND": AIRDROP_BACKEND_URL + "/invite/bind",
    "AIRDROP_RECORD_LIST": AIRDROP_BACKEND_URL + "/record/list"//-
}

export const XSPACE_URL = {
    "CHALLENGE": XSPACE_SERVER_URL + "/v1/challenge",
    "LOG_IN": XSPACE_SERVER_URL + "/v1/login",
    "REFRESH": XSPACE_SERVER_URL + "/v1/refresh",

    "MINT_TWEET_NFT": XSPACE_SERVER_URL + "/v1/nft/tweet/mint",
    "MINT_DATA_NFT": XSPACE_SERVER_URL + "/v1/nft/data/mint"
}