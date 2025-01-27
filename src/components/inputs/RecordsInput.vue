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
      v-model="newRecord"
      style="margin-top: -1px"
      :class="{ 'ion-invalid ion-touched': !!errorMessage }"
      placeholder="add record"
      mode="md"
      fill="outline"
      @ion-change="onAddNewRecord()"
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
import { parseDateOnly } from '@/composables/dateOnly';

const props = defineProps<{ name: string; label: string }>();

const newRecord = ref<string>();

// This typing could be wrong if the type is number, so maybe choose a different one
const { errorMessage, value, handleChange } = useField<string[]>(() => props.name, undefined, {
  syncVModel: true,
  validateOnValueUpdate: false
});

const setValue = (arr: string[]) => {
  const deduped = [...new Set(arr)];
  deduped.sort((a, b) => a.localeCompare(b));
  handleChange(deduped);
};

const onChange = (e: IonInputCustomEvent<InputChangeEventDetail>, index: number) => {
  e.preventDefault();
  const v = parseDateOnly(e.detail.value || '') || value.value[index];

  const newArr = [...value.value];
  newArr[index] = v;

  setValue(newArr);
};

const onRemove = (index: number) => {
  const newArr = [...value.value];
  newArr.splice(index, 1);
  setValue(newArr);
};

const onAddNewRecord = () => {
  const v = parseDateOnly(newRecord.value || '');
  newRecord.value = undefined;
  if (!v) {
    return;
  }

  const newArr = [...value.value];
  newArr.push(v);
  setValue(newArr);
};
</script>

<style scoped>
.errored ion-input {
  border-color: orange;
}
</style>
