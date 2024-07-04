import Image from "next/image";
import Slider from "./components/slider";
import List from "./components/sneaker/list";
import LayoutUser from "./components/layout-user";

export default function Home() {
  return (
      <LayoutUser>
        <Slider></Slider>
        <List></List>
      </LayoutUser>
  );
}
