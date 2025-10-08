// src/pages/About.jsx
export default function About() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold">About BidayaMart</h1>
        <p>
          BidayaMart is a home for new creators in Jordan. It connects people who
          are starting with a new product or service to real customers. Our goal
          is to help small beginnings grow into success stories.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p>
          To support creators and small businesses with a simple online space
          where their ideas can be seen, trusted, and grow.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Our Vision</h2>
        <p>
          To be the first platform in Jordan that celebrates local creativity and
          supports talents from their first step.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Our Values</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Support Local</li>
          <li>Simplicity</li>
          <li>Creativity</li>
          <li>Speed</li>
          <li>Trust</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Team</h2>
        <ul className="space-y-2">
          <li>
            <span>Omar Alqaraan</span> —{" "}
            <a
              href="https://www.linkedin.com/in/omar-alqaran"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <span>Adan Aljboor</span> —{" "}
            <a
              href="https://www.linkedin.com/in/adan-aljuboor"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <span>Jawhara Shahaltoukh</span> —{" "}
            <a
              href="https://www.linkedin.com/in/jawhara-shahaltoukh"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <span>Hossam Ibrahim</span> —{" "}
            <a
              href="https://www.linkedin.com/in/hossam-ibrahim"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <span>Mahmoud Awdehallah</span> —{" "}
            <a
              href="https://www.linkedin.com/in/mahmoud-awdehallah"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Built With</h2>
        <p>React, Node.js, Express, PostgreSQL, Redux Toolkit</p>
      </section>
    </main>
  );
}
