import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IFilterCheckboxProps, FilterCheckbox } from './filter-checkbox';
import { Button, Input, Skeleton } from '../ui';
import { CircleX } from 'lucide-react';

interface IFilterCheckboxGroupProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  FilterCheckboxGroup: IFilterCheckboxProps[];
  defaultFilterCheckboxGroup?: IFilterCheckboxProps[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  defaultValues?: string[];
  onClickCheckbox?: (id: string) => void;
  onClearFilterCheckboxGroup?: () => void;
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
    onClearFilterCheckboxGroup,
    selectedFilterCheckbox,
    name,
    defaultValues, 
}) => {
  const [showAllCheckbox, setShowAllCheckbox] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState<string>('');

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  const onClearSearchInput = () => {
    console.log('Clear Search Input');
    setSearchValue('');
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
        <div className="mb-5 relative">
          {/* <CloseIcon className='absolute right-2 top-2' stroke='#FF6900' /> */}
          <Button 
            variant={'outline'} 
            size={'icon'} 
            className='absolute right-2 w-6 h-6 border-none top-1.5 focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer'
            onClick={onClearSearchInput}
          >
            <CircleX className='border-ring' /> {/* oklch(0.705 0.213 47.604) text-primary stroke='#FFB480' */}
          </Button>
          <Input
            onChange={onChangeSearchInput} 
            placeholder={searchInputPlaceholder} 
            className='bg-gray-50 border-none'
            value={searchValue}
          />
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

      {list.length === 0 && (
        <div className={cn('flex flex-col gap-4 max-h-96 pr-2')}>
          Ничего не найдено
        </div>
      )}  

      {FilterCheckboxGroup.length > limit && (
        <div className={cn('flex justify-between items-center', {['border-t border-t-neutral-100 mt-4']: showAllCheckbox})}>
          <button 
            onClick={() => setShowAllCheckbox(!showAllCheckbox)} 
            className='text-primary mt-3 cursor-pointer'
          >
            {showAllCheckbox ? '- Скрыть' : '+ Показать всё'}
          </button>
          <button 
            className='text-primary mt-3 cursor-pointer'
            onClick={onClearFilterCheckboxGroup}
          >
            Сбросить все фильтры
          </button>
        </div>
      )}
    </div>
  );
}

