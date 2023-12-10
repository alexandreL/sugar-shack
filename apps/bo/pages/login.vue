<script lang="ts" setup>
import { useAuthStore } from '~/store/auth'

const { authenticateUser } = useAuthStore()

const { authenticated } = storeToRefs(useAuthStore())

const user = ref({
    email: 'alexandre@loubeyres.fr',
    password: 'mdpTest123'
})
const router = useRouter()

const login = async () => {
    await authenticateUser(user.value)
    // redirect to homepage if user is authenticated
    if (authenticated) {
        router.push('/products')
    }
}
</script>
<template>
  <div class="flex items-center justify-center h-screen">
    <div class="p-10 bg-base-300 rounded shadow-md w-96">
      <h2 class="text-2xl font-bold mb-10 text-center">
        Login
      </h2>
      <div class="form-control">
        <label for="uname" class="label"><b>Username</b></label>
        <input
          v-model="user.email"
          type="text"
          class="input input-bordered"
          placeholder="Enter Username"
          name="uname"
          required
        >

        <label for="psw" class="label"><b>Password</b></label>
        <input
          v-model="user.password"
          type="password"
          class="input input-bordered mt-4"
          placeholder="Enter Password"
          name="psw"
          required
        >

        <button class="btn btn-primary mt-6 w-full" @click.prevent="login">
          Login
        </button>
      </div>
    </div>
  </div>
</template>
