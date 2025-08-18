"use client";
import React from "react";
import Image from "next/image";
import book from "../app/assets/book.png";
import pc from "../app/assets/pc.png";
import card from "../app/assets/card.png";
import finance from "../app/assets/finance.png";

const About = () => {
  return (
    <div className="max-w-[1200px] mx-auto" id="about">

        <h1 className="text-white text-6xl max-w-[320px] mx-auto font-semibold p-4 mb-4">
            About <span className="text-orange-400">Me</span>
        </h1>

      <div className="grid grid-cols-8 gap-6 place-items-center">

        <div className="w-full col-span-5 relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden">
          <div className="flex flex-row p-6">
            <Image src={book} alt="book" className="w-auto h-[130px]" />
            <div className="flex flex-col mt-4">
              <h2 className="text-2xl font-bold text-white/80">Education</h2>
              <p className="text-lg text-white/70 mt-2">I hold a degree in Computer Science</p>
            </div>
          </div>
        </div>

        <div className="w-full col-span-3 relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden">
          <div className="flex flex-row p-6">
            <Image src={pc} alt="book" className="w-auto h-[130px]" />
            <div className="flex flex-col mt-4">
              <h2 className="text-2xl font-bold text-white/80"></h2>
              <p className="text-lg text-white/70 mt-2"></p>
            </div>
          </div>
        </div>

        <div className="w-full col-span-3 relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden">
          <div className="flex flex-row p-6">
            <Image src={card} alt="book" className="w-auto h-[130px]" />
            <div className="flex flex-col mt-4">
              <h2 className="text-2xl font-bold text-white/80"></h2>
              <p className="text-lg text-white/70 mt-2"></p>
            </div>
          </div>
        </div>

        <div className="w-full col-span-5 relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden">
          <div className="flex flex-row p-6">
            <Image src={finance} alt="book" className="w-auto h-[130px]" />
            <div className="flex flex-col mt-4">
              <h2 className="text-2xl font-bold text-white/80"></h2>
              <p className="text-lg text-white/70 mt-2"></p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
