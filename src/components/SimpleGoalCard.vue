<template>
  <BaseGoalCard :name :completed>
    <div class="flex justify-end">
      <IonButton v-if="completed" fill="clear" color="success" @click="onUncomplete()"> Completed {{ completedAt }}! </IonButton>
      <IonButton v-else fill="outline" color="secondary" @click="onComplete()">Mark Completed</IonButton>
    </div>
  </BaseGoalCard>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import BaseGoalCard from './BaseGoalCard.vue';
import { computed } from 'vue';

const props = defineProps<{ name: string; completedAt?: string }>();

const emits = defineEmits(['complete', 'uncomplete']);

const completed = computed(() => !!props.completedAt);

const onUncomplete = () => emits('uncomplete');
const onComplete = () => emits('complete');
</script>
