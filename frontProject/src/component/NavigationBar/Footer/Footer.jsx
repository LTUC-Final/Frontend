import {
  Building,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    // <>
    //   <div>
    //     <div className="displayRow">
    //       <div className="dispalycolumn">
    //         <img></img>
    //         <p>
    //           Mohammad & Ahmad Lutfi Al-Quraan – Al-Mersal Housing Company – is
    //           one of the leading Jordanian companies specializing in the
    //           development of modern residential projects. The company strives to
    //           provide integrated housing environments that combine high quality,
    //           contemporary design, and affordable prices. Al-Mersal is committed
    //           to offering housing solutions that meet the needs of individuals
    //           and families, with a strong focus on credibility, on-time project
    //           delivery, and after-sales service.
    //         </p>
    //       </div>

    //       <div className="dispalycolumn">
    //         <h1>Services</h1> <p></p>
    //         <p></p>
    //         <p></p>
    //         <p></p>
    //         <p></p>
    //       </div>
    //       <div className="dispalycolumn">
    //         <h1>Quick Links</h1>
    //         <p></p>
    //         <p></p>
    //         <p></p>
    //         <p></p>
    //         <p></p>
    //       </div>
    //       <div className="dispalycolumn">
    //         <h1>Contact Details</h1>
    //         <p></p>
    //         <p></p>
    //         <p></p>
    //         <p></p>
    //         <p></p>
    //       </div>
    //     </div>

    //     <hr />

    //     <div>
    //       <div>
    //         {" "}
    //         <div>facebook Icon</div>
    //         <div>Linked iN ICON </div>
    //       </div>

    //       <div>Copyright © 2025 . OmarEssam AlQuraan </div>
    //     </div>
    //   </div>
    // </>
    <div className="footer">
      <div className="footerContent">
        {/* Column 1: Logo and Description */}
        <div className="column">
          <div className="logoContainer">
            <img
              src="/images/logoM.png"
              alt="Al-Mersal Housing Company Logo"
              width={200}
              height={100}
              className="logo"
            />
          </div>
          <p className="description">
            Mohammad & Ahmad Lutfi Al-Quraan – Al-Mersal Housing Company – is
            one of the leading Jordanian companies specializing in the
            development of modern residential projects. The company strives to
            provide integrated housing environments that combine high quality,
            contemporary design, and affordable prices. Al-Mersal is committed
            to offering housing solutions that meet the needs of individuals and
            families, with a strong focus on credibility, on-time project
            delivery, and after-sales service.
          </p>
        </div>

        {/* Column 2: Services */}
        <div>
          <h1 className="heading">Services</h1>
          <ul className="linkList">
            <li className="linkItem">
              <Link href="#">
                <span className="linkPrefix">»»</span> Services Overview
              </Link>
            </li>
            <li className="linkItem">
              <Link href="#">
                <span className="linkPrefix">»»</span>OMAR
              </Link>
            </li>
            <li className="linkItem">
              <Link href="#">
                <span className="linkPrefix">»»</span>OMAR
              </Link>
            </li>
            <li className="linkItem">
              <Link href="#">
                <span className="linkPrefix">»»</span>OMAR
              </Link>
            </li>
            <li className="linkItem">
              <Link href="#">
                <span className="linkPrefix">»»</span> OMAR
              </Link>
            </li>
            <li className="linkItem">
              <Link href="#">
                <span className="linkPrefix">»»</span> OMAR
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div>
          <h1 className="heading">Quick Links</h1>
          <ul className="linkList">
            <li className="linkItem">
              <Link href="#">
                <span className="linkPrefix">»»</span> Home
              </Link>
            </li>
            <li className="linkItem">
              <Link href="#">
                <span className="linkPrefix">»»</span> About Us
              </Link>
            </li>
            <li className="linkItem">
              <Link href="#">
                <span className="linkPrefix">»»</span> Solutions
              </Link>
            </li>
            <li className="linkItem">
              <Link href="#">
                <span className="linkPrefix">»»</span> Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Details */}
        <div>
          <h1 className="heading">Contact Details</h1>
          <ul className="linkList">
            <li className="contactItem">
              <Phone className="contactIcon" />
              <span>+96200000000</span>
            </li>
            <li className="contactItem">
              <Building className="contactIcon" />
              <span>+96000000000</span>
            </li>
            <li className="contactItem">
              <Mail className="contactIcon" />
              <span>info@0</span>
            </li>
            <li className="contactItem">
              <Facebook className="contactIcon" />
              <span>info@0</span>
            </li>
            <li className="contactItem">
              <Instagram className="contactIcon" />
              <span>info@0</span>
            </li>
            <li className="contactItem">
              <Linkedin className="contactIcon" />
              <span>info@0</span>
            </li>
          </ul>
        </div>
      </div>

      <hr />

      {/* Footer Bottom Section */}
      <div className="footerBottom">
        <div className="socialLinks">
          <Link
            href="#"
            className="socialButton facebook"
            aria-label="Facebook"
          >
            <Facebook className="socialIcon" />
          </Link>
          <Link
            href="#"
            className={`socialButton linkedin`}
            aria-label="LinkedIn"
          >
            <Linkedin className="socialIcon" />
          </Link>
        </div>
        <p className="copyright">{"Copyright © 2025 . Omar Essam AlQuraan"}</p>
      </div>
    </div>
  );
}
