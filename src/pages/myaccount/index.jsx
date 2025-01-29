import React from "react";
import { Link } from "react-router-dom";
import useGetUserDetails from "./../../hooks/useGetUserDetails";

const MyAccount = () => {
  const { user } = useGetUserDetails();
  // console.log(user);

  return (
    <div className="grid place-content-center place-items-center my-5">
      <p className="text-center mb-5">MyAccount</p>
      <div className="border flex flex-col items-center rounded sm:w-[300px] md:w-[400px] lg:w-[900px] p-10 gap-5">
        <p className="font-normal text-sm">Created by:</p>
        <img
          className="border rounded-full size-72 sm:size-80"
          src={
            user?.avatar ||
            "https://avatars.githubusercontent.com/u/90741749?v=4"
          }
          alt="user image"
        />
        <div className="text-center">
          <p className="font-bold">{user?.name}</p>
          <p className="font-bold">{user?.email}</p>
          <p className="font-bold">{user?.role}</p>
        </div>

        <a
          className="underline"
          href="https://avatars.githubusercontent.com/u/90741749?v=4"
        >
          @UserWork👌
        </a>
      </div>
    </div>
  );
};

export default MyAccount;
