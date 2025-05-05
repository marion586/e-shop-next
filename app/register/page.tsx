import React from "react";
import Container from "../component/Container";
import FormWrap from "../component/FormWrap";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <Container>
      <FormWrap>
        <RegisterForm />
      </FormWrap>
    </Container>
  );
};

export default Register;
