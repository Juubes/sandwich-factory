import { FC } from "react";

const Section: FC = ({ children }) => {
  return (
    <div className="mx-auto max-w-7xl bg-[#CFA200] p-6 my-10 shadow-lg">
      {children}
    </div>
  );
};

export default Section;
