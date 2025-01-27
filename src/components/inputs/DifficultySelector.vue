<template>
  <div>
    <div class="flex items-center">
      <IonLabel v-if="label" class="mr-3">{{ label }}</IonLabel>
      <SegmentInput :model-value="value" :options="OPTIONS" @change="handleChange" />
    </div>

    <IonText v-if="errorMessage" class="ml-4" color="danger">
      <small> {{ errorMessage }} </small>
    </IonText>
  </div>
</template>

<script setup lang="ts">
import { GoalDifficulty } from '@/composables/goals';
import SegmentInput from './SegmentInput.vue';
import { useField } from 'vee-validate';
import { IonLabel, IonText } from '@ionic/vue';

type Option = {
  value: GoalDifficulty;
  text: string;
};

const OPTIONS: Option[] = [
  {
    value: 'easy',
    text: 'Easy'
  },
  {
    value: 'medium',
    text: 'Medium'
  },
  {
    value: 'hard',
    text: 'Hard'
  }
];

const props = defineProps<{ name: string; label: string }>();

const { errorMessage, value, handleChange } = useField<GoalDifficulty>(() => props.name, undefined, {
  syncVModel: true,
  validateOnValueUpdate: false
});
</script>
