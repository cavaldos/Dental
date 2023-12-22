import {
    AiOutlineClockCircle,
    AiOutlineEnvironment,
    AiOutlinePhone,
    AiOutlineMail,
    AiOutlinePlus,
    AiFillFacebook,
    AiFillTwitterCircle,
    AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
    return (
        <footer id="footer" className="bg-[#1576FE] text-white">
            <div className="container mx-auto py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="footer-brand">
                        <a href="#" className="logo text-2xl font-bold text-black font-serif">
                            Tsitned.
                        </a>

                        <p className="footer-text">
                            Mauris non nisi semper, lacinia neque in, dapibus leo. Curabitur
                            sagittis libero tincidunt tempor finibus. Mauris at dignissim
                            ligula, nec tristique orci. Quisque vitae metus.
                        </p>

                        <div className="schedule flex items-center mt-4">
                            <div className="schedule-icon">
                                <AiOutlineClockCircle />
                            </div>

                            <span className="ml-2">Monday - Saturday: 9:00am - 10:00pm</span>
                        </div>
                    </div>

                    <ul className="footer-list">
                        <li>
                            <p className="footer-list-title text-black font-sans-serif">Other Links</p>
                        </li>

                        <li>
                            <a href="#" className="footer-link">
                                <AiOutlinePlus />
                                <span className="span">Home</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="footer-link">
                                <AiOutlinePlus />
                                <span className="span">About Us</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="footer-link">
                                <AiOutlinePlus />
                                <span className="span">Services</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="footer-link">
                                <AiOutlinePlus /><span className="span">Project</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="footer-link">
                                <AiOutlinePlus />
                                <span className="span">Our Team</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="footer-link">
                                <AiOutlinePlus />
                                <span className="span">Latest Blog</span>
                            </a>
                        </li>

                    </ul>

                    <ul className="footer-list">
                        <li>
                            <p className="footer-list-title text-black font-sans-serif">Our Services</p>
                        </li>


                        <li>
                            <a href="#" className="footer-link">
                                <AiOutlinePlus />
                                <span className="span">Root Canal</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="footer-link">
                                <AiOutlinePlus />
                                <span className="span">Alignment Teeth</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="footer-link">
                                <AiOutlinePlus />
                                <span className="span">Cosmetic Teeth</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="footer-link">
                                <AiOutlinePlus />
                                <span className="span">Oral Hygiene</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="footer-link">
                                <AiOutlinePlus />
                                <span className="span">Live Advisory</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="footer-link">
                                <AiOutlinePlus />
                                <span className="span">Cavity Inspection</span>
                            </a>
                        </li>
                    </ul>

                    <ul className="footer-list">
                        <li>
                            <p className="footer-list-title text-black font-sans-serif">Contact Us</p>
                        </li>

                        <li className="footer-item">
                            <div className="item-icon">
                                <AiOutlineEnvironment />
                            </div>

                            <address className="item-text">
                                227 Nguyen Van Cu, District 5, Ho Chi Minh, Vietnam
                            </address>
                        </li>

                        <li className="footer-item">
                            <div className="item-icon">
                                <AiOutlinePhone />
                            </div>

                            <a href="tel:+917052101786" className="footer-link">
                                +84-7052-101-786
                            </a>
                        </li>

                        <li className="footer-item">
                            <div className="item-icon">
                                <AiOutlineMail />
                            </div>

                            <a href="mailto:help@example.com" className="footer-link">
                                help@example.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom bg-gray-700 py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <p className="copyright text-sm">
                        &copy; 2023 All Rights Reserved by 21VP.
                    </p>

                    <ul className="social-list flex space-x-4">
                        <li>
                            <a href="#" className="social-link">
                                <AiFillFacebook />
                            </a>
                        </li>

                        <li>
                            <a href="#" className="social-link">
                                <AiFillTwitterCircle />
                            </a>
                        </li>

                        <li>
                            <a href="#" className="social-link">
                                <AiFillInstagram />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
