import Header from "~/components/header/header";
import Nav from "~/components/header/nav";
const DefaultLayout = ({ children }) => {
  return (
    <>
      <div className="sticky top-0 bg-red-300 z-50">
        <Header />
        <Nav />
      </div>
      <div className="min-h-[90vh] pt-10 bg-[#DFEBFD] pb-10 z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          {children}
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
