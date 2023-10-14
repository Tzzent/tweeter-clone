'use client';

import useCurrentUser from "@/hooks/useCurrentUser";
import { User } from "@prisma/client";
import { useState } from "react";
import { MdPersonAdd } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

import Avatar from "../Avatar";
import Button from "../buttons/Button";
import Card from "../Card";
import FollowingModal from "../modals/FollowingModal";
import ProfileModal from "../modals/ProfileModal";
import useFollow from "@/hooks/useFollow";

interface UserBioProps {
  isloading: boolean,
  user?: User | null,
}

export default function UserBio({
  isloading,
  user,
}: UserBioProps) {
  const [profilOpen, setProfileOpen] = useState<boolean>(false);
  const [followingOpen, setFollowingOpen] = useState<boolean>(false);

  const { hasFollow, toggleFollow } = useFollow(user?.username);

  const { data: currentUser } = useCurrentUser();

  if (isloading || !user) {
    return null;
  }

  return (
    <>
      <ProfileModal
        isOpen={(profilOpen)}
        onClose={() => setProfileOpen(false)}
      />
      <FollowingModal
        isOpen={followingOpen}
        onClose={() => setFollowingOpen(false)}
        user={user}
        onOpenProfile={() => setProfileOpen(true)}
      />
      <div
        className="
        -mt-6
        px-3
        z-10
        w-full
        md:max-w-7xl
        md:mx-auto
        "
      >
        <Card
          className="
          text-[#828282]
          flex
          flex-col
          items-center
          space-y-5
          px-3
          relative
          md:flex-row
          md:space-y-0
          "
        >
          <div
            className="
            absolute
            -top-24
            md:relative
            md:-top-10
            "
          >
            <Avatar
              src={user?.image}
              medium
              hasBorder
            />
          </div>
          <div
            className="
            flex
            flex-col
            items-center
            gap-y-3
            md:flex-row
            md:items-start
            md:w-full
            "
          >
            <div
              className="
              flex
              flex-col
              items-center
              space-y-2
              md:items-start
              md:ml-5
              md:justify-between
              md:w-full        
              "
            >
              <h1
                className="
                text-[#333333]
                font-bold
                text-2xl
                "
              >
                {user.name}
              </h1>
              <div
                className="
                space-x-5
                text-xs
                "
              >
                <span
                  onClick={() => setFollowingOpen(true)}
                  className="
                  cursor-pointer
                  hover:underline
                  "
                >
                  <strong className="text-[#333333]">{user.followingIds.length}</strong> Following
                </span>
                <span>
                  <strong className="text-[#333333]">{user.followerIds.length}</strong> Followers
                </span>
              </div>
              <p
                className="text-center"
              >
                {user?.bio}
              </p>
            </div>
            <div className="flex-shrink-0">
              {currentUser?.username === user.username
                ? (
                  <Button
                    onClick={() => setProfileOpen(true)}
                    icon={FaUserEdit}
                    label="Edit profile"
                    outline
                  />
                ) : (
                  <Button
                    icon={hasFollow ? null : MdPersonAdd}
                    label={hasFollow ? "Following" : "Follow"}
                    onClick={toggleFollow}
                  />
                )}
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
