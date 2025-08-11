'use client';

import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Title } from './title';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { FilterCheckboxGroup } from './filter-checkbox-group';
import { useFilter, useIngredients, useQueryString } from '@/hooks';

interface IFiltersProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  
}

interface IFilterPriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface IFilterQueryString extends IFilterPriceProps {
  pizzaTypes: string;
  pizzaSizes: string;
  ingredients: string;
}

export const Filters: React.FC<IFiltersProps> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilter();
  const { 
    selectedIngredients,
    filterCheckboxBySizes,
    filterCheckboxByPizzaTypes,
    filterPrices,
    onChangeFilterPrice,
    setFilterPrice,
    onAddFilterCheckboxID,
    toggleFilterCheckboxBySizes,
    toggleFilterCheckboxByPizzaTypes,
    onClearSelectedFilterIngredients,
    onClearSelectedFilterBySizes,
    onClearSelectedFilterByPizzaTypes,
    onClearSelectedFilterByPrice, 
  } = filters;
  
  useQueryString(filters);

  const arrIngredients = ingredients.map( item => ({ text: item.name, value: String(item.id), }) );

  return (
    <div className={cn('', className)}>

      {/* Верхняя группа чекбоксов */}
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <FilterCheckboxGroup 
        title='Тип теста'
        name='pizzaTypes'
        className="mb-5"
        selectedFilterCheckbox={filterCheckboxByPizzaTypes}
        FilterCheckboxGroup={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
         
        ]}
        onClickCheckbox={toggleFilterCheckboxByPizzaTypes} 
      />

      <FilterCheckboxGroup 
        title='Размеры'
        name='sizes'
        className="mb-5"
        selectedFilterCheckbox={filterCheckboxBySizes}
        FilterCheckboxGroup={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
        onClickCheckbox={toggleFilterCheckboxBySizes}
      />

      {/* Фильтры цен */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input type="number" placeholder="0" min={0} max={1000} value={String(filterPrices.priceFrom)} onChange={(e) => onChangeFilterPrice('priceFrom', +e.target.value)} />
          <Input type="number" placeholder="1000" min={100} max={1000} value={String(filterPrices.priceTo)} onChange={(e) => onChangeFilterPrice('priceTo', +e.target.value)} />
        </div>
        <RangeSlider 
          min={0} 
          max={1000} 
          step={10} 
          value={[filterPrices.priceFrom || 0, filterPrices.priceTo || 1000]} 
          onValueChange={([from, to]) => setFilterPrice({priceFrom: from, priceTo: to}) }
        />
      </div>

      {/* Фильтры группы чекбоксов ингридиентов */}
      <FilterCheckboxGroup 
        title='Ингридиенты'
        name='ingredients'
        className="mt-5"
        limit={6}
        defaultFilterCheckboxGroup={arrIngredients.slice(0, 6)}
        FilterCheckboxGroup={arrIngredients}
        loading={loading}
        onClickCheckbox={onAddFilterCheckboxID}
        onClearFilterCheckboxGroup={() => {
          onClearSelectedFilterByPizzaTypes();
          onClearSelectedFilterBySizes();
          onClearSelectedFilterByPrice();
          onClearSelectedFilterIngredients();
          }
        }
        selectedFilterCheckbox={selectedIngredients}
      />
    </div>
  );
}

