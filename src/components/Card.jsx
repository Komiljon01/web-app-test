import { useState } from "react";
import Button from "./Button";

function Card({ course, onAddItem, onDeleteItem }) {
  const [count, setCount] = useState(0);
  const { title, price, image } = course;

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
    onAddItem(course);
  };

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
    onDeleteItem(course);
  };

  return (
    <div className="relative rounded-xl border border-gray-400 bg-slate-600">
      <span
        className={`absolute top-0 right-0 ${count === 0 ? "hidden" : "flex"} h-[40px] w-[40px] translate-x-[20px] translate-y-[-20px] scale-[1] items-center justify-center rounded-full bg-[#e3701e] text-xl font-bold opacity-80 transition-transform duration-300 ease-in`}
      >
        {count}
      </span>

      <div className="w-full rounded-t-xl">
        <img
          className="w-full rounded-t-xl object-cover"
          src={image}
          alt={title}
          width={100}
        />
      </div>

      <div className="px-4 py-5">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <h2 className="text-3xl font-medium">{title}</h2>

          <div className="text-xl">
            {price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 h-[0.5px] w-full bg-gray-400"></div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button title="Add" type="add" onClick={handleIncrement} />
          {count !== 0 && (
            <Button title="Delete" type="delete" onClick={handleDecrement} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
