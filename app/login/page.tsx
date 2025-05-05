import React from "react";
import Container from "../component/Container";
import FormWrap from "../component/FormWrap";
import LoginForm from "./LoginForm";
const LoginPage = () => {
  return (
    <Container>
      <FormWrap>
        <LoginForm />
      </FormWrap>
    </Container>
  );
};

export default LoginPage;
