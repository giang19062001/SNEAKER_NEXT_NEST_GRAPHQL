import { removeFromCart } from "@/app/redux/order/order.Slice";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const CartList = () => {
  const sneakerCart = useSelector((state: any) => state.order.list);
  const dispatch = useDispatch();

  const handleRemove = (_id: String) => {
    dispatch(removeFromCart(_id));
  };
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
          Shopping cart
        </h2>
      </div>

      <div className="mt-8">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {sneakerCart.map((sneaker: any) => (
              <li key={sneaker._id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={sneaker.image}
                    alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href="#">{sneaker.name}</a>
                      </h3>
                      <p className="ml-4">${sneaker.price}</p>
                    </div>
                    <p className=" mt-1 text-sm text-gray-500">
                      Quantity: <b>{sneaker.quantity}</b>
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p></p>
                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-red-600 hover:text-red-500"
                        onClick={() => handleRemove(sneaker._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartList;
