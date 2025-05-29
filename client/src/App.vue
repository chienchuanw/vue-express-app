<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const messageInput = ref('')
const messages = ref([])

const fetchMessages = async () => {
  try {
    const res = await axios.get('http://localhost:3002/api/messages')
    messages.value = res.data
  } catch (err) {
    console.error("Failed to fetch messages from server", err)
  }
}

const submitMessage = async () => {
  if (!messageInput.value.trim()) return;

  try {
    await axios.post('http://localhost:3002/api/messages', {
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
  <div class="min-h-screen bg-white py-16">
    <!-- 留言板容器 -->
    <div class="w-full max-w-4xl mx-auto px-8">

      <!-- 標題區域 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-light text-gray-900 mb-3 tracking-tight">
          留言板
        </h1>
        <p class="text-lg text-gray-500 font-light">
          分享你的想法
        </p>
      </div>

      <!-- 訊息輸入區域 -->
      <div class="rounded-2xl border border-gray-200 mb-8">
        <div class="p-12">
          <textarea v-model="messageInput" placeholder="寫下你的想法..." rows="6"
            class="w-full px-0 py-0 border-0 focus:ring-0 resize-none text-gray-900 placeholder-gray-400 text-xl leading-relaxed bg-transparent"
            style="outline: none;"></textarea>

          <div class="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
            <div class="text-sm text-gray-400">
              {{ messageInput.length }} 字元
            </div>
            <button @click="submitMessage" :disabled="!messageInput.trim()"
              class="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed">
              發送
            </button>
          </div>
        </div>
      </div>

      <!-- 訊息顯示區域 -->
      <div class="pb-16">
        <!-- 空狀態 -->
        <div v-if="messages.length === 0" class="text-center py-20">
          <p class="text-2xl font-light text-gray-400 mb-2">尚無訊息</p>
          <p class="text-gray-400">成為第一個分享想法的人</p>
        </div>

        <!-- 訊息列表 -->
        <div v-else class="space-y-6">
          <div v-for="message in messages" :key="message.id"
            class="rounded-2xl border border-gray-200 p-12 hover:border-gray-300 transition-colors duration-300">
            <!-- 訊息內容 -->
            <div>
              <p class="text-gray-900 text-xl leading-relaxed break-words mb-6">
                {{ message.content }}
              </p>
              <div class="text-sm text-gray-400">
                {{ new Date(message.createdAt).toLocaleString('zh-TW', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea::placeholder {
  color: #9ca3af;
  font-weight: 300;
}

textarea {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>
