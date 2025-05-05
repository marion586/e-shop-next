"use client";

import React from "react";
import Heading from "../component/Heading";
import Horizontal from "../component/Horizontal";
import Input from "../component/inputs/Input";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Button from "../component/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

const RegisterForm = () => {
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
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      // Simulate a registration API call
      console.log("User registered:", data);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Heading title="Sign up for E~Shop" />

      <Button
        outline
        label="Sign up with google"
        icon={AiOutlineGoogle}
        onClick={() => {}}
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
