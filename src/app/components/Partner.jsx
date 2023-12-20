"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Title from "./Title";
import Image from "next/image";

const imgList = [
  {
    id: 1,
    image: "/images/homaroom.jpg",
    title: "ABC",
  },
  {
    id: 2,
    image: "/images/phongvu.png",
    title: "ABC",
  },
  {
    id: 3,
    image: "/images/honda.jpg",
    title: "ABC",
  },
  {
    id: 4,
    image: "/images/cadivi.png",
    title: "ABC",
  },
  {
    id: 5,
    image: "/images/philong.png",
    title: "abc",
  },
  {
    id: 6,
    image: "/images/binhminh.png",
    title: "ABC",
  },
];

const Partner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };
  return (
    <>
      <div className="w-full">
        <Title title="Đối tác liên kết"></Title>
      </div>
      <ul
        ref={ref}
        className="grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-2 m-10"
      >
        {imgList.map((img, index) => (
          <motion.li
            className={`flex items-center justify-center ${
              index < 4 ? "col-span-1" : `${index == 4 ? "md:col-start-2" : ""}`
            }`}
            key={img.id}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.2 }}
          >
            <Image
              loading="lazy"
              src={img.image}
              alt={img.title}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "30%", height: "auto", margin: "auto" }}
            ></Image>
          </motion.li>
        ))}
      </ul>
    </>
  );
};

export default Partner;
