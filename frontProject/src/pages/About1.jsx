import { motion } from "framer-motion";
import { Heart, Lightbulb, Shield, TrendingUp, Zap } from "lucide-react";
import hussamImage from "../assets/210363062.jpeg";
import imag2 from "../assets/diverse-entrepreneurs-and-creators-working-togethe (1).jpg";
import imag1 from "../assets/jordanian-creators-collaborating-and-crafting-beau (1).jpg";
import omarImage from "../assets/WhatsApp Image 2024-08-12 at 5.01.26 PM.jpeg";

const fadeStagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

const iconVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
  hover: { scale: 1.1, y: -5, transition: { duration: 0.3 } },
};

export default function About1() {
  const values = [
    {
      title: "Support Local",
      desc: "We highlight Jordanian creators and small businesses.",
      icon: Heart,
      color: "from-[#F5C45E] to-[#E78B48]",
    },
    {
      title: "Simplicity",
      desc: "Clear flows and easy steps from browse to book.",
      icon: Zap,
      color: "from-[#E78B48] to-[#F5C45E]",
    },
    {
      title: "Creativity",
      desc: "A space where new ideas can be seen and grow.",
      icon: Lightbulb,
      color: "from-[#F5C45E] to-[#102E50]",
    },
    {
      title: "Innovation",
      desc: "Built with cutting-edge technology for seamless experience.",
      icon: TrendingUp,
      color: "from-[#102E50] to-[#E78B48]",
    },
    {
      title: "Trust",
      desc: "Verified profiles and real, helpful reviews.",
      icon: Shield,
      color: "from-[#E78B48] to-[#102E50]",
    },
  ];

  const team = [
    {
      name: "Omar Alqaraan",
      role: "Founder & Strategy",
      link: "https://www.linkedin.com/in/omar-essam-quraan-5a917a210/",
      imge: omarImage,
    },
    {
      name: "Hossam Ibrahim",
      role: "Product Manager",
      link: "https://www.linkedin.com/in/hussam-ibrahim-93049a181/",
      imge: hussamImage,
    },
    {
      name: "Adan Aljboor",
      role: "Lead Developer",
      link: "https://www.linkedin.com/in/adan-aljuboor",
    },

    {
      name: "Jawhara Shahaltoukh",
      role: "Design Lead",
      link: "https://www.linkedin.com/in/jawhara-shahaltoukh",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FFF6E9] overflow-hidden">
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-40">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-[#F5C45E] to-[#E78B48] blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-[#102E50] to-[#E78B48] blur-3xl" />
        </div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, #102E50 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeStagger}
            className="space-y-8 text-center"
          >
            <motion.div variants={fadeUp}>
              {/* <span className="inline-block px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium text-[#102E50]">
                Welcome to BidayaMart
              </span> */}
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#102E50] leading-tight tracking-tight"
            >
              Every Idea Deserves{" "}
              <span className="bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#102E50] bg-clip-text text-transparent">
                a Stage
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="max-w-2xl mx-auto text-lg md:text-xl text-[#102E50]/80 leading-relaxed"
            >
              Bidaya is home to Jordanian creators and small businesses. We
              connect new ideas with real customers, turning first beginnings
              into success stories.
            </motion.p>
            <motion.div variants={scaleIn} className="mt-12 mx-auto max-w-2xl">
              <img
                src={imag1}
                alt="Local creators and entrepreneurs collaborating"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- MISSION & VISION ---------------- */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-8 -mt-16 mb-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeStagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {[
            {
              title: "Our Mission",
              color: "from-[#F5C45E] to-[#E78B48]",
              text: "Support creators and small businesses with a simple, trusted online platform where their ideas are seen and their dreams grow.",
            },
            {
              title: "Our Vision",
              color: "from-[#E78B48] to-[#102E50]",
              text: "To be Jordan's premier platform celebrating local creativity and empowering talent from their first step to sustainable success.",
            },
            {
              title: "Built With",
              color: "from-[#102E50] to-[#F5C45E]",
              text: "Modern technology: React, Node.js, Express, PostgreSQL, and cutting-edge tools for reliability.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#FFF6E9] p-8 md:p-10 hover:border-[#F5C45E]/50"
            >
              <div
                className={`h-1.5 w-20 rounded-full bg-gradient-to-r ${card.color} mb-6`}
              />
              <h3 className="text-2xl md:text-3xl font-bold text-[#102E50] mb-4">
                {card.title}
              </h3>
              <p className="text-[#102E50]/75 leading-relaxed text-lg">
                {card.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------------- VALUES SECTION ---------------- */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-white/50 to-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeStagger}
          >
            <motion.div variants={fadeUp} className="mb-16 md:mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-[#102E50] mb-4">
                Our Values
              </h2>
              <p className="text-lg text-[#102E50]/70">
                Built on principles that guide every decision we make
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {values.map((value, i) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="group relative"
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${
                          value.color.split(" ")[1]
                        }, ${value.color.split(" ")[3]})`,
                      }}
                    />
                    <div className="relative bg-white rounded-2xl border border-[#FFF6E9] shadow-md hover:shadow-xl transition-all duration-300 p-7 h-full flex flex-col group-hover:border-[#F5C45E]/30">
                      <motion.div
                        variants={iconVariants}
                        whileHover="hover"
                        className={`mb-5 p-3 rounded-xl bg-gradient-to-br ${value.color} w-fit`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <h4 className="text-lg font-semibold text-[#102E50] mb-3">
                        {value.title}
                      </h4>
                      <p className="text-sm text-[#102E50]/70 leading-relaxed flex-grow">
                        {value.desc}
                      </p>
                      <div
                        className={`mt-4 h-1 w-0 group-hover:w-12 bg-gradient-to-r ${value.color} rounded-full transition-all duration-300`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- COMMUNITY SECTION ---------------- */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeStagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={scaleIn}>
              <img
                src={imag2}
                alt="Our vibrant community"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </motion.div>
            <motion.div variants={fadeStagger} className="space-y-6">
              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-5xl font-bold text-[#102E50]"
              >
                A Community of Creators
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-lg text-[#102E50]/75 leading-relaxed"
              >
                BidayaMart isn't just a marketplace—it's a movement celebrating
                Jordanian talent and entrepreneurship.
              </motion.p>
              <motion.div variants={fadeStagger} className="space-y-4 pt-4">
                {[
                  "Connect directly with customers who believe in your vision",
                  "Access tools and resources to grow your business",
                  "Join a supportive community of fellow creators",
                  "Build your brand with trust and authenticity",
                ].map((point, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeUp}
                    className="flex gap-4 items-start"
                  >
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-gradient-to-r from-[#F5C45E] to-[#E78B48] flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        ✓
                      </span>
                    </div>
                    <span className="text-[#102E50]/80 text-lg">{point}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- TEAM SECTION ---------------- */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-white/50 to-[#FFF6E9]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeStagger}
          >
            <motion.div
              variants={fadeUp}
              className="mb-16 md:mb-20 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#102E50] mb-4">
                The Team Behind BidayaMart
              </h2>
              <p className="text-lg text-[#102E50]/70 max-w-2xl mx-auto">
                Passionate individuals dedicated to supporting Jordanian
                creativity and innovation
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {team.map((member, idx) => (
                <motion.a
                  key={idx}
                  href={member.link}
                  target="_blank"
                  rel="noreferrer"
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div className="relative bg-white rounded-2xl border border-[#FFF6E9] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col p-6 hover:border-[#F5C45E]/50">
                    <div className="w-full aspect-square rounded-xl mb-5 bg-gradient-to-br from-[#F5C45E]/20 to-[#E78B48]/20 flex items-center justify-center overflow-hidden">
                      <img
                        src={
                          member.imge
                            ? member.imge
                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                member.name
                              )}&background=F5C45E&color=102E50`
                        }
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="font-semibold text-[#102E50] text-lg mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#F5C45E] group-hover:to-[#E78B48] group-hover:bg-clip-text transition-all duration-300">
                      {member.name}
                    </h4>
                    <p className="text-sm text-[#102E50]/60 mb-4 flex-grow">
                      {/* {member.role} */}
                    </p>
                    <div className="flex items-center gap-2 text-[#102E50]/70 group-hover:text-[#E78B48] transition-colors duration-300">
                      <span className="text-sm font-medium">LinkedIn</span>
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 10l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- CTA SECTION ---------------- */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeStagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold text-[#102E50] mb-6"
            >
              Ready to Start Your Journey?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg text-[#102E50]/75 mb-10"
            >
              Join hundreds of Jordanian creators already building their success
              on BidayaMart
            </motion.p>
            <motion.button
              variants={fadeUp}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(245, 196, 94, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#102E50] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#F5C45E] to-transparent opacity-30" />
    </main>
  );
}
