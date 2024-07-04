"use client";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { addToCart } from "@/app/redux/order/order.Slice";
import { GET_SNEAKER } from "@/app/graphql/sneaker";
import { toast } from "react-toastify";
import "../../assets/css/sneakers.css";

const List = () => {
  const dispatch = useDispatch();
  const [imageBox, setImageBox] = useState(null);
  const { data } = useQuery(GET_SNEAKER);

  const AddToCartShop = (sneaker: any) => {
    dispatch(addToCart({ ...sneaker, quantity: 1 }));
    toast.success("Added");
  };
  return (
    <>
      {typeof imageBox === "string" && (
        <Lightbox mainSrc={imageBox} onCloseRequest={() => setImageBox(null)} />
      )}
      <section className=" py-8" id="sneaker-section">
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
          <nav id="store" className="w-full z-30 top-0 px-6 py-1">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
              <a
                className="uppercase tracking-wide no-underline hover:no-underline font-bold text-white-800 text-xl "
                href="#"
              >
                Store
              </a>

              <div className="flex items-center" id="store-nav-content">
                <a
                  className="pl-3 inline-block no-underline hover:text-black"
                  href="#"
                >
                  <svg
                    className="fill-current hover:text-black"
                    xmlns="https://images.pexels.com/photos/2194261/pexels-photo-2194261.jpeg?auto=compress&cs=tinysrgb&w=600"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                  </svg>
                </a>

                <a
                  className="pl-3 inline-block no-underline hover:text-black"
                  href="#"
                >
                  <svg
                    className="fill-current hover:text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                  </svg>
                </a>
              </div>
            </div>
          </nav>

          {data &&
            data?.sneakers.map((sneaker: any) => (
              <div
              id="sneaker"
                key={sneaker._id}
                className="transition ease-in duration-200 hover:scale-105 shadow-md cursor-pointer card flex flex-col justify-center elative group  mx-2 mb-4 p-4 bg-white rounded-lg "
              >
                <div>
                  <img
                    onClick={() => setImageBox(sneaker.image)}
                    src={sneaker.image}
                    className="w-full h-60 object-contain rounded-xl "
                  />
                </div>
                <hr/>
                <div>
                  <p className="font-sans font-semibold text-md text-neutral-900 mt-1">
                    {sneaker.name}
                  </p>
                  <div className="flex flex-col md:flex-row justify-between items-center text-neutral-600 ">
                    <p className="font-sans font-semibold text-md">
                      {" "}
                      ${sneaker.price}
                    </p>
                    <button
                      className="text-white font-semibold  rounded-md py-2 px-4 text-sm sneaker-btn"
                      onClick={() => AddToCartShop(sneaker)}
                    >
                      Add Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default List;
