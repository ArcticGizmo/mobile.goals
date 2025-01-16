<template>
  <BasePage title="Settings" max-width="500px">
    <div class="content m-4">
      <IonButton expand="block" fill="outline" @click="mock()">Generate Mock Data</IonButton>
      <IonButton expand="block" fill="outline" @click="clear()">Clear</IonButton>
      <br />
      <IonButton expand="block" fill="outline" @click="onExport()">Export Data</IonButton>
      <IonButton expand="block" fill="outline" @click="onImport()">Import Data</IonButton>
    </div>
  </BasePage>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import BasePage from './BasePage.vue';
import { useGoals } from '@/composables/goals';

const { mock, clear } = useGoals();

const onExport = () => {};
const onImport = () => {};
</script>
