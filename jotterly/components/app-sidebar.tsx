import { getUser } from "@/lib/supabase/server";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "./ui/sidebar";
import { Note } from "@prisma/client";
import { db } from "@/lib/db";
import Link from "next/link";
import { SidebarGroupContent } from "./sidebar-group-content";

export async function AppSidebar() {
  const user = await getUser();
  let notes: Note[] = [];

  if (user) {
    notes = await db.note.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent className="custom-scrollbar">
        <SidebarGroup>
          <SidebarGroupLabel className="my-2 text-lg">
            {user ? (
              "Your Notes"
            ) : (
              <p>
                <Link href="/sign-in" className="underline">
                  Sign in
                </Link>{" "}
                to see your notes
              </p>
            )}
          </SidebarGroupLabel>
          {user && <SidebarGroupContent notes={notes} />}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
