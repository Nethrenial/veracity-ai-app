<script setup lang="ts">
import { storeToRefs } from 'pinia'
import InitialQuerySection from '~/components/InitialQuerySection.vue';
import { useChatModeStore } from '~/stores';


const chatModeStore = useChatModeStore()
const { isInChatMode } = storeToRefs(chatModeStore)

</script>

<template>
    <div class="flex items-center justify-center min-h-[calc(100vh-86px)]">
        <InitialQuerySection v-if="!isInChatMode" />
    </div>
</template>