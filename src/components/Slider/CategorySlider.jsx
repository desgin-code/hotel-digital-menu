import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryNewSlider from "./CategoryNewSlider";

export default function CategorySlider() {
  return (
    <>
      <section className="food-category-listing  py-3 bg-white ">
        <div className="mx-auto space-y-10 max-w-[92%] md:max-w-7xl">
          <CategoryNewSlider />
        </div>
      </section>
    </>
  );
}
