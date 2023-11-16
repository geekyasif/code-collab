import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { setAuthToken, setUser } from "../../features/auth/AuthSlice";
import axios from "axios";
import SubmitButton from "../../components/authForm/SubmitButton";
import InputForm from "../../components/authForm/InputForm";

interface ICredential {
  email: string;
  password: string;
}

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authToken } = useAppSelector((state) => state.auth);
  const [credential, setCredetial] = useState<ICredential>({
    email: "",
    password: "",
  });

  const handleInputLogin = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCredetial((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginMe = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const { email, password }: ICredential = credential;

      const { data } = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });
      console.log(data.error);
      if (data.error) {
        console.log(data.error);
      } else {
        dispatch(setUser(data.data));
        dispatch(setAuthToken(data.accessToken));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authToken !== null) {
      navigate("/dashboard");
    }
  }, [authToken, navigate]);

  return (
    <div className="container mx-auto justify-center flex mt-4">
      <form onSubmit={handleLoginMe} className="border p-4">
        <InputForm
          label="Email"
          type="email"
          name="email"
          value={credential.email}
          onChange={handleInputLogin}
        />
        <InputForm
          label="Password"
          type="password"
          name="password"
          value={credential.password}
          onChange={handleInputLogin}
        />
        <br />
        <SubmitButton text="Sign in" />
      </form>
    </div>
  );
}

export default Login;
