export const getCookie = (name: string) => {
    if (window) {
        const cookies = document.cookie

        const splittedCookies = cookies.split(';')
        const cookie = splittedCookies.filter((c) => c.includes(name))[0]

        if (cookie) {
            const value = cookie.split('=')[1]
            return value
        }

        return null
    }
}

export const setCookie = (
    name: string,
    value: string,
    options?: { expires: string }
) => {
    if (window) {
        console.log(name, value, options)
        const today = new Date()
        const expire = new Date()
        // 14 days
        const defaultExpirationTime = expire.setTime(
            today.getTime() + 3600000 * 24 * 14
        )

        const newCookie = `${name}=${value}; expires=${
            options?.expires || defaultExpirationTime
        }`

        document.cookie = newCookie
    }
}

// NEXT_PUBLIC_CAP_SECRET="6wex70qBkOwxrvh4QccVsOXmFjInWi77qZjLFv6A0Bw="
// NEXT_PUBLIC_MISTER_SECRET="Pv8saRIsG41p+hMT+QvkLdPPUIpnRZlhozIF4sQ1h+Y="
// NEXT_PUBLIC_PLAYER_SECRET="4M/mixGwmcsRRIzc3CXF3vmIb0wuZYNU6URpGbLnAd4="
