import { getData, postData, putData, deleteData } from "../utils/callAPI";

export default class FoodService {

    static async getFoods() {
        const response = await fetch("http://localhost:8080/api/foods");
        const data = await response.json();
        return data;
    }

    static async getFoodById(id) {
        const response = await fetch(`http://localhost:8080/api/foods/${id}`);
        const data = await response.json();
        return data;
    }

    static async updateFood(food) {
        const response = await fetch(`http://localhost:8080/api/foods/${food.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(food),
        });
        const data = await response.json();
        return data;
    }
}
