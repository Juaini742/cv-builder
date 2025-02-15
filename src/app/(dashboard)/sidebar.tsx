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
import { Particles } from "@/components/magicui/particles";
import { IUser } from "@/lib/interfaces";

const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: IconBrandTabler,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: IconUserBolt,
  },
  {
    label: "Settings",
    href: "/setting",
    icon: IconSettings,
  },
];

export function SidebarDashboard({
  children,
  user,
}: {
  children: React.ReactNode;
  user: IUser | null;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout().then(() => {
      router.push("/sign-in");
    });
  };

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between bg-white gap-10 border-l border-neutral-200 rounded-tr-xl">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  className={
                    pathname.split("/")[1] === link.href.split("/")[1]
                      ? " font-bold text-white bg-primary rounded-md"
                      : ""
                  }
                  active={pathname.split("/")[1] === link.href.split("/")[1]}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: user?.email || "",
                href: "#",
                icon: (
                  <Image
                    src={
                      user?.Profile.image ??
                      "https://assets.aceternity.com/manu.png"
                    }
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

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollArea className="w-full h-full">
      <div className="h-screen rounded-tl-2xl dark:bg-neutral-900">
        <div className="flex-1 h-full">
          <div className="p-2 md:p-10 rounded-tl-2xl flex-1 flex flex-col gap-2 w-full h-full relative z-20">
            {children}
          </div>
          <Particles
            className="absolute inset-0"
            quantity={100}
            ease={80}
            color="#000000"
            refresh
          />
        </div>
      </div>
    </ScrollArea>
  );
};
