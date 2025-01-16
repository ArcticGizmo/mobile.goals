<template>
  <div class="milestone w-16 flex flex-col items-center" :class="{ complete }">
    <IonIcon class="icon" :icon="progressStar" />
    <div class="text-sm text-center">
      {{ count }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { progressStar } from '@/icons';
import { IonIcon } from '@ionic/vue';

defineProps<{ count: number | string; complete?: boolean }>();
</script>

<style scoped>
.milestone:not(.complete) {
  opacity: 0.4;
}

.icon {
  font-size: 3rem;
  color: rgb(192, 192, 192);
}

.complete .icon {
  color: var(--ion-color-success);
}
</style>
