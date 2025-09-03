/**
 *  Функция, которая правильно склоняет падежные окончания взависимости от числа.
 * 
 * @param value - число
 * @param arrWords - массив строк 
 * @returns string возвращает строку из массива строк.
 */

export const getNumberWord = (value: number, arrWords: string[]): string => {  
	value = Math.abs(value) % 100; 
	const num = value % 10;
	if(value > 10 && value < 20) return arrWords[2]; 
	if(num > 1 && num < 5) return arrWords[1];
	if(num == 1) return arrWords[0]; 
	return arrWords[2];
}