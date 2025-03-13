import { useCallback, useEffect, useState } from "react";
import Card from "./components/Card";
import Cart from "./components/Cart";
import { getData } from "./constants/db";

const telegram = window.Telegram.WebApp;

function App() {
  const [cartItems, setCartItems] = useState([]);
  const courses = getData();
  console.log(telegram);

  useEffect(() => {
    telegram.ready();
  }, []);

  const onAddItem = (item) => {
    const existItem = cartItems.find((c) => c.id === item.id);

    if (existItem) {
      const newData = cartItems.map((c) =>
        c.id === item.id
          ? { ...existItem, quantity: existItem.quantity + 1 }
          : c,
      );
      setCartItems(newData);
    } else {
      const newData = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(newData);
    }
  };

  const onDeleteItem = (item) => {
    const existItem = cartItems.find((c) => c.id === item.id);

    if (existItem.quantity === 1) {
      const newData = cartItems.filter((c) => c.id !== item.id);
      setCartItems(newData);
    } else {
      const newData = cartItems.map((c) =>
        c.id === item.id
          ? { ...existItem, quantity: existItem.quantity - 1 }
          : c,
      );
      setCartItems(newData);
    }
  };

  const onCheckout = () => {
    telegram.MainButton.text = "Buy 🛒";
    telegram.MainButton.show();
  };

  const onSendData = useCallback(() => {
    const queryID = telegram.initDataUnsafe?.query_id;

    if (queryID) {
      fetch("localhost:8000/web-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItems),
      });
    } else {
      telegram.sendData(JSON.stringify({ products: cartItems, queryID }));
    }
  }, [cartItems]);

  useEffect(() => {
    telegram.onEvent("mainButtonClicked", onSendData);

    return () => telegram.offEvent("mainButtonClicked", onSendData);
  }, [onSendData]);

  return (
    <div className="mx-auto max-w-7xl px-10 py-20 max-sm:px-5">
      <h1 className="text-center text-5xl">KBlog courses</h1>

      {/* Cart */}
      <Cart cartItems={cartItems} onCheckout={onCheckout} />

      {/* Cards */}
      <div className="mt-14 grid grid-cols-3 gap-10 max-[1000px]:grid-cols-2 max-sm:grid-cols-1">
        {courses.map((course) => (
          <Card
            key={course.id}
            course={course}
            onAddItem={onAddItem}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
