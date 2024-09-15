export interface Product {
    id: string;
    //category: Category;
    name: string;
    priceInCents: number;
    //discountCodes: string[];
    description: string;
    isAvailableForPurchase: boolean;
    quantity: number;
    //size: Size;
    //color: Color;
    imagePath: string;
    createdAt: Date;
    //storeId: string
  };

  export type ImageAreaProps = {
    title: string;
    icon: React.ForwardRefExoticComponent<
      Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
        title?: string | undefined;
        titleId?: string | undefined;
      } & React.RefAttributes<SVGSVGElement>
    >;
  };