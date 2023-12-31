import IPlace from "../../domain/interfaces/IPlace.js";
import PopulatePlacesByZoneUseCase from "../../application/PopulatePlacesByZoneUseCase.js";
import PopulatePlacesByNameUseCase from "../../application/PopulatePlaceByNameUseCase.js";
import GetPlaceByIdUseCase from "../../application/GetPlaceByIdUseCase.js";
import GetPlacesUseCase from "../../application/GetPlacesUseCase.js";
import DeletePlaceAndAssociatedMediaUseCase from "../../application/DeletePlaceAndAssociatedMediaUseCase.js";
import UpdatePlaceAndAssociatedMediaUseCase from "../../application/UpdatePlaceAndAssociatedMediaUseCase.js";
import { checkToken } from "../../../middleware/auth.js";
import { ApolloError } from "apollo-server-errors";
import { MongoPlaceSearchesModel } from "../../infrastructure/mongoModel/MongoPlaceSearchesModel.js";

const resolvers = {
  Place: {
    // Resolver para el campo imagesUrl
    imagesUrl: (parent: IPlace) => parent.photos?.map((photo) => photo.url),
    importance: (parent: IPlace) => Math.floor(parent.importance / 2) || 0,
  },
  Query: {
    place: (_: any, args: { id: string }, { token }: { token: string }) => {
      checkToken(token);
      return GetPlaceByIdUseCase(args.id);
    },
    places: (
      _: any,
      args: { textSearch: string; centerCoordinates?: [number, number] },
      { token }: { token: string }
    ) => {
      checkToken(token);
      if (args.centerCoordinates && args.centerCoordinates.length !== 2) {
        throw new ApolloError(
          "centerCoordinates must have exactly two elements."
        );
      }
      return GetPlacesUseCase(args.textSearch, args.centerCoordinates);
    },
    placeSearcherSuggestions: async (
      _: any,
      args: { textSearch: string },
      { token }: { token: string }
    ) => {
      checkToken(token);
      const placeSearcherSuggestions = await MongoPlaceSearchesModel.find({
        textSearch: { $regex: args.textSearch, $options: "i" },
      });
      const placeSuggestionsCounted = placeSearcherSuggestions.reduce(
        (acc, curr) => {
          if (acc[curr.textSearch]) {
            acc[curr.textSearch]++;
          } else {
            acc[curr.textSearch] = 1;
          }
          return acc;
        },
        {} as { [key: string]: number }
      );
      return Object.keys(placeSuggestionsCounted).sort(
        (a, b) => placeSuggestionsCounted[b] - placeSuggestionsCounted[a]
      );
    },
  },
  Mutation: {
    populatePlaceByZone: async (
      parent: any,
      args: { zone: string; number?: number },
      { token }: { token: string }
    ) => {
      checkToken(token);
      return PopulatePlacesByZoneUseCase({
        zone: args.zone,
        number: args.number,
      });
    },

    populatePlaceByName: async (
      parent: any,
      args: { name: string; addMedia?: boolean },
      { token }: { token: string }
    ) => {
      checkToken(token);
      return PopulatePlacesByNameUseCase({
        name: args.name,
        addMedia: args.addMedia,
      });
    },
    updatePlace: (
      parent: any,
      args: { id: string; placeUpdate: Partial<IPlace> },
      { token }: { token: string }
    ) => {
      checkToken(token);
      return UpdatePlaceAndAssociatedMediaUseCase(args.id, args.placeUpdate);
    },
    deletePlace: (
      parent: any,
      args: { id: string },
      { token }: { token: string }
    ) => {
      checkToken(token);
      return DeletePlaceAndAssociatedMediaUseCase(args.id);
    },
  },
};

export default resolvers;
