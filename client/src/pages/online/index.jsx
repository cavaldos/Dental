import "../../assets/styles/index.scss";

const HomePage = () => {
  return (
    <>
      <div id="index">
        <div className="body">
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

                    <a href="/dat-lich-hen" className="btn">
                      Book appointment
                    </a>

                  </div>
                </div>
              </section>

            </article>
          </main>
         


        </div>

      </div>
    </>
  );
};
export default HomePage;
