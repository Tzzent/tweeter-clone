'use client';

import { MdOutlinePhoto } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ChangeEvent, useCallback, useState } from "react";

import Avatar from "../Avatar";
import Button from "../buttons/Button";
import Image from "next/image";
import QuestionReply from "./QuestionReply";
import Card from "../Card";

export default function Form() {
  const [inputValue, setInputValue] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleSelectImage = useCallback(() => {
    const inputEl = document.createElement('input') as HTMLInputElement;

    inputEl.type = 'file';
    inputEl.accept = 'image/*';

    inputEl.addEventListener('change', (ev) => {
      const files = (ev.target as HTMLInputElement)?.files;

      if (files && files[0]) {
        setImage(files[0]);
        setPreviewImage(URL.createObjectURL(files[0]));
      }
    });

    inputEl.click();
  }, []);

  const handleOnChange = useCallback((ev: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(ev.target.value);

    ev.target.style.height = 'auto';
    ev.target.style.height = ev.target.scrollHeight + 'px';
  }, []);

  const handleOnTweet = useCallback(() => {
    console.log(
      {
        description: inputValue,
        image: image,
      }
    )
  }, [
    image,
    inputValue,
  ]);

  return (
    <Card title="Tweet something">
      {/* Body */}
      <div
        className="
        flex
        my-3
        "
      >
        <Avatar />
        <div
          className="
          pt-1
          px-2
          w-full
          max-h-60
          overflow-y-auto
          "
        >
          <textarea
            placeholder="What's happening?"
            onChange={handleOnChange}
            value={inputValue}
            className="
            resize-none
            w-full
            outline-none
            overflow-y-hidden
            h-auto
            scrollbar-none
            "
          />
          {previewImage && (
            <div
              className="
              relative
              w-full
              h-60
              rounded-lg
              overflow-hidden
              "
            >
              <AiOutlineCloseCircle
                onClick={() => setPreviewImage(null)}
                size={30}
                color="#FFFFFF"
                className="
                absolute
                right-2
                top-2
                z-10
                "
              />
              <Image
                alt="Preview Image"
                src={previewImage}
                fill
                objectFit="cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        className="
        flex
        items-center
        justify-between
        space-x-3
        text-[#2F80ED]
        "
      >
        <div
          className="
          flex
          items-center
          text-xs
          "
        >
          <MdOutlinePhoto
            onClick={handleSelectImage}
            size={20}
            className="
            cursor-pointer
            "
          />
          <QuestionReply />
        </div>
        <Button
          onClick={handleOnTweet}
          label="Tweet"
        />
      </div>
    </Card>
  )
}
