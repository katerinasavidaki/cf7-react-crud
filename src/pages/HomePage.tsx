import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "CF7 React Homepage";
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-8">Home Page</h1>
    </>
  );
};

export default HomePage;
