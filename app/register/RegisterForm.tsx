"use client";

import React, { useEffect } from "react";
import Heading from "../component/Heading";
import Horizontal from "../component/Horizontal";
import Input from "../component/inputs/Input";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Button from "../component/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface RegisterFormProps {
  currentUser?: SafeUser | null | undefined;
}
const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, [currentUser, router]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      // Simulate a registration API call
      axios.post("/api/register", data).then((response) => {
        console.log("Registration successful:", response.data);
        toast.success("Registration successful");
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        })
          .then((callback) => {
            if (callback?.error) {
              toast.error("Invalid credentials");
            }
            if (callback?.ok && !callback?.error) {
              router.push("/cart");
              router.refresh();
              toast.success("Logged in successfully");
            }
          })
          .catch((error) => {
            console.error("Error during sign-in:", error);
            toast.error("Sign-in error");
          })
          .finally(() => {
            setIsLoading(false);
          });
      });
      console.log("User registered:", data);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (currentUser) {
    return (
      <p className="text-center text-2xl font-bold">Logged in Redirecting</p>
    );
  }
  return (
    <>
      <Heading title="Sign up for E~Shop" />

      <Button
        outline
        label="Continue with google"
        icon={AiOutlineGoogle}
        onClick={() => {
          signIn("google");
        }}
      />
      <Horizontal width="full" height="h-[1px]" color="bg-slate-300" />

      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />

      <Button
        label={isLoading ? "Loading..." : "Sign Up"}
        onClick={handleSubmit(onSubmit)}
      />

      <p className="text-sm">
        {" "}
        Aready have an account ?<Link href="/login"> Log in</Link>
      </p>
    </>
  );
};

export default RegisterForm;
