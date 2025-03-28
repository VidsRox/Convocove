import { ServerSidebar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { RedirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation";

const ServerIdLayout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { serverId: string }
}) => {
    const profile = await currentProfile()
    if(!profile){
        return RedirectToSignIn({})
    }

    // Convert params.serverId to a constant first
    const serverId = params.serverId;
    
    const server = await db.server.findUnique({
        where: {
            id: serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if(!server){
        return redirect("/");
    }

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20
             fixed flex-col inset-y-0">
            <ServerSidebar serverId={serverId}/>
            </div>
            <main className="h-full md:pl-60">
            {children}
            </main>
        </div>
    )
}
export default ServerIdLayout