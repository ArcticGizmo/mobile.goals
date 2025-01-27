<template>
  <Teleport v-if="isClosed" to="ion-modal.show-modal .teleporting-footer">
    <slot></slot>
  </Teleport>
</template>

<script setup lang="ts">
import { useKeyboard } from '@/composables/keyboard';

const { isClosed } = useKeyboard();
</script>
