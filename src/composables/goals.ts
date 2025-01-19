import { ComputedRef, readonly, ref, watch } from 'vue';
import { useKvStore } from './kvStore';
import { v1 as uuidv1 } from 'uuid';

interface BaseGoal {
  id: string;
  name: string;
  icon?: string;
}

interface MilestoneGoal extends BaseGoal {
  type: 'milestone';
  targets: number[];
  records: string[];
}

interface SimpleGoal extends BaseGoal {
  type: 'simple';
  completedAt?: string;
}

type Goal = MilestoneGoal | SimpleGoal;

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
        type: 'simple',
        id: uuidv1(),
        name: 'Workout',
        completedAt: undefined
      },
      {
        type: 'simple',
        id: uuidv1(),
        name: 'Workout 2',
        completedAt: '2024-04-06'
      },
      {
        type: 'milestone',
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
