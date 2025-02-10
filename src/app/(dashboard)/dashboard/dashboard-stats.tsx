import { Card, CardTitle } from "@/components/ui/card";
import { Briefcase, FileText, User } from "lucide-react";
import React from "react";

interface Props {
  totalCvs: string;
}

export default function DashboardStats({ totalCvs }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <StatCard
        icon={<FileText size={24} />}
        title="Total CVs"
        value={totalCvs}
      />
      <StatCard
        icon={<Briefcase size={24} />}
        title="Cove Letters"
        value="(development)"
      />
      <StatCard
        icon={<User size={24} />}
        title="Profile Completed"
        value="(development)"
      />
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <Card className="p-4 flex items-center space-x-4">
      <div className="p-3 bg-blue-100 text-primary rounded-full">{icon}</div>
      <div className="flex flex-col items-start">
        <CardTitle>{title}</CardTitle>
        <span>{value}</span>
      </div>
    </Card>
  );
}
