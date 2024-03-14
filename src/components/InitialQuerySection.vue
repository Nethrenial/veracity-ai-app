<script setup lang="ts">
import logoImageURL from '~/assets/images/logo.svg'
import { useChatModeStore } from '~/stores';
import { theme } from '~/config'
import { ComponentInstance, computed, ref, watch } from 'vue';
import IcRoundSearch from '~icons/ic/round-search'
import IcBaselineMic from '~icons/ic/baseline-mic'
import TablerSend2 from '~icons/tabler/send-2'
import MaterialSymbolsStopRounded from '~icons/material-symbols/stop-rounded'
import ChatSuggestion from './ChatSuggestion.vue';
import AppButton from './AppButton.vue';
import ChatBox from './ChatBox.vue';

const chatModeStore = useChatModeStore()
const query = ref("")
const suggestions = ["What is the revenue this year?", "What is the revenue last year?", "What is the revenue last quarter?", "What is the revenue last month?", "What is the revenue last week?", "What is the revenue today?"]


// Element Refs
const voiceRecordElement = ref<HTMLAudioElement>()


const mediaRecorder = ref<MediaRecorder | null>(null)
const voiceRecordingDialogOpen = ref(false)
const isAudioRecording = ref(false)
const voiceRecording = ref<Blob | null>(null)

function setVoiceRecordingDialogOpen(value: boolean) {
    voiceRecordingDialogOpen.value = value
}


function startAudioRecording() {
    isAudioRecording.value = true
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder.value = new MediaRecorder(stream)
            const audioChunks: Blob[] = []

            mediaRecorder.value.addEventListener("dataavailable", event => {
                audioChunks.push(event.data)
            })

            mediaRecorder.value.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks)
                const audioUrl = URL.createObjectURL(audioBlob)
                voiceRecording.value = audioBlob
                voiceRecordElement.value!.src = audioUrl
                isAudioRecording.value = false
            })

            mediaRecorder.value.start()
        })
}


function stopAudioRecording() {
    mediaRecorder.value!.stop()
    // voiceRecordingDialogOpen.value = false
}

function manageRecording() {
    console.log(isAudioRecording.value)
    if (isAudioRecording.value) {
        stopAudioRecording()
    } else {
        startAudioRecording()
    }

}

function clearRecording() {
    voiceRecordElement.value!.src = ""
    voiceRecording.value = null
    // if currently recording, stop recording
    if (isAudioRecording.value) {
        stopAudioRecording()
    }
}


function onQueryFormSubmit() {
    chatModeStore.setChatMode(true)
}

const logoShown = ref(!chatModeStore.isInChatMode)

watch(() => chatModeStore.isInChatMode, (newValue) => {
    console.log(newValue)
    if (newValue) {
        logoShown.value = false
    } else {
        // setTimeout(() => {
            logoShown.value = true
        // }, 10)
    }
})

const chatbox = ref<ComponentInstance<typeof ChatBox>>()
const isChatBoxShown = computed(() => chatModeStore.isInChatMode && !logoShown.value)



</script>


