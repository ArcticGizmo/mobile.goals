<template>
  <IonCard :class="{ completed }">
    <IonCardHeader>
      <slot name="subtitle" />

      <div class="flex justify-between">
        <IonLabel class="text-2xl" color="medium">
          {{ name }}
        </IonLabel>
        <IonButton class="-mr-2" fill="clear" @click="onEdit()">
          <IonIcon slot="icon-only" :icon="dotsVertical" size="small" color="medium" />
        </IonButton>
      </div>
    </IonCardHeader>
    <IonCardContent v-if="!dense">
      <slot />
    </IonCardContent>
  </IonCard>
</template>

<script setup lang="ts">
import { dotsVertical } from '@/icons';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonIcon, IonLabel } from '@ionic/vue';

defineProps<{ name: string; completed: boolean; dense?: boolean }>();

const emits = defineEmits(['edit']);

const onEdit = () => emits('edit');
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
