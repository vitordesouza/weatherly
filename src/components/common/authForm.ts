import { REGISTER, LOGIN } from '@/store/actions.type'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'authForm',
  props: ['mode'],
  setup (props) {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const city = ref('')
    const formIsValid = ref(true)
    const isLoading = ref(false)
    const error = ref(null)

    const store = useStore()
    const router = useRouter()

    const submitForm = async () => {
      formIsValid.value = true

      if (props.mode === 'login') {
        if (email.value === '' || !email.value.includes('@') || password.value.length < 6) {
          formIsValid.value = false
        } else {
          isLoading.value = true
          await store.dispatch(LOGIN, {
            email: email.value,
            password: password.value
          }).then((res) => {
            isLoading.value = false
            router.replace('/')
            console.log('authForm: ', res)
          })
        }
      } else {
        if (name.value === '' || email.value === '' || city.value === '' || !email.value.includes('@') || password.value.length < 6) {
          formIsValid.value = false
        }

        isLoading.value = true

        await store.dispatch(REGISTER, {
          email: email.value,
          password: password.value,
          city: city.value,
          name: name.value
        }).then(() => {
          isLoading.value = false
          router.push('/')
        })
      }
    }

    return {
      name,
      email,
      password,
      city,
      formIsValid,
      isLoading,
      error,
      submitForm
    }
  }
})
