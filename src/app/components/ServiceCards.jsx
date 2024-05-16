"use client";
import React, { useRef } from "react";
import CardCategory from "./CardCategory";
import { motion, useInView } from "framer-motion";
import Title from "./Title";

const cardsData = [
  {
    id: 1,
    title: "Sửa chữa xe máy",
    description: "Xe gắn máy, xe côn tay, xe tay ga,...",
    image: "/images/projects/4.png",
  },
  {
    id: 2,
    title: "Sửa chữa đồ gia dụng",
    description: "Quạt, nồi cơm, biếp gas, lò vi sóng,...",
    image: "/images/projects/2.png",
  },
  {
    id: 3,
    title: "Sửa chữa điện lạnh",
    description: "Tủ lạnh, điều hoà, máy giặt,...",
    image: "/images/projects/3.png",
  },
  {
    id: 4,
    title: "Sửa chữa thiết bị văn phòng",
    description: "Máy in, máy fax, máy photo, scan,...",
    image: "/images/projects/8.png",
  },
  {
    id: 5,
    title: "Sửa chữa điện nước",
    description: "Đường ống nước, đường dây điện,...",
    image: "/images/projects/9.png",
  },
  {
    id: 6,
    title: "Sửa chữa hệ thống an ninh",
    description: "Camera, thiết bị chống trộm, máy quét vân tay,...",
    image: "/images/projects/5.png",
  },
];

const ServiceCards = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <>
      <div className="w-full">
        <Title title="Dịch vụ nổi bật"></Title>
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-y-5 gap-x-2 m-10">
        {cardsData.map((project, index) => (
          <motion.li
            className="rounded-md shadow-lg p-2 hover:shadow-md w-5/6 mx-auto"
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.2 }}
          >
            <CardCategory
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
            />
          </motion.li>
        ))}
      </ul>
    </>
  );
};

export default ServiceCards;
