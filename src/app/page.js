import Cookies from "js-cookie";
import AgencyCards from "./components/AgencyCards";
import Banner from "./components/Banner";
import Partner from "./components/Partner";
import ServiceCards from "./components/ServiceCards";

export const metadata = {
  title: "VNFIXER | Home",
};
export default function Home() {
  return (
    <main>
      <Banner />
      <div className="lg:container mt-24 mx-auto px-5 lg:px-12 py-4">
        <AgencyCards />
        <ServiceCards />
        <Partner />
      </div>
    </main>
  );
}
