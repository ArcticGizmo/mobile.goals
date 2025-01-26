import {
  airplane,
  book,
  cash,
  chefHat,
  controller,
  food,
  forest,
  home,
  learn,
  music,
  paw,
  run,
  server,
  social,
  star,
  ticket,
  weightLifter
} from '@/icons';

export type IconOption = {
  value: string;
  icon: any;
};

export const ICON_OPTIONS = [
  {
    value: 'star',
    icon: star
  },
  {
    value: 'weight-lifter',
    icon: weightLifter
  },
  {
    value: 'cooking',
    icon: chefHat
  },
  {
    value: 'running',
    icon: run
  },
  {
    value: 'learn',
    icon: learn
  },
  {
    value: 'money',
    icon: cash
  },
  {
    value: 'travel',
    icon: airplane
  },
  {
    value: 'book',
    icon: book
  },
  {
    value: 'ticket',
    icon: ticket
  },
  {
    value: 'forest',
    icon: forest
  },
  {
    value: 'social',
    icon: social
  },
  {
    value: 'music',
    icon: music
  },
  {
    value: 'game',
    icon: controller
  },
  {
    value: 'tech',
    icon: server
  },
  {
    value: 'home',
    icon: home
  },
  {
    value: 'pet',
    icon: paw
  },
  {
    value: 'good',
    icon: food
  }
] as const;

export type SelectableIcon = (typeof ICON_OPTIONS)[number]['value'];
