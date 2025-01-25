import { SelectableIcon } from '@/components/inputs/iconSelectOptions';
import { useGoals } from '@/composables/goals';
import { generateId } from '@/composables/identifier';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

export const useCreateSimpleForm = () => {
  const { add } = useGoals();

  const schema = yup.object({
    name: yup.string().required().label('Name'),
    icon: yup.string<SelectableIcon>().optional().label('Icon')
  });

  type CreateSimpleGoalForm = yup.InferType<typeof schema>;

  const form = useForm<CreateSimpleGoalForm>({
    validationSchema: schema,
    validateOnMount: false,
    initialValues: {
      icon: 'star'
    }
  });

  const create = async (values: CreateSimpleGoalForm) => {
    add({
      id: generateId(),
      type: 'simple',
      name: values.name,
      icon: values.icon
    });
  };

  return { create, form };
};
