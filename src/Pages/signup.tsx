import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, useUserDetail } from "../contexts";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";

export const SignUp = () => {
    const { status, signUpUserWithCreds } = useAuth();
  //   const { userDetailsDispatch } = useUserDetail();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [signUpCredentials, setSignUpCredentials] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    message: "",
  });

    const signUpUser = async () => {
      if (
        signUpCredentials.email &&
        signUpCredentials.username &&
        signUpCredentials.password
      ) {
        if (
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            signUpCredentials.email
          )
        ) {
          if (signUpCredentials.password === signUpCredentials.confirmPassword) {
           await signUpUserWithCreds(
              signUpCredentials.username,
              signUpCredentials.password,
              signUpCredentials.email
            );
            // if (result.success) {
            //   // userDispatch({ type: "ADD_USER", payload: result.user._id });
            //   navigate(state?.from ? state.from : "/");
            // }
          } else {
            setSignUpCredentials({
              ...signUpCredentials,
              message: "Passwords doesn't Match",
            });
          }
        } else {
          setSignUpCredentials({
            ...signUpCredentials,
            message: "Enter a valid email id",
          });
        }
      } else {
        setSignUpCredentials({
          ...signUpCredentials,
          message: "Every field is required",
        });
      }
    };

  return (
    <div className="max-w-screen-xl w-full mt-32 mx-auto mb-8">
      <div className="py-12 px-16 w-max flex flex-col items-center m-auto shadow-lg rounded-lg ">
        <h1 className=" text-2xl font-semibold text-secondaryDark">SignUp</h1>{" "}
        <h3 className="fixed z-10 pt-40  top-0  h-full overflow-auto bg-opacity-10">
          {status?.loading && (
            <img src="/Images/Loading.svg" alt="loading" />
          )}
        </h3>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center align-middle my-4 mx-auto"
        >
          <div className="flex flex-col w-60 m-4 justify-start">
            <label className="mb-2 font-medium text-slate-900 self-start">
              <FaEnvelope className="inline" /> Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="text-slate-900 font-medium p-2 border-2 border-gray-400 "
              required
              value={signUpCredentials.email}
              onChange={(e) =>
                setSignUpCredentials(() => ({
                  ...signUpCredentials,
                  email: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col w-60 m-4">
            <label className="mb-2 font-medium text-slate-900 self-start">
              <FaUser className="inline" /> Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="text-slate-900 font-medium p-2 border-2 border-gray-400 "
              required
              value={signUpCredentials.username}
              onChange={(e) =>
                setSignUpCredentials(() => ({
                  ...signUpCredentials,
                  username: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col w-60 m-4 relative">
            <label className="mb-2 font-medium text-slate-900 self-start">
              <FaLock className="inline" /> Password
            </label>
            <input
              className="text-slate-900 font-medium p-2 border-2 border-gray-400 "
              placeholder="Enter password"
              required
              type={signUpCredentials.showPassword ? "text" : "password"}
              value={signUpCredentials.password}
              onChange={(e) =>
                setSignUpCredentials(() => ({
                  ...signUpCredentials,
                  password: e.target.value,
                }))
              }
            />

            <button
              className="text-slate-900 absolute right-3 top-11"
              onClick={() =>
                setSignUpCredentials(() => ({
                  ...signUpCredentials,
                  showPassword: !signUpCredentials.showPassword,
                }))
              }
            >
              {signUpCredentials.showPassword ? <FaEye /> : <FaEyeSlash />}{" "}
            </button>
          </div>

          <div className="flex flex-col w-60 m-4 relative">
            <label className="mb-2 font-medium text-slate-900 self-start">
              <FaLock className="inline" /> Confirm Password
            </label>
            <input
              className="text-slate-900 font-medium p-2 border-2 border-gray-400 "
              placeholder="Confirm Password"
              required
              type={signUpCredentials.showConfirmPassword ? "text" : "password"}
              value={signUpCredentials.confirmPassword}
              onChange={(e) =>
                setSignUpCredentials(() => ({
                  ...signUpCredentials,
                  confirmPassword: e.target.value,
                }))
              }
            />

            <button
              className="text-slate-900 absolute right-3 top-11"
              onClick={() =>
                setSignUpCredentials(() => ({
                  ...signUpCredentials,
                  showConfirmPassword: !signUpCredentials.showConfirmPassword,
                }))
              }
            >
              {signUpCredentials.showConfirmPassword ? (
                <FaEye />
              ) : (
                <FaEyeSlash />
              )}
            </button>
          </div>

          <p>{signUpCredentials.message}</p>

          <button
            className="py-2 px-4 m-4 block w-fit rounded-lg bg-primaryCoral shadow-lg active:shadow-gray-300 text-white font-bold"
            onClick={signUpUser}
          >
            Sign Up
          </button>

          <small className="text-lg text-secondaryDark">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-primaryCoral hover:underline">Login!</span>
            </Link>
          </small>
        </form>

      </div>
    </div>
  );
};
