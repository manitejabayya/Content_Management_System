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
import Image from "next/image";

export default async function Navbar() {
  const session = await getAuthsession();

  return (
    <div className="w-full flex justify-between px-8 h-12 items-center">
      <Link href="/" className="flex gap-2 items-center">
        <Anvil />
        <span className="font-extrabold">ManiCMS</span>
      </Link>
      {session?.user ? (
        <UserModelComponent user={session.user} />
      ) : (
        <Link href="/sign-in">Sign in</Link>
      )}
    </div>
  );
}

const UserModelComponent = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          className="rounded-full border-2 border-[greenyellow]"
          src={user.image || '/default-avatar.png'} 
          width={40}
          height={40}
          alt={user.name || 'User avatar'}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Hi, {user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/profile/${user.username}`}>Go to profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};