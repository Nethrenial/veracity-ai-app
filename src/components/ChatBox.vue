<script setup lang="ts">
import { computed, ref } from 'vue';
import { useChatModeStore } from '~/stores'
import ChatMessage from './ChatMessage.vue';


const chatModeStore = useChatModeStore()

const queries = ref([
    {
        id: 1,
        text: 'What is the capital of France?',
        time: "2022-01-01"
    },
    {
        id: 2,
        text: 'What is the capital of Germany?',
        time: "2022-01-03"
    },
    {
        id: 3,
        text: 'What is the capital of Italy?',
        time: "2022-01-05"
    },
    {
        id: 4,
        text: 'What is the capital of Spain?',
        time: "2022-01-07"
    }
])

const answers = ref([
    {
        id: 1,
        text: 'Paris',
        time: "2022-01-02"
    },
    {
        id: 2,
        text: 'Berlin',
        time: "2022-01-04"
    },
    {
        id: 3,
        text: 'Rome',
        time: "2022-01-06"
    },
    {
        id: 4,
        text: 'Madrid',
        time: "2022-01-08"
    }
])

const allMessages = computed(() => {
    return queries
        .value.map(q => ({ ...q, type: "query" }))
        .concat(
            answers.value.map(a => ({ ...a, type: "answer" }))
        )
        .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    // return [] as {
    //     type: string;
    //     id: number;
    //     text: string;
    //     time: string;
    // }[]
})


function cancelChatMode() {
    queries.value = []
    answers.value = []
    chatModeStore.setChatMode(false)
}

defineExpose({
    cancelChatMode
})


</script>

<template>
    <div class="flex flex-col-reverse  h-[calc(100vh-182px)] w-[75%] max-w-[1000px] p-4 relative" :style="{
        // overflowY: 'scroll'
    }">
        <ChatMessage v-for="message in allMessages" :key="message.id" v-bind="message">
        </ChatMessage>
    </div>
</template>