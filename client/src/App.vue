<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const messageInput = ref('')
const messages = ref([])

const fetchMessages = async () => {
    try {
        const res = await axios.get('http://localhost:3000/api/messages')
        messages.value = res.data
    } catch (err) {
        console.error("Failed to fetch messages from server", err)
    }
}

const submitMessage = async () => {
    if (!messageInput.value.trim()) return;

    try {
        await axios.post('http://localhost:3000/api/messages', {
            content: messageInput.value
        })
        messageInput.value = ''
        await fetchMessages()
    } catch (err) {
        console.error("Failed to submit message", err)
    }
}

onMounted(fetchMessages)
</script>

<template>
    <div class="max-w-md mx-auto mt-10 p-4 shadow rounded bg-white">
        <h1 class="text-xl font-bold mb-4">留言板</h1>

        <!-- 訊息輸入區域 -->
        <div class="mb-4">
            <input
                v-model="messageInput"
                type="text"
                placeholder="輸入你的訊息..."
                class="border px-2 py-1 w-full mb-2"
            />
            <button
                @click="submitMessage"
                class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
                送出訊息
            </button>
        </div>

        <!-- 訊息顯示區域 -->
        <div class="space-y-2">
            <h2 class="text-lg font-semibold">所有訊息：</h2>
            <div v-if="messages.length === 0" class="text-gray-500 italic">
                目前還沒有任何訊息...
            </div>
            <div
                v-for="message in messages"
                :key="message.id"
                class="border-l-4 border-blue-400 pl-3 py-2 bg-gray-50"
            >
                <p class="text-gray-800">{{ message.content }}</p>
                <small class="text-gray-500">
                    {{ new Date(message.createdAt).toLocaleString('zh-TW') }}
                </small>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
