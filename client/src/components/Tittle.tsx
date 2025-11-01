import React from "react";

interface TittleProps {
  text: string;
}

const Tittle = (props: TittleProps) => {
  const { text } = props;
  return (
    <div className="flex items-center gap-1">
      <div className="w-[3px] h-8 bg-black"></div>
      <h2 className="text-lg font-medium">{text}</h2>
    </div>
  );
};

export default Tittle;
