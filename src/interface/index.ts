export type FoodType = {
  title: string;
  thumb: string;
  key: string;
  times: string;
  portion: string;
  dificulty: string;
  dismissed?: number;
};

export type FetchFoodResponseType = {
  method: string;
  success: boolean;
  results: FoodType[];
};
