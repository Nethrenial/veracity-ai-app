<script setup lang="ts">
import { FunctionalComponent, SVGAttributes, toRefs } from 'vue';
import { Color as VsCompleteColor } from 'vuesax-alpha';
import { theme } from '~/config';

interface AppButtonProps {
    iconComponent?: FunctionalComponent<SVGAttributes, {}, any, {}>
    size?: "default" | "small" | "large" | "xl" | "mini"
    color?: "primary" | "success" | "danger" | "warn" | "dark" | "text" | "light" | "secondary" | "facebook" | "twitter" | "youtube" | "pinterest" | "linkedin" | "snapchat" | "whatsapp" | "tumblr" | "reddit" | "spotify" | "amazon" | "medium" | "vimeo" | "skype" | "dribbble" | "slack" | "yahoo" | "twitch" | "discord" | "telegram" | "google-plus" | "messenger" | VsCompleteColor
}

const props = withDefaults(defineProps<AppButtonProps>(), {
    color: theme.brandColor,
    size: "default",
    iconComponent: undefined
})

const { color, size, iconComponent } = toRefs(props)

</script>

<template>
    <VsButton :color="color" :size="size">
        <span v-if="iconComponent" class="flex items-center gap-2">
            <iconComponent />
            <slot></slot>
        </span>
    </VsButton>
</template>