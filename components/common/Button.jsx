const Button = (props) => {
  const { title, leftIcons, containerClass, id, rightIcon } = props;
  return (
    <button
      id={id}
      className={` group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full   bg-violet-50 px-7 py-3 text-black ${containerClass}`}
    >
      {leftIcons}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase ">
        <div className=" ">{title}</div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
