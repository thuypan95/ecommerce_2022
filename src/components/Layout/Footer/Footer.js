import { Link, useHistory, withRouter } from "react-router-dom";

const Footer = () => {
    let history = useHistory();
    return (
        <div className="py-6 px-3 lg:px-0 lg:py-16 bg-gray-100">
            <div className="container lg:flex">
                <div className="lg:w-1/3">
                    <span className="cursor-pointer" onClick={() => history.push("/")}>
                        <span className="text-3xl font-bold text-green-500">REPLEI 1995</span>
                    </span>
                    <p className="text-sm font-light my-2 lg:my-5">
                        We are a team of designers and developers that create high quality eCommerce, WordPress, Shopify .
                    </p>
                    <div className="text-sm">
                        <p className="mb-1"> <span className="font-semibold">Address:</span> 4710-4890 Breckinridge USA</p>
                        <p className="mb-1"> <span className="font-semibold">Email:</span> thuypan95@gmail.com</p>
                        <p className="mb-1"> <span className="font-semibold">Call us:</span> 0968 502 962</p>
                    </div>
                </div>
                <div className="md:flex lg:w-2/3">
                    <div className="lg:w-1/2 md:w-1/3 lg:mx-5 lg:flex lg:justify-center mt-4 lg:mt-0">
                        <div>
                            <h2 className="font-semibold mb-0 lg:mb-8">Information</h2>
                            <ul className="font-light text-sm">
                                <li className="mb-1"><Link to="/about-us">About us</Link></li>
                                <li className="mb-1"><Link to="/delivery-information">Delivery Information</Link></li>
                                <li className="mb-1"><Link to="/privacy-policy"> Privacy Policy</Link></li>
                                <li className="mb-1"><Link to="/term"> Terms & Conditions</Link></li>
                                <li className="mb-1"><Link to="/contact"> Contact Us</Link></li>
                                <li><Link to="/site-map"> Site Map</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="lg:w-1/2 mt-4 lg:mt-0 md:w-2/3">
                        <h2 className="font-semibold mb-0 lg:mb-8">Newsletter</h2>
                        <p className="text-sm font-light">
                            Receive our weekly newsletter.
                            For dietary content, fashion insider and the best offers.
                        </p>
                        <div className="relative mt-5">
                            <input type="text" className="focus:outline-none h-11 border rounded-full px-4 w-full" placeholder="Enter your email" />
                            <button className=" h-11 absolute right-0 w-28 rounded-r-full bg-green-600 text-white">SUBSCRIBE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Footer);