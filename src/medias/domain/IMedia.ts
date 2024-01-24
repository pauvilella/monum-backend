import { Types } from "mongoose";
import {
  IPlace,
  IPlaceTranslated,
} from "../../places/domain/interfaces/IPlace.js";

export interface IMedia {
  _id?: Types.ObjectId;
  place: IPlace;
  title: {
    [key: string]: string;
  };
  text: {
    [key: string]: string;
  };
  rating: number;
  audioUrl: {
    [key: string]: string;
  };
  voiceId: {
    [key: string]: string;
  };
  duration: number;
  getSimplifiedVersion: (language: string) => IMediaSimplified;
}

export interface IMediaSimplified {
  _id?: Types.ObjectId;
  id?: Types.ObjectId;
  place: IPlaceTranslated;
  title: string;
  text: string;
  rating: number;
  audioUrl: string;
  voiceId: string;
  duration: number;
}
