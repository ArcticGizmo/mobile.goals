<template>
  <div class="flex">
    <IconInput name="icon" />
    <TextInput class="mt-2 ml-4" name="name" label="Name" autocapitalize="sentences" autocorrect />
  </div>
  <DifficultySelector class="mt-4" name="difficulty" label="Difficulty" />

  <KeyboardSafeFooter>
    <IonButton class="px-4" expand="block" @click="onCreate()">Create</IonButton>
  </KeyboardSafeFooter>
</template>

<script setup lang="ts">
import IconInput from '@/components/inputs/IconInput.vue';
import { useCreateSimpleForm } from './createSimpleForm';
import TextInput from '@/components/inputs/TextInput.vue';
import { IonButton, modalController } from '@ionic/vue';
import KeyboardSafeFooter from '@/components/KeyboardSafeFooter.vue';
import DifficultySelector from '@/components/inputs/DifficultySelector.vue';

const { create, form } = useCreateSimpleForm();

const onCreate = form.handleSubmit(async values => {
  await create(values);
  modalController.dismiss();
});
</script>
