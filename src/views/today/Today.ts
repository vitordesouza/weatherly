import { defineComponent, computed, ComputedRef } from 'vue'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
import { TodayWeather } from '@/store'

// import { GET_WEATHER } from '@/store/actions.type'

export default defineComponent({
  name: 'Today',
  setup () {
    const store = useStore()

    const isLoading = computed(() => store.getters.isLoadingToday)
    const name = computed(() => store.getters.userName)
    const city = computed(() => store.getters.city)
    const today: ComputedRef<TodayWeather> = computed(() => store.getters.todayWeather)
    const dayFormat = 'dddd MMMM D, YYYY'

    const iconUrl = (icon: string) => {
      return 'https://openweathermap.org/img/w/' + icon + '.png'
    }

    const getDateTime = (format: string) => {
      return dayjs().format(format)
    }

    const unixDateTime = (seconds: number, format: string) => {
      return dayjs.unix(seconds).format(format)
    }

    const capitalize = (string: string) => {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }

    return {
      isLoading,
      name,
      city,
      today,
      dayFormat,
      getDateTime,
      unixDateTime,
      iconUrl,
      capitalize
    }
  },
  components: {
  }
})
