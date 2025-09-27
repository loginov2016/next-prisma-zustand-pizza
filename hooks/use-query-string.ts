import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  
  /* useEffect( () => {
    //console.log('SearchQueryString: ',searchParams.toString());
    if ( searchParams.toString() === 'priceFrom=0&priceTo=0' ) {
      //router.push('/', { scroll: false });
      const params = new URLSearchParams(searchParams.toString());
      //console.log('params: ', params.toString()); // params: priceFrom=0&priceTo=0
      params.delete('priceFrom');
      params.delete('priceTo');
      //console.log('params: ', params.toString()); // params: 
      //router.push(`?${params.toString()}`, { scroll: false });
    }
  }, []); */


  useEffect( () => {

    //console.log('SearchQueryString: ',searchParams.toString());

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
      
      console.log({queryFilterString});
      // queryFilterString === 'priceFrom=0&priceTo=0'
      //const priceFrom = searchParams.has('priceFrom') ? searchParams.get('priceFrom') : '0';
      //const priceTo   = searchParams.has('priceTo')   ? searchParams.get('priceTo')   : '0';
      //priceFrom === '0' && priceTo === '0'

      if ( queryFilterString === 'priceFrom=0&priceTo=0' ) {
        router.push(`/`, { scroll: false });
        return;
      }

      if ( queryFilterString.includes('priceFrom=0&priceTo=0&')) {
        const replaceStr = queryFilterString.replace('priceFrom=0&priceTo=0&', '');
        router.push(`?${replaceStr}`, { scroll: false });
        return;
      }

      //console.log({queryFilters});
      /* 
        Обязательно нужно передавать в метод push второй аргумент: { scroll: false },
        чобы при клике на чекбокс, скролл не прыгал на верх.
      */
      router.push(`?${queryFilterString}`, { scroll: false });
    }, [queryParams.filterPrices, queryParams.filterCheckboxByPizzaTypes, queryParams.filterCheckboxBySizes, queryParams.selectedIngredients, router] 
  );
}