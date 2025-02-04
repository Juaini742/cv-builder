"use client";
import React, { useState } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { logout } from "./logout";
import { usePathname, useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Profile",
    href: "/profile",
    icon: (
      <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Settings",
    href: "/setting",
    icon: (
      <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];

export function SidebarDemo({
  children,
  email,
}: {
  children: React.ReactNode;
  email: string | null | undefined;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout().then(() => {
      router.push("/sign-in");
    });
  };

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  className={
                    pathname.split("/")[1] === link.href.split("/")[1]
                      ? "border-b-2 border-black font-bold"
                      : ""
                  }
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: email || "",
                href: "#",
                icon: (
                  <Image
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full rounded-full"
            >
              <IconArrowLeft className="size-5 text-white" />
              {open ? "Logout" : ""}
            </Button>
          </div>
        </SidebarBody>
      </Sidebar>

      <Dashboard>{children}</Dashboard>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="font-normal flex space-x-2 items-center text-sm text-primary py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-primary dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-primary dark:text-white whitespace-pre"
      >
        Cv Builder
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-primary dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollArea className="flex flex-1 rounded-tl-2xl  border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
      <div className="flex-1 flex p-2  ">
        <div className="p-2 md:p-10 rounded-tl-2xl flex flex-col gap-2 flex-1 w-full h-full">
          {children}
        </div>
      </div>
    </ScrollArea>
  );
};
