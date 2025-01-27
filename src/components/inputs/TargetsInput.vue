<template>
  <div class="target-input" :class="{ errored: !!errorMessage || true }">
    <div class="mb-2">
      <IonLabel>{{ label }}</IonLabel>
    </div>
    <div v-for="(v, index) in value" :key="index" class="flex" style="margin-top: -1px">
      <IonInput :model-value="v" inputmode="decimal" mode="md" fill="outline" @ion-change="onChange($event, index)" />
      <IonButton fill="clear" @click="onRemove(index)">
        <IonIcon slot="icon-only" :icon="close" color="danger" />
      </IonButton>
    </div>
    <IonInput
      v-model="newTarget"
      style="margin-top: -1px"
      :class="{ 'ion-invalid ion-touched': !!errorMessage }"
      type="number"
      inputmode="decimal"
      placeholder="add target"
      mode="md"
      fill="outline"
      @ion-change="onAddNewTarget()"
    />

    <IonText v-if="errorMessage" class="ml-4" color="danger">
      <small> {{ errorMessage }} </small>
    </IonText>
  </div>
</template>

<script setup lang="ts">
import { IonButton, IonIcon, IonInput, IonLabel, IonText } from '@ionic/vue';
import { InputChangeEventDetail, IonInputCustomEvent } from '@ionic/core';
import { useField } from 'vee-validate';
import { close } from 'ionicons/icons';
import { ref } from 'vue';

const props = defineProps<{ name: string; label: string }>();

const newTarget = ref<number>();

// This typing could be wrong if the type is number, so maybe choose a different one
const { errorMessage, value, handleChange } = useField<number[]>(() => props.name, undefined, {
  syncVModel: true,
  validateOnValueUpdate: false
});

const setValue = (arr: number[]) => {
  const deduped = [...new Set(arr)];
  deduped.sort((a, b) => a - b);
  handleChange(deduped);
};

const onChange = (e: IonInputCustomEvent<InputChangeEventDetail>, index: number) => {
  e.preventDefault();
  const v = Number(e.detail.value) || value.value[index];

  if (v <= 0) {
    onRemove(index);
    return;
  }

  const newArr = [...value.value];
  newArr[index] = v;

  setValue(newArr);
};

const onRemove = (index: number) => {
  const newArr = [...value.value];
  newArr.splice(index, 1);
  setValue(newArr);
};

const onAddNewTarget = () => {
  const num = Number(newTarget.value);
  newTarget.value = undefined;

  if (isNaN(num)) {
    return;
  }

  const newArr = [...value.value];
  newArr.push(num);
  setValue(newArr);
};
</script>

<style scoped>
.errored ion-input {
  border-color: orange;
}
</style>
