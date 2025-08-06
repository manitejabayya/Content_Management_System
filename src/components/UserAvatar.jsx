"use client";

import Image from "next/image";

const UserAvatar = ({ user }) => {
  return (
    <Image
      className="rounded-full border-2 border-[greenyellow]"
      src={user?.image || '/defalut-avatar.jpg'}
      width={40}
      height={40}
      alt={user?.name || 'User avatar'}
      onError={(e) => {
        e.currentTarget.onerror = null; // prevents looping
        e.currentTarget.src = "/defalut-avatar.jpg";
      }}
    />
  );
};

export default UserAvatar;
