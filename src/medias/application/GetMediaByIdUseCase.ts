import { MongoMediaModel } from "../infrastructure/mongoModel/MongoMediaModel.js";
import { IMediaSimplified } from "../domain/IMedia.js";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { GraphQLError } from "graphql";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import GetUserByIdUseCase from "../../users/application/GetUserByIdUseCase.js";

export default async function GetMediaByIdUseCase(
  id: string,
  userId: string
): Promise<IMediaSimplified> {
  const media = await MongoMediaModel.findById(id);
  const user = await GetUserByIdUseCase(userId);
  if (!media) {
    throw new GraphQLError("Media not found", {
      extensions: {
        code: "MEDIA_NOT_FOUND",
        http: { status: 404 },
      },
    });
  }
  const client = new S3Client({ region: "eu-west-1" });
  const parsedUrl = new URL(media.audioUrl[user.language]);
  const s3Key = parsedUrl.pathname.replace(
    `/${process.env.S3_BUCKET_AUDIOS!}/`,
    ""
  );
  const commandToGet = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_AUDIOS!,
    Key: s3Key,
  });
  const url = await getSignedUrl(client, commandToGet, {
    expiresIn: 3600,
  }); // 1 hour
  media.audioUrl[user.language] = url;
  return media.getSimplifiedVersion(user.language);
}
