import { Types } from "mongoose";
import IPhoto from "./IPhoto.js";
import { IAddress, IAddressTranslated } from "./IAddress.js";

export interface IPlace {
  _id?: Types.ObjectId;
  id: string;
  name: string;
  nameTranslations: {
    [key: string]: string;
  };
  address: IAddress;
  description: {
    [key: string]: string;
  };
  importance: number;
  photos?: IPhoto[];
  mainPhoto?: IPhoto;
  rating?: number;
  googleId?: string;
  googleMapsUri?: string;
  internationalPhoneNumber: string;
  nationalPhoneNumber: string;
  types: string[];
  primaryType?: string;
  userRatingCount?: number;
  websiteUri?: string;
  organizationId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPlaceTranslated
  extends Omit<IPlace, "address" | "description" | "photos" | "mainPhoto"> {
  address: IAddressTranslated;
  description?: string;
  photos?: string[];
  mainPhoto?: string;
}

export interface IPlacesSearchResults {
  places: IPlaceTranslated[];
  pageInfo: {
    totalPages: number;
    currentPage: number;
    totalResults: number;
  };
}
