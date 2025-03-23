import { currentProfile } from "@/lib/current-profile";
import { RedirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChannelType } from "@prisma/client";
import { MediaRoom } from "@/components/media-room";

interface ChannelIdPageProps {
  params: Promise<{
    serverId: string;
    channelId: string;
  }>;
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  // Resolve the Promise containing params first
  const { serverId, channelId } = await params;
  const profile = await currentProfile();

  if (!profile) {
    return <RedirectToSignIn />;
  }

  // Use resolved params in database queries
  const [channel, member] = await Promise.all([
    db.channel.findUnique({
      where: { id: channelId }
    }),
    db.member.findFirst({
      where: { serverId, profileId: profile.id }
    })
  ]);

  if (!channel || !member) {
    redirect("/");
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            member={member}
            name={channel.name}
            chatId={channelId}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{ channelId, serverId }}
            paramKey="channelId"
            paramValue={channelId}
          />
          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{ channelId, serverId }}
          />
        </>
      )}
      
      {channel.type === ChannelType.AUDIO && (
        <MediaRoom 
          chatId={channelId}
          video={false}
          audio={true}
        />
      )}

      {channel.type === ChannelType.VIDEO && (
        <MediaRoom 
          chatId={channelId}
          video={true}
          audio={true}
        />
      )}
    </div>
  );
};

export default ChannelIdPage;
