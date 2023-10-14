'use client';

import { MdOutlinePhoto } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  ChangeEvent,
  ClipboardEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  useForm,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Visibility } from "@prisma/client";

import Avatar from "../Avatar";
import Button from "../buttons/Button";
import Image from "next/image";
import QuestionReply from "./QuestionReply";
import Card from "../Card";
import useCurrentUser from "@/hooks/useCurrentUser";

export interface FormTweetRequest {
  image: File | null,
  body: string,
  audience: Visibility,
}

export default function Form() {
  const [loading, setLoading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { data: currentUser, isLoading } = useCurrentUser();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    setValue,
    register,
    reset,
    formState: {
      errors,
    }
  } = useForm<FormTweetRequest>({
    defaultValues: {
      image: null,
      body: '',
      audience: 'EVERYONE',
    }
  });

  const handleOnPaste: ClipboardEventHandler<HTMLTextAreaElement> = useCallback((ev) => {
    const items = ev.clipboardData?.items;

    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();

        if (!file) return;

        const imageUrl = URL.createObjectURL(file);

        setPreviewImage(imageUrl);
        setValue('image', file);
      }
    }
  }, [setValue]);

  const handleFileChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev.target?.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPreviewImage(imageUrl);
    setValue('image', file);
  }, [setValue]);

  const handleOnChange = useCallback((ev: ChangeEvent<HTMLTextAreaElement>) => {
    ev.target.style.height = 'auto';
    ev.target.style.height = ev.target.scrollHeight + 'px';
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = useCallback((data) => {
    setLoading(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios.post('/api/tweets', formData)
      .then((res) => {
        toast.success('You just tweeted something!');
        setPreviewImage(null);
        reset();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [reset]);

  if (!currentUser?.id) {
    return null;
  }

  return (
    <Card title="Tweet something">
      <form
        id="initial-form"
        onSubmit={handleSubmit(onSubmit)}
      >

        {/* Body */}
        <div className="flex my-3 relative">
          <Avatar src={currentUser?.image} />
          <div
            className="
            pt-1
            px-2
            w-full
            max-h-60
            overflow-y-auto
            scrollbar-thin
            scrollbar-thumb-rounded-full
            scrollbar-track-rounded-full
            scrollbar-thumb-sky-700 
            scrollbar-track-gray-300
            "
          >
            {errors.body && (
              <p
                className="
                absolute
                -top-10
                right-0
                text-right
                text-xs
                text-red-400
                "
              >
                {errors.body.message}
              </p>
            )}
            <textarea
              id="input-happening"
              placeholder="What's happening?"
              {...register('body', {
                validate: (value) => {
                  const hashtags = value.match(/#[a-zA-Z0-9-_]+/g) || [];

                  if (hashtags?.length > 1) {
                    return 'Only one #trend is allowed!'
                  }

                  return true;
                },
                required: 'Please write some text!',
              })}
              onChange={handleOnChange}
              onPaste={handleOnPaste}
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
                h-96
                rounded-lg
                overflow-hidden
                "
              >
                <AiOutlineCloseCircle
                  onClick={() => setPreviewImage(null)}
                  size={30}
                  color="#2F80ED"
                  className="
                  transition-all
                  ease-in-out
                  duration-200
                  absolute
                  right-2
                  top-2
                  z-10
                  cursor-pointer
                  hover:scale-110
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
          {/* Input Hidden File */}
          <input
            id="select-file-form"
            ref={inputFileRef}
            onChange={handleFileChange}
            accept="image/*"
            type="file"
            hidden
          />
          <div
            className="
            flex
            items-center
            text-xs
            "
          >
            <MdOutlinePhoto
              onClick={() => inputFileRef.current?.click()}
              size={20}
              className="cursor-pointer"
            />
            <QuestionReply setValue={setValue} />
          </div>
          <Button
            disabled={loading}
            type="submit"
            label="Tweet"
          />
        </div>
      </form>
    </Card>
  )
}
