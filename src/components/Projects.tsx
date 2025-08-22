"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { PiMouseLeftClickFill } from "react-icons/pi";
import { useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const projectsData = [
  {
    id: 1,
    title: "Triandi Kreasi Utama",
    description:
      "Website Portofolio Perusahaan yang bergerak di bidang konstruksi yang membantu perusahaan dalam mempromosikan jasa nya.",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "ShadCN UI"],
    image: "/projects/triandiutama.png",
    liveUrl: "https://website-triandi-kreasi-utama.vercel.app",
    githubUrl: "https://github.com/danyprastya/website-triandi-kreasi-utama",
  },
  {
    id: 2,
    title: "Pertenunan Astiti",
    description:
      "Website dengan sistem rekomendasi berbasis AI untuk menentukan kain tenun sesuai selera pengguna, lengkap dengan sistem dashboard admin yang terhubung ke Firebase, memungkinkan manajemen data secara real-time untuk berbagai kategori.",
    techStack: ["Next.js", "TypeScript", "Firebase", "ShadCN UI"],
    image: "/projects/astiti.png",
    liveUrl: "https://pertenunanastiti.vercel.app",
    githubUrl: "https://github.com/lokacraft/arthaloka-tenunastiti",
  },
  {
    id: 3,
    title: "Gamplong Studio",
    description:
      "Sebuah platform digital untuk Studio Alam Gamplong yang dirancang untuk dua tujuan utama: memudahkan pengunjung dalam menyewa aset studio, sekaligus menyediakan dashboard admin yang fungsional untuk melacak penjualan tiket, memonitor jumlah pengunjung, dan mengelola data destinasi wisata.",
    techStack: ["React", "Next.js", "Tailwind CSS", "ShadCN UI", "Firebase"],
    image: "/projects/gamplong.png",
    liveUrl: "#",
    githubUrl: "https://github.com/lokacraft/arthaloka-gamplongstudio",
  },
  {
    id: 4,
    title: "PT. Nadhif Putra Sejahtera",
    description:
      "Website dinamis dan sepenuhnya responsif dengan Fokus utama adalah pada penyajian informasi layanan yang jelas, galeri proyek yang mendetail, dan halaman kontak fungsional untuk memfasilitasi komunikasi langsung antara perusahaan dan calon klien.",
    techStack: ["Next.js", "React", "Firebase", "ShadCN UI"],
    image: "/projects/nadhif.png",
    liveUrl: "https://ptnadhifputrasejahtera.vercel.app",
    githubUrl: "https://github.com/lokacraft/arthaloka-ptnadhif",
  },
];

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

const ProjectCard = ({ project }: { project: Project; className?: string }) => {
  return (
    <Dialog>
      <CardContainer className="inter-var w-full h-full">
        <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-0 border bg-transparent">
          <DialogTrigger asChild>
            <motion.div
              className={
                "relative rounded-xl aspect-[4/3] group cursor-pointer gap-x-10"
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl transform translate-z-1" />

              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                style={{ objectFit: "cover" }}
                className="absolute inset-0 rounded-xl"
              />
              <div className="absolute inset-0 flex items-center bg-black/60 justify-center opacity-0 group-hover:opacity-100 transition-all duration-10" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* <div className="absolute inset-0 shadow-2xl group-hover:shadow-3xl transition-shadow duration-300" /> */}

              <div className="absolute bottom-0 left-0 p-6 text-white transform translate-z-2">
                <CardItem translateZ="500" translateY="-20">
                  <h3 className="text-md md:text-xl lg:text-2xl xl:text-2xl text-white font-bold mb-2">
                    {project.title}
                  </h3>
                </CardItem>
                <CardItem translateZ="80" translateX="-30">
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 1 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[8px] md:text-xs lg:text-xs xl:text-[14px] backdrop-blur-sm px-2 py-1 rounded-full border border-white text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                </CardItem>
              </div>

              <motion.div
                className="absolute inset-0 flex items-center bg-transparent justify-center opacity-0 group-hover:opacity-100 transition-all duration-100"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
              >
                <CardItem as="div" translateZ="10" className="sm:hidden">
                  <div className="flex items-center gap-2 text-lg font-semibold text-white transform translate-z-3">
                    <PiMouseLeftClickFill size={20} />
                    Click to see more
                  </div>
                </CardItem>
              </motion.div>
            </motion.div>
          </DialogTrigger>
        </CardBody>
      </CardContainer>

      <DialogContent className="bg-gray-900/50 text-white backdrop-blur-lg border-cyan-300/20 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-white/70">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-white/80 pt-2">
            {project.description}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <h4 className="font-semibold mb-2 text-white/70">
            Teknologi yang Digunakan:
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-sm bg-transparent border border-white px-3 py-1 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-4 mt-4 mb-4">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            <Button className="bg-transparent border-white border">
              Link <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            <Button className="bg-transparent hover:bg-transparent rounded-full border border-white">
              <FiGithub />
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const itemsPerView = 3;
  const shouldUseCarousel = projectsData.length > 3;
  const totalSlides = shouldUseCarousel
    ? Math.ceil(projectsData.length / itemsPerView)
    : 1;

  const goToNext = () => {
    if (isTransitioning || !shouldUseCarousel) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToPrevious = () => {
    if (isTransitioning || !shouldUseCarousel) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  //   const getVisibleProjects = () => {
  //     if (!shouldUseCarousel) {
  //       return projectsData;
  //     }
  //     const startIndex = currentIndex * itemsPerView;
  //     return projectsData.slice(startIndex, startIndex + itemsPerView);
  //   };

  return (
    <div id="portfolio" className="relative py-16">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Portfolio <span className="text-orange-400">Proyek</span>
        </motion.h1>
        <motion.p
          className="text-center text-white/80 mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Berikut adalah beberapa proyek yang telah saya kerjakan, mulai dari
          Website hingga IoT
        </motion.p>

        <div className="relative hidden sm:hidden lg:flex lg:flex-col">
          <div className="overflow-hidden rounded-lg">
            {shouldUseCarousel ? (
              <motion.div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0 px-2">
                    <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                      {projectsData
                        .slice(
                          slideIndex * itemsPerView,
                          (slideIndex + 1) * itemsPerView
                        )
                        .map((project) => (
                          <ProjectCard
                            key={project.id}
                            project={project}
                            className="h-[100px] md:h-[200px] lg:h-[400px] xl:h-[500px]"
                          />
                        ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {projectsData.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    className=""
                  />
                ))}
              </div>
            )}
          </div>

          {shouldUseCarousel && (
            <>
              <div className="flex justify-end mt-0 gap-2">
                <Button
                  onClick={goToPrevious}
                  disabled={isTransitioning}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full p-2 backdrop-blur-sm"
                  size="sm"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  onClick={goToNext}
                  disabled={isTransitioning}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full p-2 backdrop-blur-sm"
                  size="sm"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex justify-center mt-4 gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isTransitioning) {
                        setIsTransitioning(true);
                        setCurrentIndex(index);
                        setTimeout(() => setIsTransitioning(false), 300);
                      }
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentIndex
                        ? "bg-white w-9"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="flex sm:flex md:hidden aspect-4/3 relative justify-start items-center flex-col mx-auto px-3">
          <div className="w-full">
            {projectsData.map((project) => (
              <ProjectCard key={project.id} project={project} className="rounded-none" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
