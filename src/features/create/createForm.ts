import { GoalType } from '@/composables/goals';
import { useForm } from 'vee-validate';
import { computed, ComputedRef, ref } from 'vue';
import * as yup from 'yup';

export const useCreateForm = () => {
  const type = ref<GoalType>('simple');

  const schema = computed(() => {
    if (type.value === 'simple') {
      return yup.object({
        type: yup.string<'simple'>(),
        name: yup.string().required().label('Name'),
        icon: yup.string().optional().label('Icon')
      });
    }

    return yup.object({
      type: yup.string<'milestone'>(),
      name: yup.string().required().label('Name'),
      targets: yup.array<number[]>().required().min(1).label('Target')
    });
  });

  type CreateGoalForm = yup.InferType<typeof schema.value>;

  const form = useForm<CreateGoalForm>({
    validationSchema: schema
  });

  const setType = (t: GoalType) => {
    type.value = t;
    form.setValues({ type: t });
  };

  const create = form.handleSubmit(values => {
    // save some stuff or something
    console.dir(values);
  });

  return { type: type as ComputedRef<GoalType>, setType, create };
};
