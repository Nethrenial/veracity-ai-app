<script setup lang="ts">
import logoImageURL from '~/assets/images/logo.svg'
import { useChatModeStore } from '~/stores';
import { theme } from '~/config'
import { ref } from 'vue';
import IcRoundSearch from '~icons/ic/round-search'
import IcBaselineMic from '~icons/ic/baseline-mic'
import ChatSuggestion from './ChatSuggestion.vue';

const chatModeStore = useChatModeStore()
const query = ref("")

const voiceRecordingDialogOpen = ref(false)
function setVoiceRecordingDialogOpen(value: boolean) {
    voiceRecordingDialogOpen.value = value
}


const suggestions = ["What is the revenue this year?", "What is the revenue last year?", "What is the revenue last quarter?", "What is the revenue last month?", "What is the revenue last week?", "What is the revenue today?"]


const voiceRecordElement = ref<HTMLAudioElement>()
const mediaRecorder = ref<MediaRecorder | null>(null)

function startAudioRecording() {
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
                voiceRecordElement.value!.src = audioUrl
            })

            mediaRecorder.value.start()
        })
}

function stopVoiceRecording() {
    mediaRecorder.value!.stop()
    // voiceRecordingDialogOpen.value = false
}

</script>


<template>
    <section class="flex flex-col items-center justify-center">
        <img alt="Wisebase Logo" :src="logoImageURL" height="96" width="394" class="h-[96px]" />
        <div class="flex items-center gap-4 mt-4">
            <vs-select v-model="chatModeStore.selectedLLMModal" :color="theme.brandColor" class="w-[100px]">
                <vs-option label="GPT 3.5" value="gpt-3.5" selected> GPT 3.5 </vs-option>
                <vs-option label="GPT 4" value="gpt-4"> GPT 4 </vs-option>
                <vs-option label="Gemini" value="gemini"> Gemini </vs-option>
                <vs-option label="Gemini-Ultra" value="gemini-ultra"> Gemini-Ultra </vs-option>
            </vs-select>
            <div class="relative">
                <input type="text" v-model="query"
                    class="border-none rounded-full h-[4rem] w-[600px] px-[4rem] text-xl bg-[#f4f4f4]">
                <IcRoundSearch class="absolute top-1/2 left-[1rem] translate-y-[-50%] text-3xl" />
                <IcBaselineMic class="absolute top-1/2 right-[1rem] translate-y-[-50%] text-3xl cursor-pointer"
                    @click="setVoiceRecordingDialogOpen(true)" />
            </div>
        </div>
        <p class="text-[var(--text-light)] text-[14px] mt-6">
            Or you can start with these suggestions
        </p>
        <div class="grid grid-cols-2 gap-4 mt-6">
            <ChatSuggestion v-for="suggestion in suggestions" :key="suggestion" :text="suggestion" />
        </div>
    </section>
    <vs-dialog v-model="voiceRecordingDialogOpen">
        <template #header>
            <h3>Speak and pless stop when you're finished</h3>
        </template>
        <vs-button @click="startAudioRecording">Start audio recording</vs-button>
        <vs-button @click="stopVoiceRecording">Stop audio recording</vs-button>
        <audio src="" ref="voiceRecordElement" controls></audio>
    </vs-dialog>
</template>