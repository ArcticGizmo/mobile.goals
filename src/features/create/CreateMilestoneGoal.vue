<template>
  <TextInput name="name" label="Name" />
  <pre>{{ form.values }}</pre>
  <pre>{{ form.errors }}</pre>
</template>

<script setup lang="ts">
import { useCreateMilestoneForm } from './createMilestoneForm';
import TextInput from '@/components/inputs/TextInput.vue';

const { create, form } = useCreateMilestoneForm();
</script>
