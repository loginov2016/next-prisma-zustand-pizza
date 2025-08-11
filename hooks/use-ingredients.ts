import { useEffect, useState } from "react";
import { Ingredient } from "@prisma/client";
import { Api } from "@/services/api-client";

/* 
    * Хук который возвращает объект из массива объектов ингридиентов, типа Ingredient, 
    * и булевского флага загрузки loading. 
*/

export interface IIngredients {
    ingredients: Ingredient[];
    loading: boolean;    
    //setLoading: Dispatch<SetStateAction<boolean>>;
}

export const useIngredients = (): IIngredients => {
    //console.log('Сработал хук useIngredients');
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect( () => {
            //console.log('Сработал callback useEffect хука useIngredients');
            async function fetchIngredients() {
                try {
                    setLoading(true);
                    const ingredients = await Api.ingredients.getAll();
                    setIngredients(ingredients);
                    //console.log('Сработала ф-ия fetchIngredients!');
                } catch (error) {
                    console.log(error);
                }
                finally {
                    setLoading(false);
                }
            }
           fetchIngredients(); 
    }, []);

    return {
        ingredients,
        loading, 
    }
}