<template>
  <BasePage title="Create Goal" closable @close="onClose">
    <div class="p-4">
      <SegmentInput class="mb-4" v-model="type" :options="TYPES" />
      <CreateSimpleGoal v-if="type === 'simple'" />
      <CreateMilestoneGoal v-else-if="type === 'milestone'" />
    </div>
  </BasePage>
</template>

<script setup lang="ts">
import BasePage from '@/views/BasePage.vue';
import { modalController } from '@ionic/vue';
import SegmentInput, { SegementOption } from '@/components/inputs/SegmentInput.vue';
import { GoalType } from '@/composables/goals';
import { ref } from 'vue';
import CreateSimpleGoal from './CreateSimpleGoal.vue';
import CreateMilestoneGoal from './CreateMilestoneGoal.vue';

const TYPES: SegementOption<GoalType>[] = [
  {
    value: 'simple',
    text: 'Simple'
  },
  {
    value: 'milestone',
    text: 'Milestone'
  }
];

const type = ref<GoalType>('simple');

const onClose = () => {
  modalController.dismiss();
};
</script>
