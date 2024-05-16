"use client";
import React, { useEffect, useRef, useState } from "react";
import CardAgency from "./CardAgency";
import { motion, useInView } from "framer-motion";
import Title from "./Title";
import { useSelector } from "react-redux";
import { isLoggedInSelector } from "../redux/selectors";
import vnfixerAPI from "../api/vnfixerApi";
import Image from "next/image";
import spinner from "../../../public/images/Spin-1s-200px.svg";
import { ImagePlacehoderSkeleton } from "./Skeleton";

const cardsData = [
  {
    id: 1,
    title: "Trung tâm cơ điện ABC",
    description: "482 Nguyễn Hữu Thọ, Ngũ Hành Sơn, ĐN",
    image: "/images/projects/10.jpg",
    city: "Đà Nẵng",
    star: "5",
    gitUrl: "12",
  },
  {
    id: 2,
    title: "Sửa chữa đồ gia dụng CDE",
    description: "42 Đỗ Bá, Sơn Trà, ĐN",
    image: "/images/projects/13.webp",
    city: "Đà Nẵng",
    star: "5",
    gitUrl: "13",
  },
  {
    id: 3,
    title: "Sửa chữa đồ văn phòng Phong Vũ",
    description: "42 Nguyễn Văn Thoại, Sơn Trà, ĐN",
    image: "/images/projects/12.webp",
    city: "Đà Nẵng",
    star: "5",
    gitUrl: "14",
  },
  {
    id: 4,
    title: "Sửa chữa điện lạnh ABDCE",
    description: "42 Nguyễn Văn Thoại, Sơn Trà, ĐN",
    image: "/images/projects/10.jpg",
    city: "Đà Nẵng",
    star: "4",
    gitUrl: "15",
  },
];

const AgencyCards = () => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  const [agencies, setAgencies] = useState();
  const [login, setLogin] = useState([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  useEffect(() => {
    setLogin(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    const getAgencies = async () => {
      try {
        const response = await vnfixerAPI.getAgencies(6, 1);
        if (response.status == 200) {
          setAgencies(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAgencies();
  }, []);

  return (
    <>
      {login && (
        <>
          <div className="w-full">
            <Title title="Đại lý nổi bật"></Title>
          </div>
          <ul ref={ref} className="grid md:grid-cols-2 gap-y-5 gap-x-2 m-10">
            {agencies && agencies.entries
              ? agencies?.entries?.map((agency, index) => (
                  <motion.li
                    className="rounded-md shadow-lg py-2 hover:shadow-md w-full lg:w-5/6 mx-auto"
                    key={index}
                    variants={cardVariants}
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                    transition={{ duration: 0.3, delay: index * 0.2 }}
                  >
                    <CardAgency
                      title={agency.name}
                      branches={agency.branches.length}
                      description={agency.description}
                      city={agency.category.name}
                      star={5}
                      imgUrl={agency.logo}
                      id={agency.id}
                    />
                  </motion.li>
                ))
              : Array.from({ length: 4 }).map((_, i) => (
                  <ImagePlacehoderSkeleton key={i}></ImagePlacehoderSkeleton>
                ))}
          </ul>
        </>
      )}
    </>
  );
};

export default AgencyCards;
