import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setAuthToken, setUser } from "../../features/auth/AuthSlice";
import axios from "../../axios/axios";
import { AxiosResponse } from "axios";
import InputForm from "../../components/authForm/InputForm";
import SubmitButton from "../../components/authForm/SubmitButton";

interface IRegister {
  fullname: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface IUser {
  id: string;
  fullname: string;
  username: string | undefined;
  email: string | null;
}

interface IRegsiterPostRequest {
  url: string;
  data: {
    [key: string]: string;
  };
}

function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { authToken } = useAppSelector((state) => state.auth);
  const [registration, setRegistration] = useState<IRegister>({
    fullname: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleInputRegistration = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setRegistration((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkValidation = ({
    fullname,
    email,
    password,
    confirm_password,
  }: IRegister): boolean => {
    if (
      fullname === "" ||
      email === "" ||
      password === "" ||
      confirm_password === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  // Handling Registration from
  const handleRegisterMe = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // checking validation
    if (checkValidation(registration)) {
      const { email, password, confirm_password, fullname }: IRegister =
        registration;

      // creating new account
      try {
        const { data }: AxiosResponse = await axios.post("register", {
          first_name: fullname?.split(" ")[0],
          last_name: fullname?.split(" ")[1],
          email,
          password,
          confirm_password,
        });

        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data.data);
          dispatch(setUser(data.data));
          dispatch(setAuthToken(data.accessToken));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please fill all the fields !");
    }
  };

  useEffect(() => {
    if (authToken !== null) {
      navigate("/dashboard");
    }
  }, [authToken, navigate]);

  return (
    <div className="container mx-auto justify-center flex mt-4">
      <form onSubmit={handleRegisterMe} className="border p-4">
        <InputForm
          label="Full Name"
          type="text"
          name="fullname"
          value={registration.fullname}
          onChange={handleInputRegistration}
        />

        <InputForm
          label="Email"
          type="email"
          name="email"
          value={registration.email}
          onChange={handleInputRegistration}
        />

        <InputForm
          label="Password"
          type="password"
          name="password"
          value={registration.password}
          onChange={handleInputRegistration}
        />

        <InputForm
          label="Confirm Password"
          type="password"
          name="confirm_password"
          value={registration.confirm_password}
          onChange={handleInputRegistration}
        />

        <SubmitButton text="Sign up" />
      </form>
    </div>
  );
}

export default Register;
