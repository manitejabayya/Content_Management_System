import { Anvil } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getAuthsession } from "@/lib/auth";
import SignOut from "./signout";

export default function Navbar() {
  const session = getAuthsession();
  const tempuser={
    name:"Sam",
    username:'sam'
  }
  return (
    <div className="w-full flex justify-between px-8 h-12">
      <Link href="/" className="flex gap-2">
        <Anvil />
        <span className="font-extrabold">ManiCMS</span>
      </Link>
      {session ? (
        <Link href="/sign-in">Sign in</Link>
      ) : (
        <UserModelComponent user={session?.user}/>
      )}
    </div>
  );
}

const UserModelComponent =({user})=>{
  return <DropdownMenu>
    <DropdownMenuTrigger><Image className="rounded-full border-2 border-[greenyellow]" src={user.image} width={40} height={40} /></DropdownMenuTrigger>
    <DropdownMenuContent>
    <DropdownMenuLabel>Hi,{user.name}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <Link href={`profile/${user.username}`}>Go to profile</Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <SignOut />
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
}