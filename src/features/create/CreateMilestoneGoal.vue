<template>
  <div class="flex">
    <IconInput name="icon" />
    <TextInput class="mt-2 ml-4" name="name" label="Name" autocapitalize="sentences" autocorrect />
  </div>
  <DifficultySelector class="mt-4" name="difficulty" label="Difficulty" />

  <TargetsInput class="mt-4" name="targets" label="Your Targets" />

  <KeyboardSafeFooter>
    <IonButton class="px-4" expand="block" @click="onCreate()">Create</IonButton>
  </KeyboardSafeFooter>
</template>

<script setup lang="ts">
import { IonButton, modalController } from '@ionic/vue';
import { useCreateMilestoneForm } from './createMilestoneForm';
import TextInput from '@/components/inputs/TextInput.vue';
import IconInput from '@/components/inputs/IconInput.vue';
import TargetsInput from '@/components/inputs/TargetsInput.vue';
import KeyboardSafeFooter from '@/components/KeyboardSafeFooter.vue';
import DifficultySelector from '@/components/inputs/DifficultySelector.vue';

const { create, form } = useCreateMilestoneForm();

const onCreate = form.handleSubmit(async values => {
  await create(values);
  modalController.dismiss();
});
</script>
