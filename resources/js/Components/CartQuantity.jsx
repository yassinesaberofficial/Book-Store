import { router } from "@inertiajs/react";
import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function CartQuantity({ cart, isDisabled, setIsDisabled }) {
  const isInitialMount = useRef(true);
  const [quantity, setQuantity] = useState(cart.quantity);

  const handleAdd = () => {
    if (quantity < cart.book_owner.stocks) {
      setQuantity(quantity + 1);
    }
  };

  const handleMinus = () => {
    setQuantity(quantity - 1);
  };

  const handleQuantityChange = (e) => {
    if (e.target.value > cart.book_owner.stocks) {
      setQuantity(cart.book_owner.stocks);
    } else {
      setQuantity(e.target.value);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      router.put(
        route("cart.update", cart.id),
        { bookQuantity: quantity },
        {
          preserveScroll: true,
          onStart: () => {
            setIsDisabled(true);
          },
          onFinish: () => {
            setIsDisabled(false);
          },
        }
      );
    }
  }, [quantity]);

  const handleRemove = () => {
    router.delete(route("cart.destroy", cart.id), {
      preserveScroll: true,
      onStart: () => {
        setIsDisabled(true);
      },
      onFinish: () => {
        setIsDisabled(false);
      },
    });
  };

  return (
    <div className="flex items-center pt-3">
      <button
        onClick={handleMinus}
        disabled={isDisabled}
        className="flex justify-center w-8 h-8 items-center focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 focus:ring-2 rounded-l-md disabled:opacity-50 disabled:hover:cursor-not-allowed"
      >
        <Minus />
      </button>
      <input
        id="quantity"
        type="number"
        min={1}
        max={cart.book_owner.stocks}
        value={quantity}
        disabled={isDisabled}
        onChange={(e) => handleQuantityChange(e)}
        className="quantity-input block w-9 h-8 border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 text-sm font-medium text-center"
      />
      <button
        onClick={handleAdd}
        disabled={isDisabled}
        className="flex justify-center w-8 h-8 items-center focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 focus:ring-2 rounded-r-md disabled:opacity-50 disabled:hover:cursor-not-allowed"
      >
        <Plus />
      </button>
      <button
        onClick={handleRemove}
        disabled={isDisabled}
        className="ml-3 text-xs font-medium underline underline-offset-[3px] text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-300 disabled:hover:cursor-not-allowed disabled:hover:text-gray-400 dark:disabled:hover:text-gray-300"
      >
        Remove
      </button>
    </div>
  );
}
