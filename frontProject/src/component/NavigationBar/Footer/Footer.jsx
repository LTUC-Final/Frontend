import {
  Building,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-[#0a1931] text-white py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Logo and Description */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center">
            <img
              src="/images/logoM.png"
              alt="A"
              width={200}
              height={100}
              className="logo"
            />
          </div>
          <p className="text-sm leading-relaxed text-gray-300">
            We are a platform dedicated to empowering skilled professionals and
            artisans to showcase their products and services effectively, while
            making it easy for users to access custom-made offerings. We support
            direct communication between customers and service providers, and
            provide marketing tools such as promotions, ratings, and reviews.
            Our mission is to promote remote work and stimulate the local
            economy, fostering a more connected and thriving community.
          </p>
        </div>

        {/* Column 2: Services */}
        <div>
          <h1 className="text-[10px] font-semibold mb-4">Services</h1>
          <ul className="flex flex-col gap-3 text-gray-300">
            <li>
              <Link
                to="#"
                className="flex items-center transition-colors duration-150 hover:text-white"
              >
                <span className="mr-2 text-blue-400 font-bold text-sm">»»</span>{" "}
                Services Overview
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center transition-colors duration-150 hover:text-white"
              >
                <span className="mr-2 text-blue-400 font-bold text-sm">»»</span>{" "}
                OMARs
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center transition-colors duration-150 hover:text-white"
              >
                <span className="mr-2 text-blue-400 font-bold text-sm">»»</span>{" "}
                OMARs
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center transition-colors duration-150 hover:text-white"
              >
                <span className="mr-2 text-blue-400 font-bold text-sm">»»</span>{" "}
                OMARs
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div>
          <h1 className="text-lg font-semibold mb-4">Quick Links</h1>
          <ul className="flex flex-col gap-3 text-gray-300">
            {["Home", "About Us", "Solutions", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  to="#"
                  className="flex items-center transition-colors duration-150 hover:text-white"
                >
                  <span className="mr-2 text-blue-400 font-bold text-sm">
                    »»
                  </span>{" "}
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Details */}
        <div>
          <h1 className="text-lg font-semibold mb-4">Contact Details</h1>
          <ul className="flex flex-col gap-3 text-gray-300">
            <li className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-blue-400" />
              <span>+96200000000</span>
            </li>
            <li className="flex items-center">
              <Building className="w-4 h-4 mr-2 text-blue-400" />
              <span>Amman, Jordan</span>
            </li>
            <li className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-blue-400" />
              <span>oquraan52@gmails.com</span>
            </li>
            <li className="flex items-center">
              <Facebook className="w-4 h-4 mr-2 text-blue-400" />
              <span>@AlQuraan</span>
            </li>
            <li className="flex items-center">
              <Instagram className="w-4 h-4 mr-2 text-blue-400" />
              <span>@AlQuraan</span>
            </li>
            <li className="flex items-center">
              <Linkedin className="w-4 h-4 mr-2 text-blue-400" />
              <span>@AlQuraan</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 pt-8 border-t border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-sm text-gray-400 md:flex-row md:justify-between">
          <div className="flex gap-4 md:mb-0">
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1877f2] hover:bg-[#145cb3] transition-colors duration-150"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0077b5] hover:bg-[#005582] transition-colors duration-150"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          <p className="md:text-right">
            © 2025 Omar Essam Al-Quraan. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
  