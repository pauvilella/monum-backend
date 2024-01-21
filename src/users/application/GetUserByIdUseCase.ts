import { GraphQLError } from "graphql";
import IUser from "../domain/IUser.js";
import { MongoUserModel } from "../infrastructure/mongoModel/MongoUserModel.js";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
export default async function GetUserByIdUseCase(id: string): Promise<IUser> {
  const user = await MongoUserModel.findById(id);
  if (!user) {
    throw new GraphQLError("User not found", {
      extensions: {
        code: "USER_NOT_FOUND",
        http: { status: 404 },
      },
    });
  }
  return user;
}
