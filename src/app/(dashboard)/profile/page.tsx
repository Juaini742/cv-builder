import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Pencil,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
} from "lucide-react";
import React from "react";
import { GetUser } from "@/server-hooks/Get-User";
import Link from "next/link";

export default async function ProfilePage() {
  const user = await GetUser();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <Card className="relative z-10 max-w-3xl w-full bg-white shadow-lg rounded-xl p-6">
        <CardHeader className="flex flex-col items-center text-center">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={user?.Profile?.image ?? ""}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 text-xl font-bold">
            {user?.Profile?.name}
          </CardTitle>
          <p className="text-gray-500">{user?.Profile?.position}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Personal Info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-gray-500" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-gray-500" />
              <span>{user?.Profile?.phone ?? "Not Set"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-gray-500" />
              <span>{user?.Profile?.address ?? "Not Set"}</span>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex gap-4 justify-center text-gray-600">
            <Link
              href={user?.Profile?.linkedin ?? "#"}
              target="_blank"
              className="hover:text-blue-500"
            >
              <Linkedin size={22} />
            </Link>
            <Link
              href={user?.Profile?.github ?? "#"}
              target="_blank"
              className="hover:text-gray-900"
            >
              <Github size={22} />
            </Link>
            <Link
              href={user?.Profile?.portfolio ?? "#"}
              target="_blank"
              className="hover:text-green-600"
            >
              <Globe size={22} />
            </Link>
          </div>
        </CardContent>

        {/* Edit Button */}
        <div className="flex justify-center mt-4">
          <Link href={"/profile/update-user"}>
            <Button variant="outline" className="flex items-center gap-2">
              <Pencil size={16} /> Edit Profile
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
