"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const carouselImages = [
    {
        src: '/pic5.jpg',
        title: 'BIENVENUE À DAR TASSNIME',
        paragraph: "Plongez dans un univers de saveurs marocaines dans un cadre de rêve. Laissez-nous vous emmener pour un voyage culinaire inoubliable.",
    },
    {
        src: '/pic9.jpg',
        title: 'BIENVENUE À DAR TASSNIME',
        paragraph: "Découvrez un lieu de charme et d'élégance, où chaque plat est une célébration des traditions culinaires marocaines.",
    },
    {
        src: '/pic4.jpg',
        title: 'BIENVENUE À DAR TASSNIME',
        paragraph: "Bienvenue dans un oasis de raffinement et d'authenticité, où les saveurs marocaines sont à l'honneur.",
    },
];

const Accueil: React.FC = () => {
    return (
        <div className="relative w-full overflow-hidden">
           <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                className="w-full"
            >
                {carouselImages.map((image, index) => (
                    <SwiperSlide key={index} className="relative flex items-center justify-center">
                        <div className="relative w-full h-[600px]">
                            <Image
                                src={image.src}
                                alt={image.title}
                                layout="fill"
                                objectFit="cover" 
                                className="transition-all duration-500"
                                priority
                            />
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-50 text-white text-center p-4 rounded-lg">
                                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] animate-zoom-in">
                                    {image.title}
                                </h2>
                                <p className="text-3xl animate-zoom-in">{image.paragraph}</p>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-500 hover:filter hover:blur-sm"></div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="flex flex-col md:flex-row items-center justify-center my-12 p-10 bg-gradient-to-r from-[#F5F5DC] to-[#F9F9F9] rounded-2xl shadow-2xl text-center">
                <div className="w-full md:w-3/4 flex flex-col items-center">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] mb-8 font-serif text-center">دار تسنيم</h1>
                    <p className="text-xl text-gray-700 leading-relaxed mb-8 font-light text-center">
                        Le restaurant دار تسنيم, situé à Rabat, doit sa magie à Yassine HASNI. Niché dans un cadre enchanteur, il propose une expérience culinaire authentique où tradition et raffinement se rencontrent. On y déguste des plats savoureux préparés avec des produits du terroir, dans une ambiance chaleureuse et conviviale.
                    </p>
                    <Link href="/restaurant">
                        <button className="mt-4 px-8 py-4 rounded-lg shadow-lg text-white text-xl font-semibold transition-transform transform hover:scale-110 bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] hover:brightness-110">
                            Lire Plus
                        </button>
                    </Link>
                </div>
                <div className="w-full md:w-3/4 mt-8 flex justify-center">
                    <Image src="/pic6.jpg" alt="À Propos" width={700} height={500} className="w-full h-auto rounded-xl shadow-lg" />
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center my-12 p-10 bg-gradient-to-r from-[#F5F5DC] to-[#F9F9F9] rounded-2xl shadow-2xl text-center">
                <div className="w-full md:w-3/4 flex justify-center">
                    <Image src="/pic4.jpg" alt="Rituel des lieux" width={700} height={500} className="w-full h-auto rounded-xl shadow-lg" />
                </div>
                <div className="w-full md:w-3/4 flex flex-col items-center mt-8">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] mb-8 font-serif text-center">دار تسنيم</h1>
                    <p className="text-xl text-gray-700 leading-relaxed mb-8 font-light text-center">
                        Visiter دار تسنيم, c'est vivre une expérience immersive alliant raffinement et tradition. Yassine HASNI, maître des lieux, accueille chaleureusement ses invités pour un moment d’évasion culinaire unique. Dans une ambiance authentique, chaque visite devient un voyage sensoriel où saveurs et hospitalité se rencontrent.
                    </p>
                    <Link href="/restaurant">
                        <button className="mt-4 px-8 py-4 rounded-lg shadow-lg text-white text-xl font-semibold transition-transform transform hover:scale-110 bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] hover:brightness-110">
                            Lire Plus
                        </button>
                    </Link>
                </div>
            </div>
            <div className="relative w-full h-96 my-12">
            <Image src="/pic20.jpg" alt="Image pleine écran" width={800} height={600} className="w-full h-full object-cover rounded-lg shadow-lg" />
            </div>
            {/* <div className="relative w-full h-[500px] my-12">
                <Image src="/pic20.jpg" alt="Image pleine écran" layout="fill" objectFit="cover" className="rounded-lg shadow-lg" />
            </div> */}

            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] mb-8 text-center">NOTRE MENU</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="menu-item bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-all">
                    <Link  className="relative group" href="/menu">
                        <div className="w-full h-[200px] overflow-hidden rounded-lg mb-4">
                            <Image src="/pic19.jpg" alt="Entrée" width={300} height={200} className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110" />
                        </div>
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Entrées</h2>
                            <p className="text-white text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                                LES
                                <br />
                                ENTRÉES
                            </p>
                        </div>
                    </Link >
                </div>
                <div className="menu-item bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-all">
                    <Link className="relative group" href="/menu">
                        <div className="w-full h-[200px] overflow-hidden rounded-lg mb-4">
                            <Image src="/pic14.jpg" alt="Plats" width={300} height={200} className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110" />
                        </div>
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] mb-2">Plats</h2>
                            <p className="text-white text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                                LES
                                <br />
                                PLATS
                            </p>
                        </div>
                    </Link >
                </div>
                <div className="menu-item bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-all">
                    <Link  className="relative group" href="/menu">
                        <div className="w-full h-[200px] overflow-hidden rounded-lg mb-4">
                            <Image src="/pic18.jpg" alt="Dessert" width={300} height={200} className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110" />
                        </div>
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] mb-2">Desserts</h2>
                            <p className="text-white text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                                LES
                                <br />
                                DESSERTS
                            </p>

                        </div>
                    </Link >
                </div>
            </div>

            <div className="instagram-section text-center my-12">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] mb-4">Suivez-nous sur Instagram</h1>
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] mb-4">#dartassnime</p>
            </div>


        </div>
    );
};

export default Accueil;


