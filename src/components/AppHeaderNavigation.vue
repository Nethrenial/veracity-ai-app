<script setup lang="ts">
import { StyleValue, computed } from 'vue'
import { useRoute } from 'vue-router/auto'
import aiIconBrandURL from '~/assets/images/ai-icon-brand.svg'
import aiIconDarkURL from '~/assets/images/ai-icon-dark.svg'
import dashboardIconBrandURL from '~/assets/images/dashboard-icon-brand.svg'
import dashboardIconDarkURL from '~/assets/images/dashboard-icon-dark.svg'
import { theme } from '~/config'


const route = useRoute()


const isPathHome = computed(() => {
    return route.path === '/'
})

const isPathDashboard = computed(() => {
    return route.path === '/dashboard'
})

const dashboardIconURL = computed(() => {
    return isPathDashboard.value ? dashboardIconBrandURL : dashboardIconDarkURL
})

const aiIconURL = computed(() => {
    return isPathHome.value ? aiIconBrandURL : aiIconDarkURL
})

const homeLinkStyle = computed<StyleValue>(() => {
    return {
        color: isPathHome.value ? theme.brandColor : '#121212',
    }
})

const dashboardLinkStyle = computed<StyleValue>(() => {
    return {
        color: isPathDashboard.value ? theme.brandColor : '#121212',
    }
})
</script>

<template>
    <nav>
        <ul class="flex items-center gap-6">
            <li>
                <RouterLink to="/" class="flex items-center gap-4 relative" :style="homeLinkStyle">
                    <img alt="AI Assistant" :src="aiIconURL" height="36" width="36" class="h-[36px]" />
                    AI Assistant
                    <Transition name="link">
                        <span
                            class="absolute bottom-[-1rem] left-[50%] translate-x-[-50%] block h-[0.25rem] rounded-lg w-[102%]"
                            :style="{ backgroundColor: theme.brandColor }" v-if="isPathHome">
                        </span>
                    </Transition>

                </RouterLink>
            </li>
            <li>
                <RouterLink to="/dashboard" class="flex items-center gap-4 relative" :style="dashboardLinkStyle">
                    <img alt="Dashboard" :src="dashboardIconURL" height="36" width="36" class="h-[36px]" />
                    Dashboard
                    <Transition name="link">
                        <span
                            class="absolute bottom-[-1rem] left-[50%] translate-x-[-50%] block h-[0.25rem] rounded-lg w-[102%]"
                            :style="{ backgroundColor: theme.brandColor }" v-if="isPathDashboard">
                        </span>
                    </Transition>
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss">
.link {



    &-enter-active,
    &-leave-active {
        transition: all 0.3s;
    }

    &-enter-from,
    &-leave-to {
        width: 0%;
    }

    &-enter-to,
    &-leave-from {
        width: 100%;
    }


}
</style>