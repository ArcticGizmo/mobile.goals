import CreateModal from '@/features/create/CreateModal.vue';
import { ModalOptions, modalController } from '@ionic/vue';

export const createFullscreenModal = async (opts: ModalOptions) => {
  return await modalController.create({
    ...opts,
    cssClass: 'modal-fullscreen ' + opts.cssClass || '',
    backdropDismiss: false
  });
};

export const openCreateGoalModal = async () => {
  const modal = await createFullscreenModal({
    component: CreateModal
  });
  modal.present();

  await modal.onDidDismiss();
};
