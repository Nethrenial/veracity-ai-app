import { defineStore } from 'pinia'
import {  ref } from 'vue'

export const useChatModeStore = defineStore('chatMode', () => {
    const isInChatMode = ref(false)
    const selectedLLMModal = ref("gpt-3.5")

    function setChatMode(value: boolean) {
        isInChatMode.value = value
    }

    return { isInChatMode, setChatMode, selectedLLMModal }
})