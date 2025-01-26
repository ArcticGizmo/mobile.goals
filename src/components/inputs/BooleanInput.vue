<template>
  <div>
    <div class="flex items-center">
      <IonLabel v-if="label" class="mr-3">{{ label }}</IonLabel>
      <SegmentInput :model-value :options @change="onChange" />
    </div>

    <IonText v-if="errorMessage" class="ml-4" color="danger">
      <small> {{ errorMessage }} </small>
    </IonText>
  </div>
</template>

<script setup lang="ts">
import { IonLabel, IonText } from '@ionic/vue';
import SegmentInput, { SegementOption } from './SegmentInput.vue';
import { computed } from 'vue';
import { useField } from 'vee-validate';

type PossibleValue = 0 | 1;

const props = defineProps<{ name: string; label: string; trueText?: string; falseText?: string }>();

const options = computed<SegementOption<PossibleValue>[]>(() => {
  return [
    {
      value: 0,
      text: props.falseText || 'False'
    },
    {
      value: 1,
      text: props.trueText || 'True'
    }
  ];
});

const { errorMessage, value, handleChange } = useField<boolean[]>(() => props.name, undefined, {
  syncVModel: true,
  validateOnValueUpdate: false
});

const modelValue = computed(() => (value.value ? 1 : 0));

const onChange = (v: PossibleValue) => {
  const bool = v ? true : false;
  handleChange(bool);
};
</script>
