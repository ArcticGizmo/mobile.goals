<template>
  <BasePage title="Select Icon" closable @close="onClose()">
    <div class="p-4 layout">
      <IonButton v-for="option in options" :key="option.value" fill="outline" color="dark" @click="onSelect(option.value)">
        <IonIcon :icon="option.icon" color="dark" />
      </IonButton>
    </div>
  </BasePage>
</template>

<script setup lang="ts">
import BasePage from '@/views/BasePage.vue';
import { IonButton, IonIcon, modalController } from '@ionic/vue';
import { IconOption } from './iconSelectOptions';

defineProps<{
  options: IconOption[];
}>();

const onClose = () => modalController.dismiss();

const onSelect = (value: string) => modalController.dismiss(value, 'selected');
</script>

<style scoped>
ion-icon {
  font-size: 4rem;
}

.layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
}
</style>
