import React from 'react';
import { FaFacebook, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#7C4B3C] text-white py-8 mt-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/path/to/moroccan-pattern.png')] opacity-20"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-center items-center mb-8">
                    <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] mx-auto mb-4">
                        <h2 className="text-6xl font-bold">دار تسنيم</h2>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center mb-8">
                    <div className="text-lg font-bold text-[#F5F5DC] mx-4 mb-4 md:mb-0 w-full md:w-1/2 flex flex-col items-center">
                        <h3 className="text-xl font-semibold mb-2">Horaires d’ouverture</h3>
                        <p className="text-lg mb-2">Ouvert au dîner tous les jours</p>
                        <p className="text-2xl bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] bg-clip-text hover:bg-gradient-to-r hover:from-[#e1e14d] hover:to-[#7C4B3C] text-transparent transition duration-300 ease-in-out">
                            De 11h à 23h
                        </p>
                    </div>

                    <div className="text-lg font-bold text-[#F5F5DC] mx-4 mb-4 md:mb-0 w-full md:w-1/2">
                        <h2 className="text-xl font-bold mb-4">Contactez-nous</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <FaEnvelope size={24} className="text-[#F5F5DC] mr-4" />
                                <a href="mailto:contact@restaurantmarocain.com" className="text-lg underline hover:text-[#e1e14d] transition">
                                    contact@restaurantmarocain.com
                                </a>
                            </div>
                            <div className="flex items-center">
                                <FaPhoneAlt size={24} className="text-[#F5F5DC] mr-4" />
                                <a href="tel:+212612345678" className="text-lg underline hover:text-[#e1e14d] transition">
                                    +212 6 74405737
                                </a>
                            </div>
                            <div className="flex items-center">
                                <FaMapMarkerAlt size={24} className="text-[#F5F5DC] mr-4" />
                                <p className="text-lg">227 Rue de la Gastronomie, Marrakech, Maroc</p>
                            </div>
                        </div>
                        <div className="flex justify-center space-x-6 mt-4">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F5F5DC] transition">
                                <FaFacebook size={20} />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F5F5DC] transition">
                                <FaInstagram size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <p className="text-sm"> {new Date().getFullYear()} دار تسنيم. Tous droits réservés.</p>
                    <p className="text-sm">
                        <a href="/terms" className="hover:text-[#F5F5DC] transition">Conditions d'utilisation</a> |
                        <a href="/privacy" className="hover:text-[#F5F5DC] transition"> Politique de confidentialité</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;