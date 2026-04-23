<template>
    <transition name="slide-up">
        <div v-if="isVisible" class="cookie-consent-wrapper no-print">
            <div class="cookie-consent-content">
                <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div class="flex items-start gap-4">
                        <div class="p-2 bg-accent-primary/10 rounded-lg shrink-0 hidden md:block">
                            <CookieIcon class="w-5 h-5 text-accent-primary" />
                        </div>
                        <p class="text-sm text-text-secondary leading-relaxed">
                            We use cookies to enhance your experience and analyze our traffic. 
                            By clicking "Accept", you consent to our use of cookies.
                            <router-link to="/privacy" class="underline hover:text-accent-primary ml-1">Learn more</router-link>.
                        </p>
                    </div>
                    <div class="flex items-center gap-3 w-full md:w-auto">
                        <button 
                            @click="decline" 
                            class="flex-1 md:flex-none px-6 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                        >
                            Decline
                        </button>
                        <button 
                            @click="accept" 
                            class="flex-1 md:flex-none px-8 py-2.5 text-sm font-bold bg-accent-primary text-white rounded-xl shadow-lg shadow-accent-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Cookie as CookieIcon } from 'lucide-vue-next';

const isVisible = ref(false);
const CONSENT_KEY = 'cookie-consent-status';

onMounted(() => {
    const status = localStorage.getItem(CONSENT_KEY);
    if (!status) {
        // Show after a small delay for better UX
        setTimeout(() => {
            isVisible.value = true;
        }, 1000);
    }
});

const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    isVisible.value = false;
    // Trigger GA initialization
    window.dispatchEvent(new CustomEvent('cookie-consent-accepted'));
};

const decline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    isVisible.value = false;
};
</script>
