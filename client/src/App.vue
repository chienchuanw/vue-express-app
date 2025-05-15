<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const message = ref('Loading...')
const time = ref('')
const showTime = ref(false)

onMounted(async () => {
    try {
        const res = await axios.get('http://localhost:3000/api/hello')
        message.value = res.data.message
    } catch (err) {
        console.error("Failed to fetch message from server", err)
        message.value = 'Failed to load message'
    }
})

const getTime = async () => {
    try {
        const res = await axios.get('http://localhost:3000/api/time')
        time.value = res.data.time
        showTime.value = true
    } catch (err) {
        console.error("Failed to fetch time from server", err)
        time.value = 'Failed to load time'
        showTime.value = true
    }
}
</script>

<template>
    <div class="text-center mt-20">
        <h1 class="text-3xl font-bold">{{ message }}</h1>
    </div>
    <button @click="getTime" >
        Get Time
    </button>

    <div v-if="showTime">
        <h2>{{ time }}</h2>
    </div>
    
</template>

<style scoped>
</style>
