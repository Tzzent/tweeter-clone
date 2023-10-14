'use client';

import Image from "next/image";
import { MdPhotoSizeSelectActual, MdPhotoCamera } from "react-icons/md";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  ChangeEvent,
  useCallback,
  useRef,
  useState
} from "react";
import axios from "axios";

import Avatar from "../Avatar";
import Button from "../buttons/Button";
import Modal from "../Modal";
import Input from "../inputs/Input";
import InputArea from "../inputs/InputArea";
import useCurrentUser from "@/hooks/useCurrentUser";

type VariantChange = 'AVATAR' | 'COVER';

interface ProfileModalProps {
  isOpen: boolean,
  onClose: () => void,
}

export default function ProfileModal({
  isOpen,
  onClose,
}: ProfileModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: currentUser, isLoading, mutate } = useCurrentUser();

  const [previewCover, setPreviewCover] = useState(currentUser?.coverImage);
  const [previewAvatar, setPreviewAvatar] = useState(currentUser?.image);

  const [toChange, setToChange] = useState<VariantChange>('AVATAR');
  const inputFile = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      coverImage: null,
      image: null,
      name: currentUser?.name,
      username: currentUser?.username,
      bio: currentUser?.bio,
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = useCallback((data) => {
    if (!currentUser?.id) {
      return;
    }

    setLoading(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios.put(`/api/users/${currentUser.id}`, formData)
      .then((res) => {
        toast.success('Your profile has been updated!');
        mutate(res.data, false);
        onClose();
      })
      .catch((err) => {
        toast.error(err.response.data);
      })
      .finally(() => setLoading(false));
  }, [
    currentUser?.id,
    onClose,
    mutate,
  ]);

  const handleOverlayClick = useCallback((changeType: VariantChange) => {
    setToChange(changeType);
    inputFile.current?.click();
  }, []);

  const handleOnChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev.target?.files?.[0];

    if (!file) return;

    ev.target.value = ''; //-> We need this trick to select the same file

    const imageUrl = URL.createObjectURL(file);

    if (toChange === 'AVATAR') {
      setValue('image', file);
      setPreviewAvatar(imageUrl);
    }

    if (toChange === 'COVER') {
      setValue('coverImage', file);
      setPreviewCover(imageUrl);
    }
  }, [
    toChange,
    setValue,
  ]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Profile"
    >
      <form
        id="update-profile"
        name="update-profile"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Cover & Profile */}
        <div
          className="
          relative
          mt-5
          "
        >
          {/* The input to select an image */}
          <input
            id="select-image"
            ref={inputFile}
            type="file"
            accept="image/*"
            onChange={handleOnChange}
            hidden
          />
          <div
            className="
            cursor-pointer
            relative
            w-full
            h-32
            rounded-lg
            overflow-hidden
            group/wp
            "
          >
            <Image
              src={previewCover || "/images/wp-test2.jpg"}
              alt="Wallpaper"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 640px, 1000px"
            />
            <div //-> Overlay
              onClick={() => handleOverlayClick('COVER')}
              className="
              absolute
              inset-0
              bg-black/50
              justify-center
              items-center
              text-gray-100
              hidden
              group-hover/wp:flex
              "
            >
              <MdPhotoSizeSelectActual size={30} />
            </div>
          </div>
          <div
            className="
            cursor-pointer
            absolute
            z-10
            left-5
            -bottom-8
            group/avatar
            rounded-xl
            overflow-hidden
            "
          >
            <Avatar
              src={previewAvatar}
              medium
              hasBorder
            />
            <div //-> Overlay
              onClick={() => handleOverlayClick('AVATAR')}
              className="
              absolute
              inset-0
              bg-black/40
              justify-center
              items-center
              text-gray-100
              hidden
              group-hover/avatar:flex
              "
            >
              <MdPhotoCamera size={30} />
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div
          className="
          mt-10
          flex
          flex-col
          space-y-3
          "
        >
          <Input
            id="name"
            type="text"
            placeholder="Name"
            register={register}
            errors={errors}
            rules={{
              required: true
            }}
          />
          <Input
            id="username"
            type="text"
            placeholder="Username"
            register={register}
            errors={errors}
            rules={{
              required: true
            }}
          />
          <InputArea
            id="bio"
            placeholder="Bio"
            register={register}
            errors={errors}
            rules={{
              required: true
            }}
          />
        </div>

        {/* Buttons */}
        <div
          className="
          mt-5
          flex
          justify-end
          "
        >
          <Button
            disabled={isLoading || loading}
            type="submit"
            label="Save"
          />
        </div>
      </form>
    </Modal>
  )
}
