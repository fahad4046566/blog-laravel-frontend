import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useState } from "react";

const RegisterPage = () => {
  const [registerError, setregisterError] = useState(null);
  const { registerUser } = useGlobalContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setregisterError(null);
    const result = await registerUser(
      data.firstName,
      data.email,
      data.password,
      data.confirmPassword,
    );
    if (!result.success) {
      setregisterError(result.error);
    } else {
      navigate("/");
    }
  };
  return (
    <div>
      <div className="flex justify-center m-10">
      {registerError && (
        <div className="alert alert-error text-red-600 bg-red-100  w-fit rounded flex justify-center ">
          {registerError}
        </div>
      )}
      </div>
       <form action="" className="flex justify-center m-5 md:m-30" onSubmit={handleSubmit(onSubmit)} method="post">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs  border p-4 ">
          <h1 className="text-center text-4xl font-bold">Register</h1>
          <label className="label">Name</label>
          <input
            {...register("firstName", {
              required: "First name is required",
              minLength: { value: 2, message: "Too short" },
            })}
            className="input"
            placeholder="Enter Your Name"
          />
          {errors.firstName && (
            <div className="text-red-500">{errors.firstName.message}</div>
          )}
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
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}

          <label className="label">Confirm Password</label>
          <input
            {...register("confirmPassword", {
              validate: (val) =>
                val === watch("password") || "Passwords do not match",
            })}
            className="input"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <div className="text-red-500">{errors.confirmPassword.message}</div>
          )}
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-neutral mt-4"
          >
            {isSubmitting ? "Register processing please wait..." : "Register"}
          </button>
          <p>Do you have an account? <NavLink to={"/login"} className="link link-primary">Login</NavLink></p>
        </fieldset>
      </form>
    </div>
  );
};

export default RegisterPage;
