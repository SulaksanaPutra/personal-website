import { onMounted } from 'vue';
import { isDark } from '@/store';

export function useTheme() {
    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            isDark.value = savedTheme === 'dark';
            document.documentElement.classList.toggle('dark', isDark.value);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            isDark.value = prefersDark;
            document.documentElement.classList.toggle('dark', prefersDark);
        }
    };

    const toggleTheme = () => {
        isDark.value = !isDark.value;
        document.documentElement.classList.toggle('dark', isDark.value);
        localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
    };

    onMounted(() => {
        initTheme();
    });

    return {
        isDark,
        toggleTheme,
    };
}
