import { FC, ReactNode } from "react";

const Section: FC<{ children?: ReactNode[] }> = ({ children }) => {
  return (
    <section className="mx-auto max-w-7xl bg-[#CFA200] p-6 my-10 shadow-lg">
      {children}
    </section>
  );
};

export default Section;
