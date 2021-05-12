import Price from './Price';

export default interface Car {
  __typename: string;
  id: string;
  code: string;
  picture: string;
  model_name: string;
  year_model: number;
  mileage: number;
  prices: Price[];
}
