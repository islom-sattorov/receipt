export interface RecipesData {
  imageUrl: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  price: string;
  rating: string;
  cookingTime: string;
  id: string;
  comments?: {
    id: string;
    text: string;
  }[];
}
