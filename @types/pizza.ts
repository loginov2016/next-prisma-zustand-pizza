import { mapPizzaSize, mapPizzaType } from "@/constants/pizza";

export type TPizzaSize = keyof typeof mapPizzaSize;
export type TPizzaType = keyof typeof mapPizzaType;