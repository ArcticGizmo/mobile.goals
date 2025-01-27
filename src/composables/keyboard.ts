import { Keyboard } from '@capacitor/keyboard';
import { computed, ref } from 'vue';

const isOpen = ref(false);
const isClosed = computed(() => !isOpen.value);

Keyboard.addListener('keyboardWillShow', () => {
  isOpen.value = true;
});

Keyboard.addListener('keyboardWillHide', () => {
  isOpen.value = false;
});

export const useKeyboard = () => {
  return { isOpen, isClosed };
};
