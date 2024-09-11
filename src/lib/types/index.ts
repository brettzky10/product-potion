export interface Product {
    id: string;
    //category: Category;
    name: string;
    priceInCents: Number;
    discountCodes: string[],
    description: string;
    isFeatured: boolean;
    //size: Size;
    //color: Color;
    imagePath: string
  };