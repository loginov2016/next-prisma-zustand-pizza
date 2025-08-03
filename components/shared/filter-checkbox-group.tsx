import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IFilterCheckboxProps, FilterCheckbox } from './filter-checkbox';
import { Input, Skeleton } from '../ui';

interface IFilterCheckboxGroupProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  FilterCheckboxGroup: IFilterCheckboxProps[];
  defaultFilterCheckboxGroup?: IFilterCheckboxProps[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  defaultValues?: string[];
  onClickCheckbox?: (id: string) => void;
  selectedFilterCheckbox?: Set<string>;
  name?: string;
}

export const FilterCheckboxGroup: React.FC<IFilterCheckboxGroupProps> = ({ 
    className, 
    title, 
    FilterCheckboxGroup,
    defaultFilterCheckboxGroup,
    limit = 5,
    loading,
    searchInputPlaceholder = 'Поиск...',
    onClickCheckbox,
    selectedFilterCheckbox,
    name,
    defaultValues, 
}) => {
  const [showAllCheckbox, setShowAllCheckbox] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState<string>('');

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  if(loading) {
    return <div className={className}>
      <p className="font-bold mb-3">{title}</p>
      {
        ...new Array(limit).fill(0).map( (_, index) => (<Skeleton key={index} className='h-6 mb-4 rounded-[8px]' />) )
      }

      <Skeleton className='w-28 h-6 mb-4 rounded-[8px]' />
    </div>
  }

  const list = showAllCheckbox ? FilterCheckboxGroup.filter( item => item.text.toLowerCase().includes(searchValue.toLocaleLowerCase()) ) : (defaultFilterCheckboxGroup || FilterCheckboxGroup).slice(0, limit);

  return (
    <div className={cn('', className)}>
      <p className="font-bold mb-3">{title}</p>
  
      {showAllCheckbox && (
        <div className="mb-5">
          <Input
            onChange={onChangeSearchInput} 
            placeholder={searchInputPlaceholder} 
            className='bg-gray-50 border-none' />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map( (item, index) => (
            <FilterCheckbox 
              key={index}
              text={item.text}
              value={item.value}
              endAdornment={item.endAdornment}
              checked={selectedFilterCheckbox?.has(item.value)}
              onCheckedChange={ () => onClickCheckbox?.(item.value) }
              name={name}
            />
          )
        )}
      </div>
      {FilterCheckboxGroup.length > limit && (
        <div className={cn('', {['border-t border-t-neutral-100 mt-4']: showAllCheckbox})}>
          <button 
            onClick={() => setShowAllCheckbox(!showAllCheckbox)} 
            className='text-primary mt-3'
          >
            {showAllCheckbox ? 'Скрыть' : '+ Показать всё'}
          </button>
        </div>
      )}
    </div>
  );
}

