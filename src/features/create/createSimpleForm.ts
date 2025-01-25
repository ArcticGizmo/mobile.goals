import { SelectableIcon } from '@/components/inputs/iconSelectOptions';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

export const useCreateSimpleForm = () => {
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

  const create = form.handleSubmit(values => {
    // save some stuff or something
    console.dir(values);
  });

  return { create, form };
};
