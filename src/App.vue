<template>
  <base-dialog @close="userOpen = false" :show="userOpen" title="Edit your profile">
    <user-edit-form @close="userOpen = false" />
    <template v-slot:actions><div></div></template>
  </base-dialog>
  <button class="c__user__btn" @click="userOpen = !userOpen">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-person-circle"
      viewBox="0 0 16 16"
    >
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      <path
        fill-rule="evenodd"
        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
      />
    </svg>
  </button>
  <router-view />
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { TRY_LOGIN } from '@/store/actions.type'

import UserEditForm from '@/components/user/UserEditForm.vue'

export default defineComponent({
  setup () {
    const store = useStore()
    store.dispatch(TRY_LOGIN)

    const userOpen = ref(false)

    return {
      userOpen
    }
  },
  components: {
    UserEditForm
  }
})
</script>

<style src="./styles/main.scss" lang="scss"></style>
