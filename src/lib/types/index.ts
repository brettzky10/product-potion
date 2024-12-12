
export interface Product {
    id: string;
    category: string | null; //Category
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

  export enum Category {
    SPORTS = 'Sports',
    HOME = 'Home',
    TOOLS = 'Tools',
    'DIGITAL DOWNLOAD' = 'Digital Download',
    MISC = 'Misc',
    COURSE = 'COURSE',
    'EQUIPMENT' = 'Equipment',
  }

  export type ImageAreaProps = {
    title: string;
    icon: React.ForwardRefExoticComponent<
      Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
        title?: string | undefined;
        titleId?: string | undefined;
      } & React.RefAttributes<SVGSVGElement>
    >;
  };

  export type Portfolio = {
    quote: string;
    name: string,
    role: string,
    imgSrc: string,
    portfolioImage: string;
  };

  interface ImageLoaderParams {
    src: string;
    width: number;
    quality?: number;
  }

  export const imageLoader = ({ src, width, quality = 75 }: ImageLoaderParams): string => 
    `${src}?w=${width}&q=${quality}`;

