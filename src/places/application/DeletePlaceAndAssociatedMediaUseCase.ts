import { MongoPlaceModel } from "../infrastructure/mongoModel/MongoPlaceModel.js";
import { MongoMediaModel } from "../../medias/infrastructure/mongoModel/MongoMediaModel.js";
import { ApolloError } from "apollo-server-errors";
import DeleteMediaAndUpdatedAssociatedRoutesUseCase from "../../medias/application/DeleteMediaAndUpdatedAssociatedRoutesUseCase.js";

export default async function DeletePlaceAndAssociatedMediaUseCase(
  placeId: string
): Promise<boolean> {
  try {
    const mediasAssociated = await MongoMediaModel.find({
      "place._id": placeId,
    });
    for (const media of mediasAssociated) {
      await DeleteMediaAndUpdatedAssociatedRoutesUseCase(media._id.toString());
    }
    await MongoPlaceModel.findByIdAndRemove(placeId, { lean: true });
    return true;
  } catch (error) {
    console.error("Error while deleting Place and associated Media", error);
    throw new ApolloError(
      "Error while deleting Place and associated Media",
      "DELETE_PLACE_AND_ASSOCIATED_MEDIA"
    );
  }
}
