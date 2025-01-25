import { SelectableIcon } from '@/components/inputs/iconSelectOptions';
import { useGoals } from '@/composables/goals';
import { generateId } from '@/composables/identifier';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

export const useCreateSimpleForm = () => {
  const { add } = useGoals();

  const schema = yup.object({
    type: yup.string<'simple'>(),
    name: yup.string().required().label('Name'),
    icon: yup.string<SelectableIcon>().optional().label('Icon')
  });

  type CreateGoalForm = yup.InferType<typeof schema>;

  const form = useForm<CreateGoalForm>({
    validationSchema: schema,
    validateOnMount: false,
    initialValues: {
      icon: 'star'
    }
  });

  const create = (values: CreateGoalForm) => {
    add({
      id: generateId(),
      type: 'simple',
      ...values
    });
  };

  return { create, form };
};
