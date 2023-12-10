import { defineStore } from 'pinia'

interface UserPayloadInterface {
    email: string;
    password: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        loading: false,
    }),
    actions: {
        async authenticateUser({ email, password }: UserPayloadInterface) {
            // useFetch from nuxt 3
            const { data, pending }: any = await useFetch('http://localhost:4000/api/auth/login', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    email: email,
                    password,
                },
            })
            this.loading = pending

            if (data.value) {
                const token = useCookie('token')
                token.value = data?.value?.access_token
                this.authenticated = true
            }
        },
        logUserOut() {
            const token = useCookie('token')
            this.authenticated = false
            token.value = null
        },
    },
})
