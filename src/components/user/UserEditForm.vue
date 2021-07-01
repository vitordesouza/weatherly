<template>
  <div class="form-signin py-0">
    <div class="form-floating mb-0">
      <input
        v-model="userName"
        type="text"
        class="no-bottom-radius form-control"
        id="floatingInput"
        placeholder="name@example.com"
      />
      <label for="floatingInput">Name</label>
    </div>
    <div class="form-floating">
      <input
        v-model="city"
        type="text"
        class="no-top-radius form-control"
        id="floatingPassword"
        placeholder="Password"
      />
      <label for="floatingPassword">City</label>
    </div>
    <div class="form-floating mt-3 d-grid">
      <button @click="editUser" type="button" class="btn btn-primary we__btn">
        Save
      </button>
    </div>
  </div>
</template>

<script lang='ts'>
import { UPDATE_USER } from '@/store/actions.type'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  emits: ['close'],
  setup (_, { emit }) {
    const store = useStore()
    const city = ref(store.getters.city)
    const userName = ref(store.getters.userName)

    const editUser = () => {
      store.dispatch(UPDATE_USER, {
        city: city.value,
        userName: userName.value
      }).then(() => {
        emit('close')
      })
    }

    return {
      userName,
      city,
      editUser
    }
  }
})
</script>
