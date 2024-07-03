import React from "react";

const Slider = () => {
  return (
    <div
      className="carousel relative container mx-auto mt-20"
      style={{ maxWidth: "1600px" }}
    >
      <div className="carousel-inner relative overflow-hidden w-full">
        <input
          className="carousel-open"
          type="radio"
          id="carousel-1"
          name="carousel"
          aria-hidden="true"
          hidden
          defaultChecked={true}
        />
        <div
          className="carousel-item absolute opacity-0"
          style={{ height: "50vh" }}
        >
          <div
            className="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right"
            style={{
              backgroundImage:
                "url('https://publish.one37pm.net/wp-content/uploads/2020/05/hero_145d05.png?fit=1600%2C707')",
            }}
          ></div>
        </div>
        <label
          htmlFor="carousel-2"
          className="prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 left-0 my-auto"
        >
          ‹
        </label>
        <label
          htmlFor="carousel-2"
          className="next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto"
        >
          ›
        </label>

        <input
          className="carousel-open"
          type="radio"
          id="carousel-2"
          name="carousel"
          aria-hidden="true"
          hidden
        />
        <div
          className="carousel-item absolute opacity-0 bg-cover bg-right"
          style={{ height: "50vh" }}
        >
          <div
            className="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right"
            style={{
              backgroundImage:
                "url('https://publish.one37pm.net/wp-content/uploads/2020/05/hero_145d05.png?fit=1600%2C707')",
            }}
          ></div>
        </div>
        <label
          htmlFor="carousel-1"
          className="prev control-2 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 left-0 my-auto"
        >
          ‹
        </label>
        <label
          htmlFor="carousel-1"
          className="next control-2 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 right-0 my-auto"
        >
          ›
        </label>



        <ol className="carousel-indicators">
          <li className="inline-block mr-3">
            <label
              htmlFor="carousel-1"
              className="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900"
            >
              •
            </label>
          </li>
          <li className="inline-block mr-3">
            <label
              htmlFor="carousel-2"
              className="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900"
            >
              •
            </label>
          </li>

        </ol>
      </div>
    </div>
  );
};

export default Slider;
