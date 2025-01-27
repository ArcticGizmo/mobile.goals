<template>
  <BaseGoalCard :name :completed :dense :icon @click="emits('edit')">
    <div class="flex justify-end -mt-4">
      <IonButton v-if="completed" class="no-border" fill="outline" color="success" @click.stop="emits('uncomplete')">
        Completed {{ completedAt }}!
      </IonButton>
      <IonButton v-else fill="outline" color="secondary" @click.stop="emits('complete')">Mark Completed</IonButton>
    </div>
  </BaseGoalCard>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import BaseGoalCard from './BaseGoalCard.vue';
import { computed } from 'vue';

const props = defineProps<{ name: string; icon?: string; completedAt?: string; dense?: boolean }>();

const emits = defineEmits(['complete', 'uncomplete', 'edit']);

const completed = computed(() => !!props.completedAt);
</script>

<style scoped>
.no-border::part(native) {
  border-color: transparent;
}
</style>
