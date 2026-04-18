import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useState } from "react";

const LoginPage = () => {
  const [LoginError, setLoginError] = useState(null);
  const { login } = useGlobalContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setLoginError(null);
    const result = await login(data.email, data.password);
    if (!result.success) {
      setLoginError(result.error);
    } else {
      navigate("/");
    }
  };

  return (
    <div>
<div className="flex justify-center m-10">
      {LoginError && (
        <div className="alert alert-error text-red-600 bg-red-100  w-fit rounded flex justify-center ">
          {LoginError}
        </div>
      )}
      </div>
      <form action="" className="flex justify-center m-5 md:m-40" onSubmit={handleSubmit(onSubmit)} method="post">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <h1 className="text-center text-4xl font-bold">Login</h1>
          <label className="label">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="input"
            placeholder="Email"
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}

          <label className="label">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum length is 8" },
            })}
            className="input"
            placeholder="Password"
            type="password"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}

          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-neutral mt-4"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginPage;
