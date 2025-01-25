<template>
  <IonButton fill="outline" color="dark" @click="onOpenSelector()">
    <IonIcon :icon color="dark" />
  </IonButton>
</template>

<script setup lang="ts">
import { createFullscreenModal } from '@/composables/modal';
import { IonButton, IonIcon } from '@ionic/vue';
import IconSelectModal from './IconSelectModal.vue';
import { ICON_OPTIONS, SelectableIcon } from './iconSelectOptions';
import { useField } from 'vee-validate';
import { computed } from 'vue';

const props = defineProps<{ name: string }>();

const { value, handleChange } = useField<SelectableIcon>(() => props.name, undefined, {
  syncVModel: true,
  validateOnValueUpdate: false
});

const icon = computed(() => ICON_OPTIONS.find(x => x.value === value.value)?.icon);

const onOpenSelector = async () => {
  const modal = await createFullscreenModal({
    component: IconSelectModal,
    componentProps: {
      options: ICON_OPTIONS
    }
  });
  modal.present();

  const resp = await modal.onWillDismiss();

  if (resp.role === 'selected') {
    handleChange(resp.data);
  }
};
</script>

<style scoped>
ion-icon {
  font-size: 2.25rem;
}
</style>
