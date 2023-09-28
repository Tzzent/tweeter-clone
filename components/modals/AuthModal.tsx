'use client';

import Image from "next/image";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { FormEvent, useCallback, useMemo, useState } from "react";

import useAuthModal from "@/hooks/useAuthModal";
import Input from "../inputs/Input";
import Modal from "../Modal";
import Button from "../buttons/Button";

type Variant = 'LOGIN' | 'REGISTER';

export default function AuthModal() {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const {
    isOpen,
    onClose,
  } = useAuthModal();

  const handleOnSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    console.log(name);
    console.log(email);
    console.log(password);
  };

  const handleToggle = useCallback(() => {
    if (variant === 'LOGIN') {
      return setVariant('REGISTER')
    }

    return setVariant('LOGIN');
  }, [variant]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Authentication"
      className="
      flex
      flex-col
      "
    >
      <div
        className="
        relative
        w-auto
        h-10
        my-5
        "
      >
        <Image
          alt="Logo"
          src="/images/tweeter.svg"
          fill
          objectFit="contain"
        />
      </div>

      <form
        onSubmit={handleOnSubmit}
        className="
        flex
        flex-col
        space-y-3
        my-8
        "
      >
        {variant === 'REGISTER' && (
          <Input
            placeholder="Name"
            type="text"
            onChange={(value) => setName(value)}
          />
        )}
        <Input
          placeholder="Email"
          type="email"
          onChange={(value) => setEmail(value)}
        />
        <Input
          placeholder="**********"
          type="password"
          onChange={(value) => setPassword(value)}
        />
        <Button
          type="submit"
          label={variant === 'LOGIN' ? 'Sign In' : 'Sign Up'}
          onClick={() => { }}
          className="text-base"
        />
      </form>

      <div
        className="
        border-t
        relative
        "
      >
        <p
          className="
            select-none
            w-fit
            mx-auto
            px-2
            text-xs
            text-gray-400
            bg-white
            absolute
            inset-0
            -top-2
            "
        >
          Or continue with
        </p>
      </div>

      <div
        className="
        mt-8
        grid
        grid-cols-2
        gap-5
        text-gray-500
        "
      >
        <div
          className="
          transition
          hover:scale-105
          cursor-pointer
          border
          rounded-lg
          p-2
          flex
          justify-center
          items-center
          "
        >
          <FaGoogle size={22} />
        </div>
        <div
          className="
          transition
          hover:scale-105
          cursor-pointer
          border
          rounded-lg
          p-2
          flex
          justify-center
          items-center
          "
        >
          <FaGithub size={22} />
        </div>
      </div>

      <div
        className="
          flex
          justify-center
          gap-x-2
          mt-8
          text-sm
          text-gray-500
          "
      >
        <p>
          {variant === 'LOGIN' ? 'New to Tweeter?' : 'Already have an account?'}
        </p>
        <button
          onClick={handleToggle}
          className="
            underline
            bg-transparent
            border-none
            outline-none
            hover:text-[#2F80ED]
            select-none
            "
        >
          {variant === 'LOGIN' ? 'Sign Up' : 'Sign In'}
        </button>
      </div>
    </Modal >
  )
}
