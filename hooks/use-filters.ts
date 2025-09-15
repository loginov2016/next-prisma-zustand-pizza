import { Dispatch, SetStateAction, useState } from "react";
import { useSet } from "react-use";
import { IFilterPriceProps } from "./use-query-string";
import { useSearchQueryParams } from "./use-search-query-params";

interface IFilters {
  selectedIngredients:               Set<string>;
  filterCheckboxBySizes:             Set<string>;
  filterCheckboxByPizzaTypes:        Set<string>;
  filterPrices:                      IFilterPriceProps;
  onChangeFilterPrice:               (key: keyof IFilterPriceProps, value: number) => void;
  onAddFilterCheckboxID:             (key: string) => void;
  toggleFilterCheckboxBySizes:       (key: string) => void;
  toggleFilterCheckboxByPizzaTypes:  (key: string) => void;
  onClearSelectedFilterIngredients:  () => void;
  onClearSelectedFilterBySizes:      () => void;
  onClearSelectedFilterByPizzaTypes: () => void;
  onClearSelectedFilterByPrice:      () => void;
}


export const useFilter = (): IFilters => {
  //console.log('Сработал хук useFilter');
  const queryParams = useSearchQueryParams();
  const [selectedIngredients,        { toggle, clear }]                                                                      = useSet(new Set<string>( queryParams('ingredients') ));
  const [filterCheckboxBySizes,      { toggle: toggleFilterCheckboxBySizes, clear: onClearSelectedFilterBySizes }]           = useSet(new Set<string>( queryParams('pizzaSizes') ));
  const [filterCheckboxByPizzaTypes, { toggle: toggleFilterCheckboxByPizzaTypes, clear: onClearSelectedFilterByPizzaTypes }] = useSet(new Set<string>( queryParams('pizzaTypes') ));
  const [filterPrices, setFilterPrice] = useState<IFilterPriceProps>({
                                        priceFrom: Number( queryParams( 'priceFrom') ) || undefined,
                                        priceTo:   Number( queryParams( 'priceTo')   ) || undefined,
                                      });

  const onChangeFilterPrice = (name: keyof IFilterPriceProps, value: number): void => {
    console.log('onChangeFilterPrice', name, value);
    setFilterPrice( (prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onClearSelectedFilterByPrice = () => {
    setFilterPrice({priceFrom: undefined, priceTo: undefined});
  }

  //console.log('filterPrices', filterPrices);

  return {
    selectedIngredients,
    filterCheckboxBySizes,
    filterCheckboxByPizzaTypes,
    filterPrices,
    onChangeFilterPrice,
    onAddFilterCheckboxID: toggle,
    toggleFilterCheckboxBySizes,
    toggleFilterCheckboxByPizzaTypes,
    onClearSelectedFilterIngredients: clear,
    onClearSelectedFilterBySizes,
    onClearSelectedFilterByPizzaTypes,
    onClearSelectedFilterByPrice,    
  }
  
}
