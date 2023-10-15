'use client';

import Image from "next/image";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { FormEvent, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

import useAuthModal from "@/hooks/useAuthModal";
import Input from "../inputs/Input";
import Modal from "../Modal";
import Button from "../buttons/Button";

type Variant = 'LOGIN' | 'REGISTER';

interface AuthModalProps {
  isOpen?: boolean,
  onClose?: () => void,
}

export default function AuthModal({
  isOpen,
  onClose,
}: AuthModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const router = useRouter();

  const { isOpen: isModalOpen, onClose: onCloseModal } = useAuthModal();

  const handleOnSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    setLoading(true);

    if (variant === 'LOGIN') {
      signIn('credentials', {
        email,
        password,
        redirect: false,
      })
        .then((cb) => {
          if (cb?.error) {
            toast.error(cb.error);
          }

          if (cb?.ok && !cb?.error) {
            (isOpen && onClose) ? onClose() : onCloseModal();
            toast.success('Logged in successfully!');
            router.refresh();
          }
        })
        .finally(() => setLoading(false));
    }

    if (variant === 'REGISTER') {
      axios.post('/api/register', {
        name,
        email,
        password,
      })
        .then((res) => {
          (isOpen && onClose) ? onClose() : onCloseModal();
          toast.success('You have successfully registered!');
          signIn('credentials', {
            email,
            password,
            redirect: false,
          });
          router.refresh();
        })
        .catch((err) => toast.error(err?.response?.data))
        .finally(() => setLoading(false));
    }
  };

  const handleToggle = useCallback(() => {
    if (variant === 'LOGIN') {
      return setVariant('REGISTER')
    }

    return setVariant('LOGIN');
  }, [variant]);

  const socialAction = useCallback((action: string) => {
    setLoading(true);
    signIn(action).finally(() => setLoading(false));
  }, []);

  return (
    <Modal
      isOpen={isOpen || isModalOpen}
      onClose={onCloseModal}
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
          priority
          className="object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 640px, 1000px"
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
          disabled={loading}
          label={variant === 'LOGIN' ? 'Sign In' : 'Sign Up'}
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
          onClick={() => socialAction('google')}
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
          onClick={() => socialAction('github')}
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
