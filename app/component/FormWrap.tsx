import React from "react";

const FormWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-fit h-full flex items-center justify-center pb-12 pt-24 ">
      <div className="max-w-[650px] w-full flex flex-col items-center shadow-xl shadow-slate-200 gap-4 rounded-md p-4 md:p-8">
        {children}
      </div>
    </div>
  );
};

export default FormWrap;
