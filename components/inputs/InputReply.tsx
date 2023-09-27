'use client';

import Image from "next/image";
import {
  ChangeEvent,
  ClipboardEvent,
  useCallback,
  useState,
} from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlinePhoto } from "react-icons/md";

import Avatar from "../Avatar";

export default function InputReply() {
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

  const handleOnPaste = useCallback((ev: ClipboardEvent) => {
    const items = ev.clipboardData?.items;

    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();

        if (!blob) return;

        const imageUrl = URL.createObjectURL(blob);

        setPreviewImage(imageUrl);
      }
    }
  }, []);

  const handleOnChange = useCallback((ev: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(ev.target.value);

    ev.target.style.height = 'auto';
    ev.target.style.height = ev.target.scrollHeight + 'px';
  }, []);

  return (
    <div
      className="
      w-full
      flex
      items-start
      "
    >
      <Avatar />
      <div
        className="
        px-2
        pt-1.5
        ml-2
        relative
        w-full
        max-h-60
        overflow-y-auto
        border
        bg-[#FAFAFA]
        rounded-lg
        overflow-hidden
        scrollbar-thin
        scrollbar-thumb-rounded-full
        scrollbar-track-rounded-full
        scrollbar-thumb-sky-700 
        scrollbar-track-gray-300  
        "
      >
        <textarea
          onChange={handleOnChange}
          onPaste={handleOnPaste}
          value={inputValue}
          placeholder="Tweet your reply"
          rows={1}
          className="
          bg-transparent
          outline-none
          w-full
          pr-9
          text-black
          resize-none
          placeholder:text-sm
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
            my-2
            "
          >
            <AiOutlineCloseCircle
              onClick={() => setPreviewImage(null)}
              size={30}
              color="#FFFFFF"
              className="
              cursor-pointer
              transition
              hover:scale-105
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
        <MdOutlinePhoto
          onClick={handleSelectImage}
          size={20}
          color="#BDBDBD"
          className="
          cursor-pointer
          absolute
          right-2
          top-2
          my-auto
          "
        />
      </div>
    </div>
  )
}
