<template>
  <BaseGoalCard :name :completed @edit="emits('edit')">
    <div class="flex justify-end -mt-4">
      <IonButton v-if="completed" class="no-border" fill="outline" color="success" @click="emits('uncomplete')">
        Completed {{ completedAt }}!
      </IonButton>
      <IonButton v-else fill="outline" color="secondary" @click="emits('complete')">Mark Completed</IonButton>
    </div>
  </BaseGoalCard>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import BaseGoalCard from './BaseGoalCard.vue';
import { computed } from 'vue';

const props = defineProps<{ name: string; completedAt?: string }>();

const emits = defineEmits(['complete', 'uncomplete', 'edit']);

const completed = computed(() => !!props.completedAt);
</script>

<style scoped>
.no-border::part(native) {
  border-color: transparent;
}
</style>
