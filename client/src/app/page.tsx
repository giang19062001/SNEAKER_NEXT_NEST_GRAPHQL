import Image from "next/image";
import Slider from "./components/slider";
import List from "./components/sneaker/list";
import LayoutUser from "./components/layout-user";

export default function Home() {
  return (
    <main className="bg-white text-gray-600 work-sans leading-normal text-base tracking-normal">
      <LayoutUser>
        <Slider></Slider>
        <List></List>
      </LayoutUser>
    </main>
  );
}
