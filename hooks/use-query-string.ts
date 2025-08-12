import { useRouter } from "next/navigation";
import qs from "qs";
import { useEffect } from "react";

export interface IFilterPriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface IQueryFiltersProps {
  filterCheckboxByPizzaTypes: Set<string>;
  filterCheckboxBySizes: Set<string>; 
  selectedIngredients: Set<string>; 
  filterPrices: IFilterPriceProps;
}

export const useQueryString = (queryParams: IQueryFiltersProps): void => {
  //console.log('Сработал хук useQueryString');
  const router = useRouter();

  useEffect( () => {
      const queryFilters = {
        ...queryParams.filterPrices,
        pizzaTypes: Array.from(queryParams.filterCheckboxByPizzaTypes),
        pizzaSizes: Array.from(queryParams.filterCheckboxBySizes),
        ingredients: Array.from(queryParams.selectedIngredients),
      };
      /* Строка в GET запросе. */
      const queryFilterString = qs.stringify(queryFilters, {
        arrayFormat: 'comma'
      });
      //console.log(queryString);
      /* 
        Обязательно нужно передавать в метод push второй аргумент: { scroll: false },
        чобы при клике на чекбокс, скролл не прыгал на верх.
      */
      router.push(`?${queryFilterString}`, { scroll: false });
    }, [queryParams.filterPrices, queryParams.filterCheckboxByPizzaTypes, queryParams.filterCheckboxBySizes, queryParams.selectedIngredients, router] 
  );
}