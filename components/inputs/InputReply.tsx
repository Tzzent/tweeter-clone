'use client';

import { User } from "@prisma/client";
import axios from "axios";
import clsx from "clsx";
import Image from "next/image";
import {
  ChangeEvent,
  ClipboardEvent,
  forwardRef,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlinePhoto } from "react-icons/md";

import Avatar from "../Avatar";
import useAuthModal from "@/hooks/useAuthModal";
import useReplies from "@/hooks/useReplies";

interface InputReplyProps {
  id: string,
  currentUser: User,
  disabled?: boolean,
  tweetId: string,
}

const InputReply = forwardRef<HTMLTextAreaElement, InputReplyProps>(
  function InputReply({
    id,
    currentUser,
    disabled,
    tweetId,
  }, ref) {
    const [loading, setLoading] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [image, setImage] = useState<File | string>('');

    const authModal = useAuthModal();

    const { data, mutate: mutateReplies } = useReplies(tweetId);

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleFileChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
      const file = ev.target?.files?.[0];

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
        setImage(file);
      }
    }, []);

    const handleOnPaste = useCallback((ev: ClipboardEvent) => {
      const items = ev.clipboardData?.items;

      if (items) {
        for (let i = 0; i < items.length; i++) {
          const file = items[i].getAsFile();

          if (file && file.type.includes('image')) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            setImage(file);
          }
        }
      }
    }, []);

    const handleOnRemoveImage = useCallback(() => {
      setPreviewImage(null);
      setImage('');

      // We select the input and execute the focus event
      document.getElementById(id)?.focus();
    }, [id]);

    const handleOnChange = useCallback((ev: ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(ev.target.value);
      ev.target.style.height = 'auto';
      ev.target.style.height = ev.target.scrollHeight + 'px';
    }, []);

    const onSubmit = useCallback(() => {
      if (!inputValue) {
        return;
      }

      if (!currentUser) {
        return authModal.onOpen();
      }

      setLoading(true);

      const formData = new FormData();
      formData.append('body', inputValue);
      formData.append('image', image);

      axios.post(`/api/tweets/${tweetId}/reply`, formData)
        .then((res) => {
          toast.success('You just made a reply!');
          setInputValue('');
          setPreviewImage('');
          setImage('')
          mutateReplies({
            replies: [res.data, ...data.replies],
            hasMore: data.hasMore,
          }, false);
        })
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => setLoading(false));
    }, [
      authModal,
      currentUser,
      mutateReplies,
      inputValue,
      tweetId,
      image,
      data?.hasMore,
      data?.replies,
    ]);

    const handleKeyDown = useCallback((ev: KeyboardEvent<HTMLTextAreaElement>) => {
      if (ev.key === 'Enter' && !ev.shiftKey) {
        ev.preventDefault();
        onSubmit();
      }
    }, [onSubmit]);

    return (
      <div
        className={clsx(`
        w-full
        flex
        items-start
        `,
          (disabled || loading) && 'opacity-50 pointer-events-none',
          (disabled || loading) && 'select-none'
        )}
      >
        <Avatar src={currentUser?.image} />
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
            id={id}
            ref={ref}
            disabled={(disabled || loading)}
            onChange={handleOnChange}
            onPaste={handleOnPaste}
            onKeyDown={handleKeyDown}
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
            disabled:placeholder:text-gray-300
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
                onClick={handleOnRemoveImage}
                size={30}
                color="#2F80ED"
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
                priority
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 640px, 1000px"
              />
            </div>
          )}
          <input
            id="select-image-reply"
            ref={inputFileRef}
            onChange={handleFileChange}
            disabled={(disabled || loading)}
            accept="image/*"
            type="file"
            hidden
          />
          <MdOutlinePhoto
            onClick={() => inputFileRef.current?.click()}
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
);

export default InputReply;