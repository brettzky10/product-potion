import { Hookdeck } from "@hookdeck/sdk";
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



  
export type LinkedInUser = {
  sub: string;
  email_verified: boolean;
  name: string;
  locale: {
    country: string;
    language: string;
  };
  given_name: string;
  family_name: string;
  email: string;
  picture: string;
};

export interface Result<T> {
  type: "success" | "error";
  message: string;
  data: T | null;
}

export type Message = {
  type: "success" | "error";
  message: string;
};

export type SearchParams<T extends string> = {
  [K in T]: string | string[] | undefined;
};


//Hookdeck
export interface WebhookSubscription {
  connection: Hookdeck.Connection;
}