<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'

const router = useRouter()

const { logUserOut } = useAuthStore()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { authenticated } = storeToRefs(useAuthStore())

const logout = () => {
    logUserOut()
    router.push('/login')
}
</script>
<template>
  <div>
    <header>
      <div class="navbar bg-base-100 shadow-xl rounded-box">
        <div class="navbar-start">
          <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <NuxtLink to="/products">
                  <a>Products</a>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/orders">
                  <a>Orders</a>
                </NuxtLink>
              </li>
              <li>
                <a @click.prevent="logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="navbar-center">
          <NuxtLink to="/products">
            <a class="btn btn-ghost text-xl">Sugar shack Backoffice</a>
          </NuxtLink>
        </div>
        <div class="navbar-end" />
      </div>
    </header>
    <div class="mainContent">
      <slot />
    </div>
  </div>
</template>
