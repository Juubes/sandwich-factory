import { FC, ReactNode } from "react";

const Form: FC<{ children: ReactNode }> = ({ children }) => {
  return <form className="grid">{children}</form>;
};

export default Form;
