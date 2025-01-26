<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <ion-icon aria-hidden="true" :icon="home" />
          <ion-label> Home </ion-label>
        </ion-tab-button>

        <IonFabButton size="small" @click="openCreateGoalModal()">
          <IonIcon :icon="add" />
        </IonFabButton>

        <ion-tab-button tab="settings" href="/settings">
          <ion-icon aria-hidden="true" :icon="settings" />
          <ion-label> Settings </ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { openCreateGoalModal } from '@/composables/modal';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonFabButton } from '@ionic/vue';
import { settings, home, add } from '@/icons';
</script>

<style>
.tab-selected {
  color: var(--ion-color-primary-shade);
}
</style>

<style scoped>
ion-tab-bar {
  box-shadow: 10px 10px 10px 10px;
}
</style>