<template>
    <section class="flex flex-col items-center min-h-[calc(100vh-86px)] w-full">
        <Transition name="logo">
            <div v-if="logoShown" class="h-[160px] flex items-center " :style="{ overflow: 'hidden' }">
                <img alt="Wisebase Logo" :src="logoImageURL" height="96" width="394" class="h-[96px]" />
            </div>
        </Transition>

        <Transition name="chatbox">
            <ChatBox v-if="isChatBoxShown" ref="chatbox" />
        </Transition>
        <div class="flex items-center justify-center gap-4" :style="{
                marginTop: chatModeStore.isInChatMode ? '1rem' : '2rem',
                marginBottom: chatModeStore.isInChatMode ? '1rem' : '0rem'
            }">
            <AppButton shape="circle" icon class="w-[4rem] h-[4rem] rounded-full" color="danger"
                @click="chatbox?.cancelChatMode" v-if="chatModeStore.isInChatMode">
                <MaterialSymbolsStopRounded class="text-[1.25rem]" />
            </AppButton>
            <div class="relative flex items-center gap-4">
                <vs-select v-model="chatModeStore.selectedLLMModal" :color="theme.brandColor" class="w-[100px]"
                    v-if="!chatModeStore.isInChatMode">
                    <vs-option label="GPT 3.5" value="gpt-3.5" selected> GPT 3.5 </vs-option>
                    <vs-option label="GPT 4" value="gpt-4"> GPT 4 </vs-option>
                    <vs-option label="Gemini" value="gemini"> Gemini </vs-option>
                    <vs-option label="Gemini-Ultra" value="gemini-ultra"> Gemini-Ultra </vs-option>
                </vs-select>
                <input @keypress="(e) => {
                if (e.key === 'Enter') {
                    onQueryFormSubmit()
                }
            }" type="text" v-model="query"
                    class="border-none rounded-full h-[4rem] w-[600px] px-[4rem] text-xl bg-[#f4f4f4] transition"
                    :style="{ transition: '0.3s ease-in-out' }">
                <IcRoundSearch class="absolute top-1/2 left-[232px] translate-y-[-50%] text-3xl"
                    v-if="!chatModeStore.isInChatMode" />
                <IcBaselineMic class="absolute top-1/2 right-[1rem] translate-y-[-50%] text-3xl cursor-pointer"
                    @click="setVoiceRecordingDialogOpen(true)" />
            </div>
            <AppButton shape="circle" icon class="w-[4rem] h-[4rem] rounded-full" v-if="chatModeStore.isInChatMode">
                <TablerSend2 class="text-[1.25rem]" />
            </AppButton>
        </div>
        <template v-if="!chatModeStore.isInChatMode">
            <p class="text-[var(--text-light)] text-[14px] mt-6">
                Or you can start with these suggestions
            </p>
            <div class="grid grid-cols-2 gap-4 mt-6">
                <ChatSuggestion v-for="suggestion in suggestions" :key="suggestion" :text="suggestion" />
            </div>
        </template>
        <vs-dialog v-model="voiceRecordingDialogOpen" prevent-close>
            <template #header>
                <h3>Click on the mic to start/stop recording</h3>
            </template>
            <div class="flex flex-col gap-4 items-center justify-center">

                <IcBaselineMic class="text-8xl cursor-pointer" :class="isAudioRecording ? 'pulsating-red' : ''"
                    @click="manageRecording" />
                <audio src="" ref="voiceRecordElement" controls></audio>
            </div>
            <template #footer>
                <div class="flex items-center justify-center gap-4">
                    <AppButton @click="clearRecording" color="danger" type="transparent">Clear</AppButton>
                    <AppButton @click="setVoiceRecordingDialogOpen(false)" :disabled="isAudioRecording">Submit
                    </AppButton>
                </div>
            </template>
        </vs-dialog>
    </section>
</template>


<style lang="scss">
.pulsating-red {
    animation: pulsate 1s infinite;
}

@keyframes pulsate {
    0% {
        color: red;
        transform: scale(1);
    }

    50% {
        color: black;
        transform: scale(1.1);
    }

    100% {
        color: red;
        transform: scale(1);
    }
}


.logo {

    &-enter-active,
    &-leave-active {
        transition: all 300ms;
        // transition-delay: 300ms;
        transform-origin: top;
    }

    &-enter-from {
        opacity: 0;
        height: 0px;
    }

    &-leave-to {
        opacity: 0;
        height: 0px;
    }

    &-enter-to,
    &-leave-from {
        opacity: 1;
        height: 160px;
    }
}

.chatbox {

    &-enter-active,
    &-leave-active {
        transition: all 300ms;
        // transition-delay: ms;
    }

    &-enter-from {
        opacity: 0;
        height: 0px;
    }

    &-leave-to {
        opacity: 0;
        height: 0px;
        padding: 0rem;
    }

    &-enter-to,
    &-leave-from {
        opacity: 1;
        height: calc(100vh - 182px);
        padding: 1rem;
    }
}
</style>