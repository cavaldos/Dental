import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import "../../assets/styles/index.scss";

const HomePage = () => {
  return (
    <>
      <div id="index">
        <main>
          <article>
            <section
              className="section hero"
              id="home"
              style={{ backgroundImage: `url('./images/hero-bg.png')` }}
              aria-label="hero"
            >
              <div className="container">
                <div className="hero-content">
                  <p className="section-subtitle">Welcome To Tsitned</p>

                  <h1 className="h1 hero-title">We Are Best Dental Service</h1>

                  <p className="hero-text">
                    Donec vitae libero non enim placerat eleifend aliquam erat
                    volutpat. Curabitur diam ex, dapibus purus sapien, cursus
                    sed nisl tristique, commodo gravida lectus non.
                  </p>
                </div>

                <figure className="hero-banner">
                  <img
                    src="./images/hero-banner.png"
                    width="587"
                    height="839"
                    alt="hero banner"
                    className="w-100"
                  />
                </figure>
              </div>
            </section>
            <section
              className="section service"
              id="service"
              aria-label="service"
            >
              <div className="container">
                <p className="section-subtitle text-center">Our Services</p>

                <h2 className="h2 section-title text-center">
                  What We Provide
                </h2>

                <ul className="service-list">
                  <li>
                    <div className="service-card">
                      <div className="card-icon">
                        <img
                          src="./images/service-icon-1.png"
                          width="100"
                          height="100"
                          loading="lazy"
                          alt="service icon"
                          className="w-100"
                        />
                      </div>

                      <div>
                        <h3 className="h3 card-title">Root Canal</h3>

                        <p className="card-text">
                          Aenean eleifend turpis tellus, nec laoreet metus
                          elementum ac.
                        </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="service-card">
                      <div className="card-icon">
                        <img
                          src="./images/service-icon-2.png"
                          width="100"
                          height="100"
                          loading="lazy"
                          alt="service icon"
                          className="w-100"
                        />
                      </div>

                      <div>
                        <h3 className="h3 card-title">Alignment Teeth</h3>

                        <p className="card-text">
                          Aenean eleifend turpis tellus, nec laoreet metus
                          elementum ac.
                        </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="service-card">
                      <div className="card-icon">
                        <img
                          src="./images/service-icon-3.png"
                          width="100"
                          height="100"
                          loading="lazy"
                          alt="service icon"
                          className="w-100"
                        />
                      </div>

                      <div>
                        <h3 className="h3 card-title">Cosmetic Teeth</h3>

                        <p className="card-text">
                          Aenean eleifend turpis tellus, nec laoreet metus
                          elementum ac.
                        </p>
                      </div>
                    </div>
                  </li>

                  <li className="service-banner">
                    <figure>
                      <img
                        src="./images/service-banner.png"
                        width="409"
                        height="467"
                        loading="lazy"
                        alt="service banner"
                        className="w-100"
                      />
                    </figure>
                  </li>

                  <li>
                    <div className="service-card">
                      <div className="card-icon">
                        <img
                          src="./images/service-icon-4.png"
                          width="100"
                          height="100"
                          loading="lazy"
                          alt="service icon"
                          className="w-100"
                        />
                      </div>

                      <div>
                        <h3 className="h3 card-title">Oral Hygiene</h3>

                        <p className="card-text">
                          Aenean eleifend turpis tellus, nec laoreet metus
                          elementum ac.
                        </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="service-card">
                      <div className="card-icon">
                        <img
                          src="./images/service-icon-5.png"
                          width="100"
                          height="100"
                          loading="lazy"
                          alt="service icon"
                          className="w-100"
                        />
                      </div>

                      <div>
                        <h3 className="h3 card-title">Live Advisory</h3>

                        <p className="card-text">
                          Aenean eleifend turpis tellus, nec laoreet metus
                          elementum ac.
                        </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="service-card">
                      <div className="card-icon">
                        <img
                          src="./images/service-icon-6.png"
                          width="100"
                          height="100"
                          loading="lazy"
                          alt="service icon"
                          className="w-100"
                        />
                      </div>

                      <div>
                        <h3 className="h3 card-title">Cavity Inspection</h3>

                        <p className="card-text">
                          Aenean eleifend turpis tellus, nec laoreet metus
                          elementum ac.
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            <section className="section about" id="about" aria-label="about">
              <div className="container">
                <figure className="about-banner">
                  <img
                    src="./images/about-banner.png"
                    width="470"
                    height="538"
                    loading="lazy"
                    alt="about banner"
                    className="w-100"
                  />
                </figure>

                <div className="about-content">
                  <p className="section-subtitle">About Us</p>

                  <h2 className="h2 section-title">
                    We Care For Your Dental Health
                  </h2>

                  <p className="section-text section-text-1">
                    Aliquam ac sem et diam iaculis efficitur. Morbi in enim
                    odio. Nullam quis volutpat est, sed dapibus sapien. Cras
                    condimentum eu velit id tempor. Curabitur purus sapien,
                    cursus sed nisl tristique, commodo vehicula arcu.
                  </p>

                  <p className="section-text">
                    Aliquam erat volutpat. Aliquam enim massa, sagittis blandit
                    ex mattis, ultricies posuere sapien. Morbi a dignissim enim.
                    Fusce elementum, augue in elementum porta, sapien nunc
                    volutpat ex, a accumsan nunc lectus eu lectus.
                  </p>

                  <a href="#" className="btn">
                    Read more
                  </a>
                </div>
              </div>
            </section>

            <section className="section doctor" aria-label="doctor">
              <div className="container">
                <p className="section-subtitle text-center">Our Doctor</p>

                <h2 className="h2 section-title text-center">
                  Best Expert Dentist
                </h2>

                <ul className="has-scrollbar">
                  <li className="scrollbar-item">
                    <div className="doctor-card">
                      <div
                        className="card-banner img-holder"
                        style={{ width: 460, height: 500 }}
                      >
                        <img
                          src="./images/doctor-1.png"
                          width="460"
                          height="500"
                          loading="lazy"
                          alt="Howard Holmes"
                          className="img-cover"
                        />
                      </div>

                      <h3 className="h3">
                        <a href="#" className="card-title">
                          Howard Holmes
                        </a>
                      </h3>

                      <p className="card-subtitle">Dentist</p>
                    </div>
                  </li>

                  <li className="scrollbar-item">
                    <div className="doctor-card">
                      <div
                        className="card-banner img-holder"
                        style={{ width: 460, height: 500 }}
                      >
                        <img
                          src="./images/doctor-2.png"
                          width="460"
                          height="500"
                          loading="lazy"
                          alt="Ella Thompson"
                          className="img-cover"
                        />
                      </div>

                      <h3 className="h3">
                        <a href="#" className="card-title">
                          Ella Thompson
                        </a>
                      </h3>

                      <p className="card-subtitle">Dentist</p>
                    </div>
                  </li>

                  <li className="scrollbar-item">
                    <div className="doctor-card">
                      <div
                        className="card-banner img-holder"
                        style={{ width: 460, height: 500 }}
                      >
                        <img
                          src="./images/doctor-3.png"
                          width="460"
                          height="500"
                          loading="lazy"
                          alt="Vincent Cooper"
                          className="img-cover"
                        />
                      </div>

                      <h3 className="h3">
                        <a href="#" className="card-title">
                          Vincent Cooper
                        </a>
                      </h3>

                      <p className="card-subtitle">Dentist</p>
                    </div>
                  </li>

                  <li className="scrollbar-item">
                    <div className="doctor-card">
                      <div
                        className="card-banner img-holder"
                        style={{ width: 460, height: 500 }}
                      >
                        <img
                          src="./images/doctor-4.png"
                          width="460"
                          height="500"
                          loading="lazy"
                          alt="Danielle Bryant"
                          className="img-cover"
                        />
                      </div>

                      <h3 className="h3">
                        <a href="#" className="card-title">
                          Danielle Bryant
                        </a>
                      </h3>

                      <p className="card-subtitle">Dentist</p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            <section className="section cta" aria-label="cta">
              <div className="container">
                <figure className="cta-banner">
                  <img
                    src="./images/cta-banner.png"
                    width="1056"
                    height="1076"
                    loading="lazy"
                    alt="cta banner"
                    className="w-100"
                  />
                </figure>

                <div className="cta-content">
                  <p className="section-subtitle">Book Dentail Appointment</p>

                  <h2 className="h2 section-title">
                    We Are open And Welcoming Patients
                  </h2>

                  <a href="#" className="btn">
                    Book appointment
                  </a>
                </div>
              </div>
            </section>

            <footer className="footer">
              <div className="footer-top section">
                <div className="container">
                  <div className="footer-brand">
                    <a href="#" className="logo">
                      Tsitned.
                    </a>

                    <p className="footer-text">
                      Mauris non nisi semper, lacinia neque in, dapibus leo.
                      Curabitur sagittis libero tincidunt tempor finibus. Mauris
                      at dignissim ligula, nec tristique orci.Quisque vitae
                      metus.
                    </p>

                    <div className="schedule">
                      <div className="schedule-icon">
                        <ion-icon name="time-outline"></ion-icon>
                      </div>

                      <span className="span">
                        Monday - Saturday: 9:00am - 10:00Pm
                      </span>
                    </div>
                  </div>

                  <ul className="footer-list">
                    <li>
                      <p className="footer-list-title">Other Links</p>
                    </li>

                    <li>
                      <a href="#" className="footer-link">
                        <ion-icon name="add-outline"></ion-icon>

                        <span className="span">Home</span>
                      </a>
                    </li>

                    <li>
                      <a href="#" className="footer-link">
                        <ion-icon name="add-outline"></ion-icon>

                        <span className="span">About Us</span>
                      </a>
                    </li>

                    <li>
                      <a href="#" className="footer-link">
                        <ion-icon name="add-outline"></ion-icon>

                        <span className="span">Services</span>
                      </a>
                    </li>

                    <li>
                      <a href="#" className="footer-link">
                        <ion-icon name="add-outline"></ion-icon>

                        <span className="span">Project</span>
                      </a>
                    </li>

                    <li>
                      <a href="#" className="footer-link">
                        <ion-icon name="add-outline"></ion-icon>

                        <span className="span">Our Team</span>
                      </a>
                    </li>

                    <li>
                      <a href="#" className="footer-link">
                        <ion-icon name="add-outline"></ion-icon>

                        <span className="span">Latest Blog</span>
                      </a>
                    </li>
                  </ul>

                  <ul className="footer-list">
                    <li>
                      <p className="footer-list-title">Our Services</p>
                    </li>

                    <li>
                      <a href="#" className="footer-link">
                        <ion-icon name="add-outline"></ion-icon>

                        <span className="span">Root Canal</span>
                      </a>
                    </li>

                    <li>
                      <a href="#" className="footer-link">
                        <ion-icon name="add-outline"></ion-icon>

                        <span className="span">Alignment Teeth</span>
                      </a>
                    </li>

                    <li>
                      <a href="#" className="footer-link">
                        <ion-icon name="add-outline"></ion-icon>

                        <span className="span">Cosmetic Teeth</span>
                      </a>
                    </li>

                    <li>
                      <a href="#" className="footer-link">
                        <ion-icon name="add-outline"></ion-icon>

                        <span className="span">Oral Hygiene</span>
                      </a>
                    </li>

                    <li>
                      <a href="#" className="footer-link">
                        <ion-icon name="add-outline"></ion-icon>

                        <span className="span">Live Advisory</span>
                      </a>
                    </li>

                    <li>
                      <a href="#" className="footer-link">
                        <ion-icon name="add-outline"></ion-icon>

                        <span className="span">Cavity Inspection</span>
                      </a>
                    </li>
                  </ul>

                  <ul className="footer-list">
                    <li>
                      <p className="footer-list-title">Contact Us</p>
                    </li>

                    <li className="footer-item">
                      <div className="item-icon">
                        <ion-icon name="location-outline"></ion-icon>
                      </div>

                      <address className="item-text">
                        1247/Plot No. 39, 15th Phase, LHB Colony, Kanpur
                      </address>
                    </li>

                    <li className="footer-item">
                      <div className="item-icon">
                        <ion-icon name="call-outline"></ion-icon>
                      </div>

                      <a href="tel:+917052101786" className="footer-link">
                        +91-7052-101-786
                      </a>
                    </li>

                    <li className="footer-item">
                      <div className="item-icon">
                        <ion-icon name="mail-outline"></ion-icon>
                      </div>

                      <a href="mailto:help@example.com" className="footer-link">
                        help@example.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="footer-bottom">
                <div className="container">
                  <p className="copyright">
                    &copy; 2022 All Rights Reserved by codewithsadee.
                  </p>

                  <ul className="social-list">
                    <li>
                      <a href="#" className="social-link">
                        <ion-icon name="logo-facebook"></ion-icon>
                      </a>
                    </li>

                    <li>
                      <a href="#" className="social-link">
                        <ion-icon name="logo-instagram"></ion-icon>
                      </a>
                    </li>

                    <li>
                      <a href="#" className="social-link">
                        <ion-icon name="logo-twitter"></ion-icon>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </footer>
          </article>
        </main>
      </div>
    </>
  );
};
export default HomePage;
