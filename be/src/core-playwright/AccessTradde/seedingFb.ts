import { chromium } from "playwright-core";
import { configCookie } from "../../utils/configCookie";
import { scrollFunc } from "../../utils/scrollFunc";

export interface ICookie  {
    domain: string,
    expirationDate: string,
    hostOnly: string,
    httpOnly: string,
    name: string,
    path:string,
    sameSite: string,
    secure: string,
    session: string,
    storeId: string,
    value: string

};
const cookie2 = [
    {
        "domain": ".google.com",
        "expirationDate": 1706198209.584558,
        "hostOnly": false,
        "httpOnly": true,
        "name": "TAID",
        "path": "/ads/measurement",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "AJHaeXK33AtDEZv6gFJyBtbGch7mUL_2sjPI3331BnZ8FHtXPunTno_3Er88feoXHwB-z4lwcYL7Ve0xz7_RWiGJIuyfOKy8ebFFrDiXt139MCby3wDx-4g7FysagiRpdhXgSXyGbQ"
    },
    {
        "domain": "mail-ads.google.com",
        "expirationDate": 1705768347.560173,
        "hostOnly": true,
        "httpOnly": true,
        "name": "COMPASS",
        "path": "/mail/u/0",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "gmail=CsQBAAlriVc01xyZ2clzpCQGss9gZDhS7yOxs2XUf2Al34pj49P6uJMJsgJ2IKbSxrRWXNLSVxHB67oz-aoghp3-H_j862qcW22by7GC1K1zyzBGkcU4v-Cc5_UazwGSDvprcgrAiooQubxD01j6vai6xD4M4KkObY7ak7iF0vrWvi7MsJfBZ2qmlPsyQyxZRMkeXjGwhqKq5e2qas3fxwK_MuysdvfeCAmjXE_wFBx6uOUf3-fO0tSVTlWBGOo1eh5GDyBlURDlqfusBhr9AQAJa4lXCu4BiI5WBsHB8hBN99ynbU41tm_32qvV3xuxdk5bJPKVpQ8vhjyRhyVhg_Cw_UDzVVbvZaj1n8HAr06R-bjLJTBQd2Lv-jEyNT0_TfhtNloyhl5jTYQ8QM5cZk72S_d3duIhez4jh2rpgogzYmGJMSRhkmBufEdgfAvluv1MYu44cgKeN3kJby9ymoyU4Wb8Zc2azjF5-muZl2BGR5W9hLI14biDg20weD-phfkGlxt6txh1RdBspwavOE6kyvaMzPUpebLwWdSuLAMuGZF0WEkSisoZJqUEug4HeGWBs3tu-Tky9LiXA1jkVCQ53Z0HsiwvAtAHFKgwAQ"
    },
    {
        "domain": "mail.google.com",
        "expirationDate": 1705768353.672235,
        "hostOnly": true,
        "httpOnly": true,
        "name": "COMPASS",
        "path": "/mail/u/0",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "gmail=CsQBAAlriVc01xyZ2clzpCQGss9gZDhS7yOxs2XUf2Al34pj49P6uJMJsgJ2IKbSxrRWXNLSVxHB67oz-aoghp3-H_j862qcW22by7GC1K1zyzBGkcU4v-Cc5_UazwGSDvprcgrAiooQubxD01j6vai6xD4M4KkObY7ak7iF0vrWvi7MsJfBZ2qmlPsyQyxZRMkeXjGwhqKq5e2qas3fxwK_MuysdvfeCAmjXE_wFBx6uOUf3-fO0tSVTlWBGOo1eh5GDyBlURDUjPusBhr9AQAJa4lXCu4BiI5WBsHB8hBN99ynbU41tm_32qvV3xuxdk5bJPKVpQ8vhjyRhyVhg_Cw_UDzVVbvZaj1n8HAr06R-bjLJTBQd2Lv-jEyNT0_TfhtNloyhl5jTYQ8QM5cZk72S_d3duIhez4jh2rpgogzYmGJMSRhkmBufEdgfAvluv1MYu44cgKeN3kJby9ymoyU4Wb8Zc2azjF5-muZl2BGR5W9hLI14biDg20weD-phfkGlxt6txh1RdBspwavOE6kyvaMzPUpebLwWdSuLAMuGZF0WEkSisoZJqUEug4HeGWBs3tu-Tky9LiXA1jkVCQ53Z0HsiwvAtAHFKgwAQ:gmail_ps=CrEBAAlriVeqZ2DL4aSq5KpcV6hDSmMfCh0fhz6AscdczzMyJk_RqUU3tXnITt3wc6foLlCKFbU6Y9R7jF9rjnBsyO2IhSvNqQ_SfVNzUn_uOWGpgpCGzSjkBJejMUsXcFl6bBHerOvvTIj_Ict6q-3WGk5gTCqZvzeHSXehpa0vYDVe5nkP9afcPzln-clqY3ZXeflFOuZ5qs1PBL6G_IJWYKnwbwID-9rrjCgpW6oBIRNLEKOp-6wGGuoBAAlriVdGHLC-ZR8yILcBkOLMxFp48l1719HqBOXNVX1t5T2sfg67ADJfhibSUnkelP1eev4DqrPvu8e_FPmqODojC_yOOnnBrem26ndbvn68PLyyt7IYVVs3B9eDeWu1t_6gH7gQXIV4lfOmAen4KExQO62kyKkyEp69OX6MznSQzqiImmt4f_8CPfNu1V7xmUChagawVdYE19owkegaX-LdeE60p7YHb7OgR7P2m_NKqXbgnuDp0huNUUFmAbqCloM74-PqNTnmHNHG8SMZqQHnwni332wXWErcyr_dHnJ6oMyhNscBjEUAMAE"
    },
    {
        "domain": "mail.google.com",
        "expirationDate": 1705768864.880335,
        "hostOnly": true,
        "httpOnly": true,
        "name": "COMPASS",
        "path": "/sync/u/0",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "bigtop-sync=CsEBAAlriVcVgUu_IEj-uGabxCOnhMS-eRml7f_VaHaey6Rtp-_8le9ho_hn1HW5q-c_kI7reqleN2uU-J_Wd84S1XCg8_yQ9eJNY70l_nqyLLLeTyHoxSKXPvinfRSrtOTIT_5OTXZqpotCoiDEOgU5fJIHIeJ-j07e-L2rUGCmlT23fF65VfcXWh8pyh0bDkQVo8DszqnJTnlJrLPZF9r-_7MVxoH_SijA4FQCQEDfTRPu1GRD0dqW0dCS8g5yBX-7LBC6rfusBhr6AQAJa4lXPDHsLfNXYXfQuERPs5nmD9F673o6vCO2G02GRt-BiouTRy27MOMCWxthiKO0pXJHp64JIRg6f8H59Wvlb1HhEHvpxXgqLNAVYFKsyYGwGqH815VfTPGGqFAnNYsXWLKXxFsJt3vyeN8gJvmKUVTJYWGNoPY2JAgGmW6QSQ0r0wuaUegjVaoeYeHDFTNhQCvUJcfgRM3grR6dcEflZG2LvGMsqLnQLYzIIFGI6kqoCsXe9IPKVXJiDywRAADiENE6yTRjfOFOCXeX-r3ABzbf1R6I9bXgAA6h28DJiuISkxkZ3oBZHPhPpwVzpPi5IYPGZGQz7AswAQ"
    },
    {
        "domain": ".google.com",
        "expirationDate": 1720713438.005151,
        "hostOnly": false,
        "httpOnly": true,
        "name": "SNID",
        "path": "/verify",
        "sameSite": "lax",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "ACX8J6NOLWXQGbY0oADpUuSZ4NxpaEGW6brshHgMK-J0037wCPK9AU-hST2bPyHSdyRWG7vBSuzCPRjNt99W9AknwwP6a1Ri3ow"
    },
    {
        "domain": "mail.google.com",
        "expirationDate": 1705764757.610821,
        "hostOnly": true,
        "httpOnly": true,
        "name": "COMPASS",
        "path": "/mail",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "gmail=CsQBAAlriVc01xyZ2clzpCQGss9gZDhS7yOxs2XUf2Al34pj49P6uJMJsgJ2IKbSxrRWXNLSVxHB67oz-aoghp3-H_j862qcW22by7GC1K1zyzBGkcU4v-Cc5_UazwGSDvprcgrAiooQubxD01j6vai6xD4M4KkObY7ak7iF0vrWvi7MsJfBZ2qmlPsyQyxZRMkeXjGwhqKq5e2qas3fxwK_MuysdvfeCAmjXE_wFBx6uOUf3-fO0tSVTlWBGOo1eh5GDyBlURD_jPusBhr9AQAJa4lXCu4BiI5WBsHB8hBN99ynbU41tm_32qvV3xuxdk5bJPKVpQ8vhjyRhyVhg_Cw_UDzVVbvZaj1n8HAr06R-bjLJTBQd2Lv-jEyNT0_TfhtNloyhl5jTYQ8QM5cZk72S_d3duIhez4jh2rpgogzYmGJMSRhkmBufEdgfAvluv1MYu44cgKeN3kJby9ymoyU4Wb8Zc2azjF5-muZl2BGR5W9hLI14biDg20weD-phfkGlxt6txh1RdBspwavOE6kyvaMzPUpebLwWdSuLAMuGZF0WEkSisoZJqUEug4HeGWBs3tu-Tky9LiXA1jkVCQ53Z0HsiwvAtAHFKgwAQ:gmail_ps=CrEBAAlriVeqZ2DL4aSq5KpcV6hDSmMfCh0fhz6AscdczzMyJk_RqUU3tXnITt3wc6foLlCKFbU6Y9R7jF9rjnBsyO2IhSvNqQ_SfVNzUn_uOWGpgpCGzSjkBJejMUsXcFl6bBHerOvvTIj_Ict6q-3WGk5gTCqZvzeHSXehpa0vYDVe5nkP9afcPzln-clqY3ZXeflFOuZ5qs1PBL6G_IJWYKnwbwID-9rrjCgpW6oBIRNLEIKN-6wGGuoBAAlriVdGHLC-ZR8yILcBkOLMxFp48l1719HqBOXNVX1t5T2sfg67ADJfhibSUnkelP1eev4DqrPvu8e_FPmqODojC_yOOnnBrem26ndbvn68PLyyt7IYVVs3B9eDeWu1t_6gH7gQXIV4lfOmAen4KExQO62kyKkyEp69OX6MznSQzqiImmt4f_8CPfNu1V7xmUChagawVdYE19owkegaX-LdeE60p7YHb7OgR7P2m_NKqXbgnuDp0huNUUFmAbqCloM74-PqNTnmHNHG8SMZqQHnwni332wXWErcyr_dHnJ6oMyhNscBjEUAMAE"
    },
    {
        "domain": ".google.com",
        "expirationDate": 1738656000.584728,
        "hostOnly": false,
        "httpOnly": true,
        "name": "AID",
        "path": "/ads",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "AJHaeXItIz97cRHBERaN3NkAB4wnaps7jrQIPVt6Qu4rAdd1DJrGpYiibfY"
    },
    {
        "domain": "accounts.google.com",
        "expirationDate": 1707492637,
        "hostOnly": true,
        "httpOnly": false,
        "name": "OTZ",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "7376611_28_28__28_"
    },
    {
        "domain": "myaccount.google.com",
        "expirationDate": 1707492673,
        "hostOnly": true,
        "httpOnly": false,
        "name": "OTZ",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "7376611_28_28__28_"
    },
    {
        "domain": "www.google.com",
        "expirationDate": 1707492675,
        "hostOnly": true,
        "httpOnly": false,
        "name": "OTZ",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "7376611_28_28__28_"
    },
    {
        "domain": "ogs.google.com",
        "expirationDate": 1707492678,
        "hostOnly": true,
        "httpOnly": false,
        "name": "OTZ",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "7376611_28_28__28_"
    },
    {
        "domain": "mail.google.com",
        "expirationDate": 1707492734.377462,
        "hostOnly": true,
        "httpOnly": true,
        "name": "__Host-GMAIL_SCH_GMN",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "1"
    },
    {
        "domain": "mail.google.com",
        "expirationDate": 1707492734.377532,
        "hostOnly": true,
        "httpOnly": true,
        "name": "__Host-GMAIL_SCH_GMS",
        "path": "/",
        "sameSite": "strict",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "1"
    },
    {
        "domain": "mail.google.com",
        "expirationDate": 1707492734.377578,
        "hostOnly": true,
        "httpOnly": true,
        "name": "__Host-GMAIL_SCH_GML",
        "path": "/",
        "sameSite": "lax",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "1"
    },
    {
        "domain": ".google.com",
        "expirationDate": 1720452737.096689,
        "hostOnly": false,
        "httpOnly": false,
        "name": "SEARCH_SAMESITE",
        "path": "/",
        "sameSite": "strict",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "CgQIlJoB"
    },
    {
        "domain": "contacts.google.com",
        "expirationDate": 1707492741,
        "hostOnly": true,
        "httpOnly": false,
        "name": "OTZ",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "7376612_28_28__28_"
    },
    {
        "domain": ".facebook.com",
        "expirationDate": 1739678454.25718,
        "hostOnly": false,
        "httpOnly": true,
        "name": "sb",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "ermeZX-DrQOkvmetdL2c5c7K"
    },
    {
        "domain": ".facebook.com",
        "expirationDate": 1705723259,
        "hostOnly": false,
        "httpOnly": false,
        "name": "wd",
        "path": "/",
        "sameSite": "lax",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "1536x754"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1720454238.911989,
        "hostOnly": false,
        "httpOnly": true,
        "name": "VISITOR_INFO1_LIVE",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "5WQZkDM3vy4"
    },
    {
        "domain": ".chrome.google.com",
        "expirationDate": 1767974241,
        "hostOnly": false,
        "httpOnly": false,
        "name": "_ga",
        "path": "/",
        "sameSite": "unspecified",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "GA1.3.583799675.1704902241"
    },
    {
        "domain": ".chromewebstore.google.com",
        "expirationDate": 1767974262,
        "hostOnly": false,
        "httpOnly": false,
        "name": "_ga",
        "path": "/",
        "sameSite": "unspecified",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "GA1.1.864033894.1704902263"
    },
    {
        "domain": "chromewebstore.google.com",
        "expirationDate": 1707494262,
        "hostOnly": true,
        "httpOnly": false,
        "name": "OTZ",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "7376638_28_28__28_"
    },
    {
        "domain": ".chromewebstore.google.com",
        "expirationDate": 1767977788,
        "hostOnly": false,
        "httpOnly": false,
        "name": "_ga_KHZNC1Q6K0",
        "path": "/",
        "sameSite": "unspecified",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "GS1.1.1704905788.2.0.1704905788.0.0.0"
    },
    {
        "domain": ".chrome.google.com",
        "expirationDate": 1767977788,
        "hostOnly": false,
        "httpOnly": false,
        "name": "_ga_Q3KJSFNQDY",
        "path": "/",
        "sameSite": "unspecified",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "GS1.1.1704905788.2.0.1704905788.0.0.0"
    },
    {
        "domain": ".google.com",
        "expirationDate": 1768060597.239706,
        "hostOnly": false,
        "httpOnly": false,
        "name": "SID",
        "path": "/",
        "sameSite": "unspecified",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "fQi795W1rdMik5PgcpAgEAlCj78cDlplc8RgV3dM9O5nXDlvOVLESXAT5jPP1gQimXoNPA."
    },
    {
        "domain": ".google.com",
        "expirationDate": 1768060597.239851,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-1PSID",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "fQi795W1rdMik5PgcpAgEAlCj78cDlplc8RgV3dM9O5nXDlv6TFtCDRyWB4OcLAYC0iYiA."
    },
    {
        "domain": ".google.com",
        "expirationDate": 1768060597.239969,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSID",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "fQi795W1rdMik5PgcpAgEAlCj78cDlplc8RgV3dM9O5nXDlv4NgmtXchIYcKoTtUiuMZcQ."
    },
    {
        "domain": ".google.com",
        "expirationDate": 1768060597.240382,
        "hostOnly": false,
        "httpOnly": true,
        "name": "HSID",
        "path": "/",
        "sameSite": "unspecified",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "ADl2L-V2KMYPVRdPY"
    },
    {
        "domain": ".google.com",
        "expirationDate": 1768060597.240484,
        "hostOnly": false,
        "httpOnly": true,
        "name": "SSID",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "AH9A5HHrsJcPWSqmz"
    },
    {
        "domain": ".google.com",
        "expirationDate": 1768060597.240565,
        "hostOnly": false,
        "httpOnly": false,
        "name": "APISID",
        "path": "/",
        "sameSite": "unspecified",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "fHnU3Zz15v2431nY/AUOWbCGqWUJ7wp3Lk"
    },
    {
        "domain": ".google.com",
        "expirationDate": 1768060597.240649,
        "hostOnly": false,
        "httpOnly": false,
        "name": "SAPISID",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "sddlt6FLS_khOl9A/APRobfHKG1SQ9d-Tf"
    },
    {
        "domain": ".google.com",
        "expirationDate": 1768060597.240747,
        "hostOnly": false,
        "httpOnly": false,
        "name": "__Secure-1PAPISID",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "sddlt6FLS_khOl9A/APRobfHKG1SQ9d-Tf"
    },
    {
        "domain": ".google.com",
        "expirationDate": 1768060597.240846,
        "hostOnly": false,
        "httpOnly": false,
        "name": "__Secure-3PAPISID",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "sddlt6FLS_khOl9A/APRobfHKG1SQ9d-Tf"
    },
    {
        "domain": "accounts.google.com",
        "expirationDate": 1768060597.240929,
        "hostOnly": true,
        "httpOnly": true,
        "name": "ACCOUNT_CHOOSER",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "AFx_qI6TVTlLdNA-I7MyxRlfj-ouAppwsxXigu80QgaB3Dv8K3QfE5T-QdBEiZ7vkKgVNuhUkPn1NcZqgyxQ8agc6iLvv3CXxT8a1Ut1_NUpQKCwOoDufs2s4Pr3EFDAbk5BzjLeE731"
    },
    {
        "domain": "accounts.google.com",
        "expirationDate": 1768060597.241029,
        "hostOnly": true,
        "httpOnly": true,
        "name": "__Host-GAPS",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "1:Ei8cQCc-72Yx3Oqf28sYpufDAngzH7zJXXsCsbGiQe6V51F8vTKOYHBPr8eoFU3Ag9jVO2Ra_bTsE4gyjsIKx4dhfmJ5Yw:wFhU8p_3uwSfx7x-"
    },
    {
        "domain": "accounts.google.com",
        "expirationDate": 1768060597.314023,
        "hostOnly": true,
        "httpOnly": true,
        "name": "LSID",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "s.VN|s.youtube:fQi79xIqz0YtI7aN9Cov0yiHjMB4rGLQhyl97ZuxkgOs1H9m4KDOOIu-ALcbTqP_b6a15A."
    },
    {
        "domain": "accounts.google.com",
        "expirationDate": 1768060597.314172,
        "hostOnly": true,
        "httpOnly": true,
        "name": "__Host-1PLSID",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "s.VN|s.youtube:fQi79xIqz0YtI7aN9Cov0yiHjMB4rGLQhyl97ZuxkgOs1H9mWNbovUqnsj2u6AX5RpB60Q."
    },
    {
        "domain": "accounts.google.com",
        "expirationDate": 1768060597.314285,
        "hostOnly": true,
        "httpOnly": true,
        "name": "__Host-3PLSID",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "s.VN|s.youtube:fQi79xIqz0YtI7aN9Cov0yiHjMB4rGLQhyl97ZuxkgOs1H9mQPhXBMfqmsAVdvYwVhRAJw."
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1736524597.443684,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSIDTS",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "sidts-CjEBPVxjStd2q1RTlg-hgC2AcWZ3J8kgURekKH_UVQ3UCHT8rd6TQM-tVnXF_hVw3RR4EAA"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1768060597.443836,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSID",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "fQi795W1rdMik5PgcpAgEAlCj78cDlplc8RgV3dM9O5nXDlv4NgmtXchIYcKoTtUiuMZcQ."
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1768060597.444069,
        "hostOnly": false,
        "httpOnly": false,
        "name": "__Secure-3PAPISID",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "sddlt6FLS_khOl9A/APRobfHKG1SQ9d-Tf"
    },
    {
        "domain": ".google.com.vn",
        "expirationDate": 1768060597.60856,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSID",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "fQi795W1rdMik5PgcpAgEAlCj78cDlplc8RgV3dM9O5nXDlv4NgmtXchIYcKoTtUiuMZcQ."
    },
    {
        "domain": ".google.com.vn",
        "expirationDate": 1768060597.608797,
        "hostOnly": false,
        "httpOnly": false,
        "name": "__Secure-3PAPISID",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "sddlt6FLS_khOl9A/APRobfHKG1SQ9d-Tf"
    },
    {
        "domain": ".google.com.vn",
        "expirationDate": 1720799797.608852,
        "hostOnly": false,
        "httpOnly": true,
        "name": "NID",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "511=FcAsD3HBsFsdRIezpzR2XPJxGaIrEvUIUEhoUnCb2E1ckpR10-LTCuabonHGSozwuPfWyv3G3Fd535xikQvEVS7hDoCmaXTRWd2Zpx6woVjIkgoONuO69WeZD6RMNaM-DoMOZ1wFV_l8ss3ehYJkoIeuAeKYue6qKtAPxZLObaw"
    },
    {
        "domain": ".google.com",
        "expirationDate": 1707580609.696261,
        "hostOnly": false,
        "httpOnly": false,
        "name": "1P_JAR",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "2024-01-11-15"
    },
    {
        "domain": ".google.com",
        "expirationDate": 1720452755.745898,
        "hostOnly": false,
        "httpOnly": true,
        "name": "AEC",
        "path": "/",
        "sameSite": "lax",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "Ae3NU9PsaKbOUAfdqhK3cZOafXvYWZGWAyqkEBw83MGVhDyVEYKYK4XobA"
    },
    {
        "domain": ".google.com",
        "expirationDate": 1720799807.00502,
        "hostOnly": false,
        "httpOnly": true,
        "name": "NID",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "511=HruMRp_EhzXcZXMv9N2dajKE1WyjVhqf_U-T8CffE60AwtYtbNQN_mVxlPbEnYq3dtvTTBC6W9nBtip9_2tzH4LXeS4e0CS2YS9oWZbJYm9lfAvfWXzS4AnolHJRJz8AHdUiVBiCq7cJ6rDUPVtu6B2MRS04RenuypEL_Pyon6A__Vz4pXcMOxWYu9DtMX6TaJRK-9MTffuzeX9Kb-nNJ7RsxfSnYWhKx6AXtUrN28Op9ToFjSdDh-uoYo87lyt_gDs735vtmdwCXElHiUVW4xryd1MBabhNEVwGoOqg3Q5J6bYy7j8-8gPuY6Et"
    },
    {
        "domain": ".google.com",
        "expirationDate": 1736524608.774468,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-1PSIDTS",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "sidts-CjEBPVxjSsQghVVDvtG2VBmsvNprgxcBEOZM3sbl2S5Oegb7H3o_cBOt8wnjpF_5ML27EAA"
    },
    {
        "domain": ".google.com",
        "expirationDate": 1736524608.774551,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSIDTS",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "sidts-CjEBPVxjSsQghVVDvtG2VBmsvNprgxcBEOZM3sbl2S5Oegb7H3o_cBOt8wnjpF_5ML27EAA"
    },
    {
        "domain": ".google.com",
        "expirationDate": 1736654340.334386,
        "hostOnly": false,
        "httpOnly": false,
        "name": "SIDCC",
        "path": "/",
        "sameSite": "unspecified",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "ABTWhQFHGLVCd2CBF5YT6RYGOb6prd5Dz56RQqTWIImIq7CznGcuvoeza4zPguWeAK4L3SywIA"
    },
    {
        "domain": ".google.com",
        "expirationDate": 1736654340.334481,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-1PSIDCC",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "ABTWhQFqhllHngr1_0HO57D_etKY9-exkvWA41XC1-sqEyUDuQtnQIk0Bnf8geBrcFOmcqJ4"
    },
    {
        "domain": ".google.com",
        "expirationDate": 1736654340.33456,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSIDCC",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "ABTWhQHEwi_69JFPHjrlvZTle0yYNVCgw7nrDb8ixMbl9G6iThkRNcSk-SUOQ_hvZVryeXw9-w"
    },
    {
        "domain": ".facebook.com",
        "expirationDate": 1739678364.840681,
        "hostOnly": false,
        "httpOnly": true,
        "name": "datr",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "mAqiZX_6SBOVy53873iRhR6U"
    },
    {
        "domain": ".facebook.com",
        "expirationDate": 1705723259,
        "hostOnly": false,
        "httpOnly": false,
        "name": "dpr",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "1.25"
    },
    {
        "domain": ".facebook.com",
        "expirationDate": 1736654454.257472,
        "hostOnly": false,
        "httpOnly": false,
        "name": "c_user",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "100019313437601"
    },
    {
        "domain": ".facebook.com",
        "expirationDate": 1736654454.257537,
        "hostOnly": false,
        "httpOnly": true,
        "name": "xs",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "34%3AeXNYSdA0t24Hjw%3A2%3A1705118450%3A-1%3A6270"
    },
    {
        "domain": ".facebook.com",
        "expirationDate": 1712894455.031117,
        "hostOnly": false,
        "httpOnly": true,
        "name": "fr",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "1WEGcqMNlwYXgMSL1.AWWeI5SVQ1Lh9Z7bQnT7Jfz4kG8.BloA_N.UI.AAA.0.0.Blogr1.AWVUXmT9tzo"
    },
    {
        "domain": ".facebook.com",
        "hostOnly": false,
        "httpOnly": false,
        "name": "presence",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": true,
        "storeId": "0",
        "value": "C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1705118461411%2C%22v%22%3A1%7D"
    }
]
export const seedingFb = async (cookie:any[])=>{
    const inputString=['vay tiền nợ xấu app',"vay vốn kinh doanh","vay tiền fe credit"];
    const browser = await chromium.launch({
        headless: false,
    });
    const browserContext = await browser.newContext();
        const cookies = configCookie(cookie);
    await browserContext.addCookies(cookies);
    const page = await browserContext.newPage();
    //  <=================  seeder facebook =================>
    for (let i = 0; i < inputString.length; i++) {
        const facebookPlatform = await browserContext.newPage();
        await facebookPlatform.goto("https://mbasic.facebook.com/");
        await facebookPlatform.waitForLoadState("load");
        await facebookPlatform.waitForTimeout(Math.ceil(Math.random() * 10) * 1000);
        const inputSearch = await facebookPlatform.$('input[name="query"]');
        await inputSearch?.click();
        await facebookPlatform.keyboard.type(inputString[i], { delay: 100 });
        await facebookPlatform.keyboard.press("Enter");
        await facebookPlatform.waitForTimeout(Math.ceil(Math.random() * 10) * 1000);
        await facebookPlatform.locator("a.bo:has-text('Xem thêm')").click();
        await facebookPlatform.waitForTimeout(Math.ceil(Math.random() * 10) * 1000);
        const listCategory = await facebookPlatform.$$('.ba a[role="menuitem"]');
        for (let j = 0; j < listCategory.length; j++) {
            await facebookPlatform.waitForLoadState("load");
            await facebookPlatform.waitForTimeout(Math.ceil(Math.random() * 10) * 1000);
            await listCategory[j].scrollIntoViewIfNeeded();
            await listCategory[j].click({ modifiers: ["Control"] });
            await facebookPlatform.keyboard.up("Control");
            const newTab = await browserContext.waitForEvent("page");
            await newTab.bringToFront();
            await newTab.waitForLoadState("load");
            await newTab.waitForTimeout(Math.ceil(Math.random() * 20) * 1000);
            scrollFunc(newTab);
            if (j == 5) {
                const listPage = await newTab.$$(".t.cd a");
                for (let k = 0; k < 5; k++) {
                    try {
                        await listPage[k].click({ modifiers: ["Control"] });
                    await newTab.keyboard.up("Control");
                    const messageTab = await browserContext.waitForEvent("page");
                    await messageTab.bringToFront();
                    await messageTab.waitForLoadState("load");
                    await messageTab.waitForTimeout(Math.ceil(Math.random() * 20) * 1000);
                    await messageTab.waitForLoadState("domcontentloaded");
                    const sendMessage = await messageTab.$("a:has-text('Nhắn tin')");
                    await sendMessage?.click();
                    await messageTab.waitForTimeout(Math.ceil(Math.random() * 20) * 1000);
                    await messageTab.waitForLoadState("domcontentloaded");
                    await messageTab.waitForLoadState("load");
                    await messageTab.locator("#composer_form textarea").click();
                    // await messageTab.keyboard.type("Tôi đang cần vay tiền gấp", { delay: 100 });
                    // await messageTab.locator('input[value="Gửi"]').click();
                    await messageTab.close();
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
            if(j == 7){
                try {
                    const groupItem = await newTab.$(".bx");
                    const checkPublic = await groupItem?.$eval(".ch",el=>el.textContent);
                    if(checkPublic == "Công khai"){
                        await newTab.locator(".t a").click();
                        await newTab.waitForLoadState('load');
                        await newTab.waitForLoadState('domcontentloaded');
                        await newTab.waitForTimeout(Math.ceil(Math.random() * 10) * 1000);
                        await newTab.locator(".ce.cf.cg.ch.ci").click();
                        await newTab.keyboard.type("abcd",{delay:100});
                        await newTab.locator(".z.ba.bb.ck.cl").click();
                        await newTab.waitForLoadState('load');
                        await newTab.waitForLoadState('domcontentloaded');
                        await newTab.waitForTimeout(Math.ceil(Math.random() * 10) * 1000);
                    }
                } catch (error) {

                }
            }
            await newTab.close();
        }

    }

    //<=================  seeder youtube =================>
    for (let i = 0; i < inputString.length; i++) {
        const youtubePlatform = await browserContext.newPage();
        await youtubePlatform.goto("https://www.youtube.com/");
        await youtubePlatform.waitForLoadState("load");
        await youtubePlatform.waitForLoadState("domcontentloaded");
        await youtubePlatform.waitForTimeout(Math.ceil(Math.random() * 10) * 1000);
        await youtubePlatform.locator("#search-input").click();
        await youtubePlatform.keyboard.type(inputString[i], { delay: 1000 });
        await youtubePlatform.keyboard.press("Enter");
        await youtubePlatform.waitForTimeout(Math.ceil(Math.random() * 10) * 1000);
        await youtubePlatform.waitForLoadState("load");
        await youtubePlatform.waitForLoadState("domcontentloaded");
        await youtubePlatform.waitForTimeout(Math.ceil(Math.random() * 10) * 1000);
        await scrollFunc(youtubePlatform);
        for(let k=0;k<3;k++){
           try {
            const videoItem = await youtubePlatform.$(
                "yt-formatted-string.style-scope.ytd-video-renderer:not(.selected)"
            );
            await youtubePlatform.evaluate((element) => {
                element?.classList.add("selected");
            }, videoItem);
            await videoItem?.scrollIntoViewIfNeeded();
            await videoItem?.click({ modifiers: ["Control"] });
            await youtubePlatform.keyboard.up("Control");
            const itemTab = await browserContext.waitForEvent("page");
            await itemTab.bringToFront();
            await itemTab.waitForLoadState("load");
            await itemTab.waitForTimeout(3000);
            await scrollFunc(itemTab,10000);
            await itemTab.waitForLoadState('load');
            await itemTab.close();
           } catch (error) {
            console.log(error);
           }
        }
    }

    //<=================  seeder google =================>
    for (let i = 0; i < inputString.length; i++) {
        const googlePlatform = await browserContext.newPage();
        await googlePlatform.goto("https://www.google.com/");
        await googlePlatform.waitForLoadState("load");
        await googlePlatform.waitForTimeout(Math.ceil(Math.random() * 20) * 1000);
        try {
            const acceptBtn = await page.$("button:has-text('Alle akzeptieren')");
            if (acceptBtn) {
                await acceptBtn.click();
            }
        } catch (error) {}
        await googlePlatform.waitForLoadState("domcontentloaded");
        await googlePlatform.waitForTimeout(Math.ceil(Math.random() * 10) * 1000);
        const search = await googlePlatform.$(".gLFyf");
        if (search) {
            await search.fill(inputString[i]);
        }
        await googlePlatform.keyboard.press("Enter");
        await googlePlatform.waitForLoadState("load");
        await googlePlatform.waitForTimeout(3000);
        for (let j = 0; i < 10; j++) {
            const singleLink = await googlePlatform.$('.kb0PBd.cvP2Ce.jGGQ5e [jsname="UWckNb"]:not(.selected)');
            await googlePlatform.evaluate((element) => {
                element?.classList.add("selected");
            }, singleLink);
            await singleLink?.scrollIntoViewIfNeeded();
            await singleLink?.hover();
            await singleLink?.click({ modifiers: ["Control"] });
            await googlePlatform.keyboard.up("Control");
            const itemTab = await browserContext.waitForEvent("page");
            await itemTab.bringToFront();
            await itemTab.waitForLoadState("load");
            await itemTab.waitForTimeout(3000);
            await scrollFunc(itemTab, 10000);
            await itemTab.waitForLoadState("load");
            await itemTab.close();
        }
    }
};

(async ()=>await seedingFb(cookie2))();