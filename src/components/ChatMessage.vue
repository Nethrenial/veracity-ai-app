<script setup lang="ts">
import { toRefs } from 'vue';

interface ChatMessageProps {
    type: string;
    id: number;
    text: string;
    time: string;
}

const props = defineProps<ChatMessageProps>();
const { text, type } = toRefs(props);

</script>

<template>
    <div :style="{
        alignSelf: type === 'query' ? 'flex-end' : 'flex-start',
        backgroundColor: type === 'query' ? 'rgba(0, 0, 0, 0.1)' : 'var(--brand-transparent)',
    }" class="p-4 rounded-xl shadow-xl">
        {{
        text
    }}
    </div>
</template>