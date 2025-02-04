import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Props {
  button: React.ReactElement;
  label: string;
  content: React.ReactElement;
}
export default function DropdownMenuCustom({ button, label, content }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{button}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        {content}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
