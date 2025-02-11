import BrandSlide from "@/components/BrandSlide";
import Collection from "@/components/collection/Collection";
import Categories from "@/components/Desktop/Category/Categories";
import ExclusiveDeal from "@/components/ExclusiveDeal";
import ImageSlide from "@/components/ImageSlide";
import Category from "@/components/mobile/Category/Category";
import MovingMessages from "@/components/MovingMessages";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <header>
      <MovingMessages/>
      <div className="bg-[#f6ffc1] px-3 slider-show md:px-16 py-4">
      <ImageSlide/>
      </div>
      <div className=" px-3 slider-show md:px-16 py-4">
        <BrandSlide/>
      </div>
      <div className=" md:block bg-gradient-to-b from-[#f6ffc1] to-transparent px-3 slider-show md:px-16 py-4">
        <ExclusiveDeal/>
      </div>
      </header>
      {/* THIS CATEGORIES FOR MOBILE */}
      <div className=" md:hidden">
        <Category/>
      </div>
      {/* This CATEGORIES FOR DESKTOP */}
      <div className="hidden md:block">
        <Categories/>
      </div>

        {/* COLLECTION CLOTHS */}

      <div>
        <Collection/>
      </div>

    </>
  );
}
