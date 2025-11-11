import { motion } from "framer-motion";

const fadeStagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
};

export default function About() {
  const values = [
    { title: "Support Local", desc: "We highlight Jordanian creators and small businesses." },
    { title: "Simplicity", desc: "Clear flows and easy steps from browse to book." },
    { title: "Creativity", desc: "A space where new ideas can be seen and grow." },
    { title: "Speed", desc: "Fast loading and smooth actions across the site." },
    { title: "Trust", desc: "Verified profiles and real, helpful reviews." },
  ];

  const team = [
    { name: "Omar Alqaraan", link: "https://www.linkedin.com/in/omar-alqaran" },
    { name: "Adan Aljboor", link: "https://www.linkedin.com/in/adan-aljuboor" },
    { name: "Jawhara Shahaltoukh", link: "https://www.linkedin.com/in/jawhara-shahaltoukh" },
    { name: "Hossam Ibrahim", link: "https://www.linkedin.com/in/hossam-ibrahim" },
  ];

  return (
    <main className="min-h-screen bg-[#FFF6E9]">
      <section className="relative overflow-hidden bg-[#102E50]">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(#F5C45E 1px, transparent 1px), radial-gradient(#E78B48 1px, transparent 1px)",
            backgroundSize: "26px 26px, 32px 32px",
            backgroundPosition: "0 0, 13px 13px",
          }}
        />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#BE3D2A] opacity-10 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#F5C45E] opacity-10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeStagger}
            className="space-y-6"
          >
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
              About Bidaya
            </motion.h1>
            <motion.p variants={fadeUp} className="max-w-3xl text-white/90 text-lg leading-8">
              Bidaya is a home for new creators in Jordan. It connects people who start with a new product or service
              to real customers. Our goal is to help small beginnings grow into success stories.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto px-6 -mt-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeStagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div variants={fadeUp} className="bg-white rounded-xl shadow-md border border-slate-100 p-8">
            <div className="h-1 w-16 rounded bg-[#F5C45E] mb-5" />
            <h2 className="text-2xl font-semibold text-[#102E50] mb-3">Our Mission</h2>
            <p className="text-gray-700 leading-7">
              To support creators and small businesses with a simple online space where their ideas can be seen, trusted,
              and grow.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-white rounded-xl shadow-md border border-slate-100 p-8">
            <div className="h-1 w-16 rounded bg-[#E78B48] mb-5" />
            <h2 className="text-2xl font-semibold text-[#102E50] mb-3">Our Vision</h2>
            <p className="text-gray-700 leading-7">
              To be the first platform in Jordan that celebrates local creativity and supports talents from their first
              step.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-white rounded-xl shadow-md border border-slate-100 p-8">
            <div className="h-1 w-16 rounded bg-[#BE3D2A] mb-5" />
            <h2 className="text-2xl font-semibold text-[#102E50] mb-3">Built With</h2>
            <p className="text-gray-700 leading-7">React, Node.js, Express, PostgreSQL, Redux Toolkit</p>
          </motion.div>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeStagger}>
          <motion.div variants={fade} className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#102E50]">Our Values</h2>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                className="relative bg-white rounded-xl border border-slate-100 shadow-sm p-6 transition-transform hover:-translate-y-1"
              >
                <div className="text-sm tracking-wider text-[#102E50]/70 uppercase">Value</div>
                <div className="mt-1 text-lg font-semibold text-[#102E50]">{v.title}</div>
                <p className="mt-3 text-sm text-gray-600 leading-6">{v.desc}</p>
                <div
                  className="absolute left-6 bottom-0 h-1 w-12 rounded-t"
                  style={{
                    background: [ "#F5C45E", "#E78B48", "#BE3D2A", "#102E50", "#F5C45E" ][i % 5],
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeStagger}>
          <motion.div variants={fade} className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#102E50]">Team</h2>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {team.map((m, i) => (
              <motion.a
                variants={fadeUp}
                key={m.name}
                href={m.link}
                target="_blank"
                rel="noreferrer"
                className="group bg-white rounded-xl border border-slate-100 shadow-sm p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="text-[#102E50] font-medium">{m.name}</div>
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: [ "#F5C45E", "#E78B48", "#BE3D2A" ][i % 3] }}
                  />
                </div>
                <div className="mt-2 text-sm text-[#102E50]/70 underline underline-offset-4">LinkedIn</div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}