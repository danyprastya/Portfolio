import React from 'react'
import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import cursor from "../../app/assets/icon1.png";

const IconCursor = () => {
    const constraintsRef = useRef(null);
  return (
    <div>
        <motion.div
          className="absolute 
                     top-[12%] left-[5%]      /* Posisi responsif */
                     md:top-[25%] md:left-[15%]
                     lg:top-[250px] lg:left-[220px] /* Posisi asli untuk layar besar */
                     xl:left-[90px]"
          drag
          dragConstraints={constraintsRef}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 50 }}
          animate={{
            y: [0, -45, 0],
            rotate: [0, 25, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <Image
            src={cursor}
            height={170}
            width={170}
            alt="cursor icon"
            className="w-[80px] h-auto            /* xs */
                       sm:w-[100px]              /* sm */
                       md:w-[130px]              /* md */
                       lg:w-[170px]              /* lg & xl */
                       "
            draggable="false"
          />
        </motion.div>
    </div>
  )
}

export default IconCursor