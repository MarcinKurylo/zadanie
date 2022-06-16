import { Ingredient } from "./ingredient"

export type Recipe = {
  name: string,
  _id?: string,
  preparationTimeInMinutes: number,
  description: string,
  ingredients: Ingredient[]
}