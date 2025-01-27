<template>
  <IonCard :class="{ completed }">
    <IonCardHeader>
      <slot name="subtitle" />

      <IonLabel class="text-2xl" color="medium">
        <IonIcon v-if="actualIcon" class="-ml-2" :icon="actualIcon" size="small" color="medium" /> {{ name }}
      </IonLabel>
    </IonCardHeader>
    <IonCardContent v-if="!dense">
      <slot />
    </IonCardContent>
  </IonCard>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonIcon, IonLabel } from '@ionic/vue';
import { computed } from 'vue';
import { ICON_OPTIONS } from './inputs/iconSelectOptions';

const props = defineProps<{ name: string; icon?: string; completed: boolean; dense?: boolean }>();

const actualIcon = computed(() => ICON_OPTIONS.find(x => x.value === props.icon)?.icon);
</script>

<style scoped>
.completed {
  opacity: 0.4;
}

ion-card {
  border-left: 5px solid transparent;
}

ion-card.completed {
  border-left-color: var(--ion-color-success);
}

ion-card-header,
ion-card-content {
  padding: 0.75rem 1rem;
}
</style>
