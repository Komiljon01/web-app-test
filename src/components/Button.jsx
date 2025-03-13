function Button(props) {
  const { type, title, onClick, disabled } = props;

  return (
    <button
      type={"button"}
      className={`cursor-pointer rounded-md px-5 py-2 text-xl text-white shadow-sm ${type == "add" && "bg-[royalblue] hover:bg-[#0066ffc9]"} ${type == "delete" && "bg-[crimson] hover:bg-red-500"} ${type == "checkout" && "bg-[#3fc24a] hover:bg-green-600"} transition-all duration-300 disabled:opacity-50`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
}

export default Button;
