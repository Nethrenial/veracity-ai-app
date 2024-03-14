<script setup lang="ts">
import { RouterView } from 'vue-router/auto'
import AppHeader from '~/components/AppHeader.vue';
</script>

<template>
    <div class="w-screen h-screen " :style="{ overflow: 'hidden' }">
        <AppHeader />
        <RouterView v-slot="{ Component, route }">
            <transition name="fade" mode="out-in">
                <component :is="Component" :key="route.path" />
            </transition>
        </RouterView>
    </div>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
</style>