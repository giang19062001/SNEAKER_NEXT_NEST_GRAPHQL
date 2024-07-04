"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Login from "./login";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import "../assets/css/header.css";
import Image from "next/image";
import Logo from "../../../public/img/logo.png";
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()

  const [scrolled, setScrolled] = useState(false);
  const pathName = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 750); // Change 50 to the desired scroll value
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { data: session, status } = useSession();
  console.log("session", session);

  const sneakerCart = useSelector((state: any) => state.order.list);
  const [open, setOpen] = useState(false);

  const openLogin = () => {
    setOpen(true);
  };
  const closeLogin = () => {
    setOpen(false);
  };

  const gotoInfoPage = () =>{
    router.push('/pages/user')

  }
  return (
    <>
      <Login open={open} callbackClose={closeLogin}></Login>
      <header
        className={` ${scrolled ? "scrolled" : ""} ${
          pathName === "/" ? "" : "notIndex"
        }`}
      >
        <div className=" w-full  mx-auto container">
          <a className="logo" href="/">
            <Image alt="" src={Logo} className="img" width={50} height={50} />
          </a>
          <nav className="">
            <ul>
              <li>
                <a
                  className="pr-1 relative inline-flex no-underline "
                  href="/pages/order"
                >
                  CART&ensp;
                  <svg
                    className="fill-current align-middle"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z" />
                    <circle cx="10.5" cy="18.5" r="1.5" />
                    <circle cx="17.5" cy="18.5" r="1.5" />
                  </svg>
                  <span className="absolute rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4 bg-red-500 text-white min-w-[24px] min-h-[24px]">
                    {sneakerCart.length}
                  </span>
                </a>
              </li>
              <li>
                {session?.user ? (
                //  <div className="inline-block" onClick={() => signOut()}>

                  <div className="inline-block" onClick={() => gotoInfoPage()}>
                    <img
                      src={session?.user.image ? session?.user.image : ""}
                      className="rounded-full cursor-pointer"
                      style={{ height: "40px", width: "40px" }}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <a
                    className="inline-block no-underline  flex"
                    href="#"
                    onClick={() => openLogin()}
                  >
                    SIGN IN &ensp;
                    <svg
                      className="fill-current "
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <circle fill="none" cx="12" cy="7" r="3" />
                      <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
                    </svg>
                  </a>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
