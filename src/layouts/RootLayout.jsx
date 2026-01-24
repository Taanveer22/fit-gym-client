import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
const RootLayout = () => {
  return (
    <div>
      <section>
        <Navbar></Navbar>
      </section>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default RootLayout;
