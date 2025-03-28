import { Button } from "flowbite-react";
import { router } from "@inertiajs/react";
import { ShoppingCart, X } from "lucide-react";

import CartItem from "@/Components/CartItem";
import CartTotal from "@/Components/CartTotal";
import { useCartDrawer } from "@/Hooks/useCartDrawer";

export default function CartDrawer({ carts }) {
  const drawer = useCartDrawer();

  const continueBrowsing = () => {
    drawer.onClose();
    router.get(route("book.index"));
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 z-40 h-screen overflow-y-auto transition-transform ease-in-out duration-500 bg-white w-80 md:w-[420px] dark:bg-gray-800 ${
          drawer.isOpen ? "transform-none" : "translate-x-full"
        }`}
      >
        <div className="w-80 md:w-[420px] fixed flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-4 md:px-8 py-4 bg-white dark:bg-gray-800">
          <h5 className="inline-flex items-center text-lg font-semibold text-gray-600 dark:text-gray-200">
            <ShoppingCart className="w-6 h-6 mr-2.5" />
            Carts{" "}
            <span className="ml-1">
              (
              {carts
                .map((cart) => cart.quantity)
                .reduce(
                  (totalQuantity, currentQuantity) =>
                    totalQuantity + currentQuantity,
                  0
                )}
              )
            </span>
          </h5>
          <button
            onClick={drawer.onClose}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white -mr-2"
          >
            <X />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        {carts.length > 0 && (
          <div className="flex flex-col space-y-4 md:space-y-8 px-4 md:px-8 pb-5 md:pb-10 pt-[81px] md:pt-[97px] min-h-[calc(100vh_-_203px)]">
            {carts.map((cart) => (
              <CartItem key={cart.id} cart={cart} />
            ))}
          </div>
        )}

        {carts.length > 0 && <CartTotal carts={carts} />}

        {carts.length < 1 && (
          <div className="flex flex-col space-y-4 px-4 md:px-8 pb-5 md:pb-10 pt-[81px] md:pt-[97px]">
            <p className="font-medium text-gray-900 dark:text-white">
              Your cart is currently empty.
            </p>
            <Button onClick={continueBrowsing}>Continue browsing</Button>
          </div>
        )}
      </div>

      <div
        onClick={drawer.onClose}
        className={`${
          drawer.isOpen ? "" : "hidden "
        }bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30`}
      ></div>
    </>
  );
}
