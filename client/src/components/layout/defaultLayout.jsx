import Header from "~/components/header/header";

const DefaultLayout = ({ children }) => {
  return (
    <>
     
      <Header />
      <div className="min-h-[100vh] min-w-[100vw] pt-10  bg-slate-200 flex justify-center">
        {children}
      </div>
    </>
  );
};

export default DefaultLayout;
