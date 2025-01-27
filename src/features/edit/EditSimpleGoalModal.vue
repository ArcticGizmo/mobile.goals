<template>
  <BasePage title="Edit Goal" closable @close="onClose()">
    <div class="p-4">
      <div class="flex">
        <IconInput name="icon" />
        <TextInput class="mt-2 ml-4" name="name" label="Name" autocapitalize="sentences" autocorrect />
      </div>

      <BooleanInput class="mt-4" name="completed" label="Completed" true-text="Yes" false-text="No" />

      <KeyboardSafeFooter>
        <IonButton class="mb-4" expand="block" @click="onUpdate()">Update</IonButton>
        <IonButton expand="block" fill="outline" color="danger" @click="onDelete()">Delete</IonButton>
      </KeyboardSafeFooter>
    </div>
  </BasePage>
</template>

<script setup lang="ts">
import IconInput from '@/components/inputs/IconInput.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import BasePage from '@/views/BasePage.vue';
import { alertController, IonButton, modalController } from '@ionic/vue';
import { SimpleGoal } from '@/composables/goals';
import { onMounted } from 'vue';
import { useEditSimpleForm } from './editSimpleForm';
import BooleanInput from '@/components/inputs/BooleanInput.vue';
import KeyboardSafeFooter from '@/components/KeyboardSafeFooter.vue';

const props = defineProps<{ initial: SimpleGoal }>();

onMounted(() => {
  initialise(props.initial);
});

const { initialise, form, update, remove } = useEditSimpleForm();

const onClose = () => modalController.dismiss();

const onUpdate = form.handleSubmit(async values => {
  await update(values);
  onClose();
});

const onDelete = async () => {
  const alert = await alertController.create({
    header: 'Delete goal forever?',
    buttons: [
      {
        text: 'cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        role: 'destructive',
        handler: async () => {
          await remove();
          onClose();
        }
      }
    ]
  });
  alert.present();
  await alert.onWillDismiss();
};
</script>
