import { mapPizzaSize, mapPizzaType, pizzaSizes, pizzaTypes } from "@/constants/pizza";

export type TKeysMapPizzaSize = keyof typeof mapPizzaSize;
export type TKeysMapPizzaType = keyof typeof mapPizzaType;

export type TPizzaSizes = typeof pizzaSizes;
export type TPizzaTypes = typeof pizzaTypes;

export type TPizzaOptions = {
    name: string;
    value: string;
    disabled?: boolean;
}

export interface IPizzaSizes {
    name: 'Маленькая' | 'Средняя' | 'Большая';
    value: '20' | '30' | '40';
}

export interface IPizzaTypes {
    name: 'традиционная' | 'тонкая';
    value: '1' | '2';
}