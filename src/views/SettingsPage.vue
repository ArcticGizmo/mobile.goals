<template>
  <BasePage title="Settings" max-width="500px">
    <div class="content m-4">
      <IonButton expand="block" fill="outline" @click="onAction()">This is the settings page</IonButton>
    </div>
  </BasePage>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import BasePage from './BasePage.vue';

const onAction = () => {
  console.log('--- toast thing');
};
</script>
