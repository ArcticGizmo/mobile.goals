<template>
  <BasePage title="Home" max-width="500px">
    <template #header>
      <IonSearchbar class="px-2 my-0.5" v-model="search" />
    </template>
    <div v-for="goal in goals" :key="goal.id">
      <SimpleGoalCard v-if="goal.type === 'simple'" :name="goal.name" :completed-at="goal.completedAt" />
      <MilestoneGoalCard v-else-if="goal.type === 'milestone'" :name="goal.name" :targets="goal.targets" :count="goal.records.length" />
    </div>
    <!-- <IonCard v-for="goal of items" :key="goal.id">
      <IonCardHeader>
        <IonLabel>{{ goal.count }} / {{ goal.maxTarget }}</IonLabel>
        <div class="flex justify-between">
          <IonLabel class="text-2xl" color="medium">
            {{ goal.name }}
          </IonLabel>
          <IonButton class="-mr-2" fill="clear">
            <IonIcon slot="icon-only" :icon="dotsVertical" size="small" color="medium" />
          </IonButton>
        </div>
      </IonCardHeader>
      <IonCardContent>
        <div class="flex -ml-3">
          <MilestoneIcon count="2" complete />
          <MilestoneIcon count="2000" />
        </div>
        <div class="flex justify-end w-full">
          <IonButton class="w-16" size="large" fill="clear">
            <IonIcon slot="icon-only" :icon="minus" color="danger" />
          </IonButton>
          <IonButton class="w-16" size="large" color="secondary">
            <IonIcon slot="icon-only" :icon="plus" />
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard> -->
  </BasePage>
</template>

<script setup lang="ts">
import { useGoals } from '@/composables/goals';
import BasePage from './BasePage.vue';
import { IonSearchbar } from '@ionic/vue';
import { ref } from 'vue';
import SimpleGoalCard from '@/components/SimpleGoalCard.vue';
import MilestoneGoalCard from '@/components/MilestoneGoalCard.vue';

const { goals } = useGoals();
const search = ref('');
</script>

<style scoped>
.increment {
  font-size: 4rem;
  height: 1rem;
}
</style>
