import { Anvil } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const auth = false;
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
      {auth ? (
        <Link href="/sign-in">Sign in</Link>
      ) : (
        <UserModelComponent user={tempuser}/>
      )}
    </div>
  );
}

const UserModelComponent =({user})=>{
  return <DropdownMenu>
    <DropdownMenuTrigger>User</DropdownMenuTrigger>
    <DropdownMenuContent>
    <DropdownMenuLabel>Hi,{user.name}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <Link href={`profile/${user.username}`}>Go to profile</Link>
    </DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
}