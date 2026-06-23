import { create } from "zustand";
import FoodService from "../service/FoodService";

const useFoodZustand = create((set, get) => ({

    foods: [],

    getAllFoods: async () => {

        // Có rồi thì không fetch nữa
        // if (get().foods.length > 0) return;

        const data = await FoodService.getAllFoods();

        set({
            foods: data,
        });
    },

    refreshFoods: async () => {

        const data = await FoodService.getAllFoods();

        set({
            foods: data,
        });
    },

    updateFood: async (updatedFood) => {

        const data = await FoodService.updateFood(updatedFood);

        set({
            foods: data,
        });
    }
}));

export default useFoodZustand;