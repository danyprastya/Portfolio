"use client";

import { motion } from "motion/react";
import { Globe, Bot, Wrench, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Custom web apps that load fast, look sharp on every device, and grow with your user base. From landing pages to full dashboards.",
    deliverables: [
      "Responsive websites",
      "Admin dashboards",
      "E-commerce stores",
      "Company profiles",
    ],
    startingAt: "Get a Quote",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description:
      "Automate repetitive work with AI workflows. Connect your tools, process data automatically, and free up your team's time.",
    deliverables: [
      "n8n workflow automation",
      "AI-powered data processing",
      "Chatbot integrations",
      "OCR & document parsing",
    ],
    startingAt: "Get a Quote",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description:
      "Keep your site running smoothly. Bug fixes, performance optimization, and feature updates — so you can focus on your business.",
    deliverables: [
      "Bug fixes & patches",
      "Performance audits",
      "Feature additions",
      "Hosting & deployment",
    ],
    startingAt: "Get a Quote",
  },
];

// What I don't do — qualifies leads
const dontDo = [
  "WordPress themes or plugins",
  "Print design or branding",
  "Native iOS/Android apps",
];

export default function Services() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="heading-lg mb-4">
          What I Can <span className="gradient-text">Build For You</span>
        </h2>
        <p className="body-lg max-w-2xl mx-auto text-muted-foreground">
          Focused on three things I do well. If your project fits, we should
          talk.
        </p>
      </motion.div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="card-base p-6 group hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <service.icon className="w-6 h-6 text-primary" />
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-2">
              {service.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 flex-1">
              {service.description}
            </p>

            <div className="space-y-2 mb-4">
              {service.deliverables.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <ArrowRight className="w-3 h-3 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t border-border/30">
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group/btn"
              >
                {service.startingAt}
                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* What I Don't Do */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
          What I don&apos;t do
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {dontDo.map((item) => (
            <span
              key={item}
              className="px-3 py-1.5 text-xs rounded-full bg-secondary/50 text-muted-foreground border border-border/30"
            >
              {item}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Not seeing what you need? Reach out anyway — I might know someone who
          can help.
        </p>
      </motion.div>
    </div>
  );
}
