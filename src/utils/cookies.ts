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
