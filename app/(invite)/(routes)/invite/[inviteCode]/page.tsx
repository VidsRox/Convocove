import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: Promise<{ inviteCode: string }>;
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  // Resolve the Promise containing params
  const { inviteCode } = await params;
  const profile = await currentProfile();

  if (!profile) {
    return <RedirectToSignIn />;
  }

  if (!inviteCode) {
    return redirect("/");
  }

  // Database operations remain the same
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: { inviteCode },
    data: {
      members: {
        create: [{ profileId: profile.id }]
      }
    }
  });

  return redirect(`/servers/${server.id}`);
};

export default InviteCodePage;
