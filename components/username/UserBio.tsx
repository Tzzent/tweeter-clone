'use client';

import { useState } from "react";
import { MdPersonAdd } from "react-icons/md";

import Avatar from "../Avatar";
import Button from "../buttons/Button";
import Card from "../Card";
import Modal from "../Modal";
import ToFollowItem from "../site/ToFollowItem";

export default function UserBio() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Daniel Jensen is following"
        className="
        max-h-72
        overflow-y-auto
        flex
        flex-col
        space-y-3
        md:max-h-[500px]
        "
      >
        <ToFollowItem />
        <ToFollowItem />
        <ToFollowItem />
        <ToFollowItem />
        <ToFollowItem />
        <ToFollowItem />
        <ToFollowItem />
        <ToFollowItem />
      </Modal>
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
                Daniel Jensen
              </h1>
              <div
                className="
              space-x-5
              text-xs
              "
              >
                <span
                  onClick={() => setIsModalOpen(true)}
                  className="
                  cursor-pointer
                  hover:underline
                  "
                >
                  <strong className="text-[#333333]">2,569</strong> Following
                </span>
                <span>
                  <strong className="text-[#333333]">10.8K</strong> Followers
                </span>
              </div>
              <p
                className="text-center"
              >
                Photographer & Filmmaker based in Copenhagen, Denmark ✵ 🇩🇰
              </p>
            </div>
            <div>
              <Button
                icon={MdPersonAdd}
                label="Follow"
                onClick={() => { }}
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
