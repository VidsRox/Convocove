// D:\discord-clone\lib\initial-profile.ts
import { currentUser } from "@clerk/nextjs/server"; // Use Clerk's currentUser
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    // Redirect if not authenticated
    redirect("/sign-in");
  }

  // Look up profile by userId, as your Prisma schema expects a unique key on userId.
  let profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  // Create a new profile using the user id, name, imageUrl and email.
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
