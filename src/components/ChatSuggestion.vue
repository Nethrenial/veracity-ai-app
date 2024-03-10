<script setup lang="ts">
interface ChatSuggestionProps {
    text: string
}

const props = defineProps<ChatSuggestionProps>()

</script>

<template>
    <div
        class="cursor-pointer hover:(translate-y-[-0.25rem]) transition  px-6 py-4 rounded-xl border-[var(--text-light)] text-[var(--text-light)] border-solid border-[2px] flex items-center justify-center">
        <p>{{ props.text }}</p>
    </div>
</template>