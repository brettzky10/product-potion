export interface Product {
    id: string;
    //category: Category;
    name: string;
    priceInCents: Number;
    discountCodes: string[];
    description: string;
    isAvailableForPurchase: boolean;
    quantity: Number;
    //size: Size;
    //color: Color;
    imagePath: string;
  };