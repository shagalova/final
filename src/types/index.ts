import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    isDisabled?: boolean;
    btnType?: "button" | "submit";
    containerStyles?: string;
    textStyles?: string;
    title: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
  }

export interface LoadingProps {
 styles: string
}

export interface IAccauntInfoProps {
  isLoading: boolean;
  count: number;
  limit: number;
}

export interface IBurgerProps {
  isAuth: string | null;
  handleAuth: () => void;
  handleAuthBack: () => void;
  burgerActive: boolean;
}

export interface ISlider {
  icon: string;
  text: string;
}

export interface ITarif {
  title: "Beginner" | "Pro" | "Business";
  description: string;
  icon: string;
  mainColor: "#FFB64F" | "#7CE3E1" | "#000000";
  curPrice: string;
  prevPrice?: string;
  partPrice?: string;
  include: string[];
  isActive: boolean;
}

export interface TarifsCardProps {
  tarif: ITarif;
}

export interface IReview {
  period: string;
  total: string;
  risks: string;
}

export interface IUser {
  login: string;
  password: string;
}

export interface IUserInfo {
  usedCompanyCount: number,
  companyLimit: number
}

export interface IUserAccount {
  accessToken: string,
  expire: string
}

export interface IHistogramData {
    
      histogramType: "totalDocuments" | "riskFactors",
      data: 
        {
          date: string,
          value: number
        }[]
}

export interface IObjectIds {
  items: [
    {
    "encodedId": string,
    "influence": number,
    "similarCount": number
  }
]
  
}


export interface IDocumentsOk {  
  ok: {
    schemaVersion?: string,
    id: string,
    version?: number,
    issueDate: string,
    url: string,
    source: {
      id?: number,
      groupId?: number,
      name: string,
      categoryId?: number,
      levelId?: number
    },
    dedupClusterId?: string,
    title: {
      text: string,
      markup?: string
    },
    content: {
      markup: string
    },    
    attributes: {
      isTechNews: boolean,
      isAnnouncement: boolean,
      isDigest: boolean,
      wordCount: number,
    },
    language?: string  
  }
}

export interface IDocumentsFail {
  fail: {
  id: string,
  errorCode: number,
  errorMessage: string
  }
}

export type IDocuments = IDocumentsOk | IDocumentsFail

export interface IDocData {
  id: string,
    
    issueDate: string,
    url: string,
    sourceName: string,
    title: {
      text: string,
      markup?: string
    },
    content: {
      markup: string
    },    
    attributes: {
      isTechNews: boolean,
      isAnnouncement: boolean,
      isDigest: boolean,
      wordCount: number,
    } 
  
}
