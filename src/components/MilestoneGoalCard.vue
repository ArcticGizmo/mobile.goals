<template>
  <BaseGoalCard :name :completed>
    <template #subtitle>
      <IonLabel>{{ count || 0 }} / {{ max }}</IonLabel>
    </template>
    <div class="flex -ml-3">
      <MilestoneIcon v-for="target of sortedTargets" :key="target" :count="target" :complete="count >= target" />
    </div>
    <div class="flex justify-end w-full">
      <IonButton class="w-20" size="large" fill="clear" @click="onRemoveRecord()">
        <IonIcon slot="icon-only" :icon="minus" color="danger" />
      </IonButton>
      <IonButton class="w-20" size="large" fill="outline" color="secondary" @click="onAddRecord()">
        <IonIcon slot="icon-only" :icon="plus" />
      </IonButton>
    </div>
  </BaseGoalCard>
</template>

<script setup lang="ts">
import { IonButton, IonIcon, IonLabel } from '@ionic/vue';
import BaseGoalCard from './BaseGoalCard.vue';
import { computed } from 'vue';
import MilestoneIcon from './MilestoneIcon.vue';
import { minus, plus } from '@/icons';

const props = defineProps<{ name: string; targets: number[]; count: number }>();

const emits = defineEmits(['add', 'remove']);

const max = computed(() => Math.max(...props.targets));
const sortedTargets = computed(() => [...props.targets].sort((a, b) => a - b));
const completed = computed(() => props.count >= max.value);

const onRemoveRecord = () => emits('remove');
const onAddRecord = () => emits('add');
</script>

<style scoped>
.increment {
  font-size: 4rem;
  height: 1rem;
}
</style>
