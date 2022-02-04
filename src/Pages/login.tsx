import React from "react";
// import { useAuth } from "../contexts/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";

export function Login() {
  //   const { status, loginUserWithCreds } = useAuth();
  //   const { state } = useLocation();
  //   const navigate = useNavigate();
  //   const [loginCredentials, setLoginCredentials] = useState({
  //     username: "",
  //     password: "",
  //     message: "",
  //     showPassword: false,
  //   });

  //   const loginUser = async () => {
  //     if (loginCredentials.username && loginCredentials.password) {
  //       const result = await loginUserWithCreds(
  //         loginCredentials.username,
  //         loginCredentials.password
  //       );

  //       if (result.success) {
  //         navigate(state?.from ? state.from : "/");
  //       }
  //     } else {
  //       setLoginCredentials({
  //         ...loginCredentials,
  //         message: "Username & Password required",
  //       });
  //     }
  //   };

  return (
    <div className="max-w-screen-xl w-full mt-32 mx-auto">
      <div className="py-12 px-16 w-max flex flex-col items-center m-auto shadow-lg rounded-lg ">
        <h2 className=" text-3xl font-semibold text-secondaryDark">Login</h2>
        {/* <h3 className="fixed z-10 pt-40  top-0  h-full overflow-auto bg-opacity-10">
          {(
            <img src="/Images/loading.svg" alt="loading" />
          )}
        </h3> */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center align-middle my-4 mx-auto"
        >
          <div className="flex flex-col w-60 m-4 justify-start">
            <label className="mb-2 font-medium text-slate-900 self-start">
              <FaUser className="inline" /> Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="text-slate-900 font-medium p-2 border-2 border-gray-400 "
              required
              //   value={loginCredentials.username}
              //   onChange={(e) =>
              //     setLoginCredentials(() => ({
              //       ...loginCredentials,
              //       msg: "",
              //       username: e.target.value,
              //     }))
              //   }
            />
          </div>

          <div className="flex flex-col w-60 m-4 relative">
            <label className="mb-2  font-medium text-slate-900 self-start">
              <FaLock className="inline " /> Password
            </label>
            <input
              type="text"
              //   type={loginCredentials.showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="text-slate-900 font-medium  p-2 border-2 border-gray-400"
              required
              //   value={loginCredentials.password}
              //   onChange={(e) =>
              //     setLoginCredentials(() => ({
              //       ...loginCredentials,
              //       msg: "",
              //       password: e.target.value,
              //     }))
              //   }
            />

            <button
              className="text-slate-900 absolute right-3 top-11"
              //   onClick={() =>
              //     setLoginCredentials(() => ({
              //       ...loginCredentials,
              //       showPassword: !loginCredentials.showPassword,
              //     }))
              //   }
            >
              <FaEye />
              {/* {loginCredentials.showPassword ? <FaEye /> : <FaEyeSlash />} */}
            </button>
          </div>
          {/* <p>{loginCredentials.msg}</p> */}
          <button
            className="py-2 px-4 m-4 block w-fit rounded-lg bg-primaryCoral shadow-lg active:shadow-gray-300 text-white font-bold"
            // onClick={loginUser}
          >
            Login
          </button>
          <small className="text-lg text-secondaryDark">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="text-primaryCoral hover:underline">
                {" "}
                Sign up!
              </span>
            </Link>
          </small>
        </form>
      </div>
    </div>
  );
}
