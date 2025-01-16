import { ComputedRef, readonly, ref, watch } from 'vue';
import { useKvStore } from './kvStore';
import { v1 as uuidv1 } from 'uuid';

type Goal = {
  id: string;
  name: string;
  icon?: string;
  targets: number[];
  records: string[];
};

const GOAL_KEY = 'goals';

const kvStore = useKvStore();

const goals = ref<Goal[]>([]);

watch(goals, async g => {
  await kvStore.saveJson<Goal[]>(GOAL_KEY, g);
});

const initialLoad = async () => {
  const data = await kvStore.loadJson<Goal[]>(GOAL_KEY);
  goals.value = data || [];
};

const add = async (goal: Goal) => {
  const updatedGoals = goals.value.filter(x => x.id !== goal.id);
  updatedGoals.push(goal);
  goals.value = updatedGoals;
};

const remove = async (id: string) => {
  const updatedGoals = goals.value.filter(x => x.id !== id);
  goals.value = updatedGoals;
};

const set = async (newGoals: Goal[]) => {
  goals.value = [...newGoals];
};
/* load on app start because this is all the app does */
initialLoad();

export const useGoals = () => {
  const mock = () => {
    goals.value = [
      {
        id: uuidv1(),
        name: 'Workout',
        targets: [1],
        records: []
      },
      {
        id: uuidv1(),
        name: 'Brush teeth',
        targets: [1, 4, 5],
        records: ['2022-05-01', '2022-06-01']
      }
    ];
  };

  const clear = () => set([]);

  return { goals: readonly(goals) as ComputedRef<Goal[]>, add, remove, set, clear, mock };
};
