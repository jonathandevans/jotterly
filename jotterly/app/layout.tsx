import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { NoteProvider } from "@/components/providers/note-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jotterly",
  description: "Fullstack note taking app with AI features.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NoteProvider>
            <SidebarProvider>
              <AppSidebar />

              <div className="flex flex-col min-h-screen w-full">
                <Header />
                <main className="flex flex-1 flex-col px-4 pt-4 xl:px-8">
                  {children}
                </main>
              </div>

              <Toaster position="top-center" richColors closeButton />
            </SidebarProvider>
          </NoteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
