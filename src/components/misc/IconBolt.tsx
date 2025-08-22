import React from "react";

import Image from "next/image";
import message from "../../app/assets/icon2.png";
import { motion } from "framer-motion";
import { useRef } from "react";

const IconBolt = () => {
  const constraintsRef = useRef(null);
  return (
    <div>
      <motion.div
        className="absolute z-0
                     top-[5%] right-[5%]       /* Posisi responsif */
                     md:top-[10%] md:right-[15%]
                     lg:-top-[200px] lg:right-[180px] /* Posisi asli untuk layar besar */
                     xl:right-[200px]"
        drag
        dragConstraints={constraintsRef}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 50 }}
        animate={{
          y: [0, 30, -40, 0],
          rotate: [0, -15, 25, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        <Image
          src={message}
          height={120}
          width={120}
          alt="message icon"
          className="w-[60px] h-auto             /* xs */
                       sm:w-[80px]               /* sm */
                       md:w-[100px]              /* md */
                       lg:w-[120px]              /* lg & xl */
                       "
          draggable="false"
        />
      </motion.div>
    </div>
  );
};

export default IconBolt;
