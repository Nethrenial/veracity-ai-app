<script setup lang="ts">
import logoImageURL from '~/assets/images/logo.svg'
import AppButton from './AppButton.vue';
import OcticonSignOut16 from '~icons/octicon/sign-out-16'
import AppHeaderNavigation from './AppHeaderNavigation.vue';
import { RouterLink } from 'vue-router/auto'

</script>

<template>
    <header class="flex py-4 px-8 items-center justify-between">
        <RouterLink to="/">
            <img alt="Wisebase Logo" :src="logoImageURL" height="48" width="197" class="h-[48px]" />
        </RouterLink>
        <AppHeaderNavigation />
        <AppButton size="large" :icon-component="OcticonSignOut16" type="transparent" >
            Logout
        </AppButton>
    </header>
</template>