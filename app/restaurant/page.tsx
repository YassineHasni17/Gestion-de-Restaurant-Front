'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Restaurant: React.FC = () => {
    return (
        <div className="relative bg-[#ffffff] font-sans w-full">
            
            <div className="relative w-full h-[80vh]">
                <img
                    src="/pic5.jpg"
                    alt="Restaurant"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <h1 className="relative text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] border-b-4 border-[#F5F5DC] pb-3 tracking-wide z-10">
                    Restaurant
                    </h1>
                </div>
            </div>
            <div className="flex justify-center w-full mt-12 mb-12">
                <Card className="bg-[#f9f9f9] shadow-md border border-[#7C4B3C] w-full max-w-4xl">
                    <CardContent className="p-8">
                        <h2 className="text-5xl font-semibold text-[#7C4B3C] mb-4 text-center">
                            À propos
                        </h2>
                        <p className="text-xl text-gray-800 leading-relaxed text-justify">
                            Le restaurant دار تسنيم, situé à Rabat, doit la magie de ce lieu à Yassine HASNI. 
                            Idéalement situé au cœur de la médina de Marrakech, Dar Yacout est considéré comme la perle des restaurants de la ville ocre. 
                            Table d’hôtes des plus anciennes de Marrakech, on doit la magie de ce lieu à Mohamed Zkhiri qui en a fait un passage immanquable pour les gourmands et gourmets à la quête d’expériences authentiques. 
                            Il s’agit d’une adresse constituée d’un cadre des plus enchanteurs, où il fait bon de savourer un cocktail tout en contemplant la magie du coucher de soleil, ou encore déguster un repas de chef finement concocté grâce aux produits du terroir.
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-col md:flex-row items-center w-full px-6 md:px-16 lg:px-32 space-y-6 md:space-y-0 md:space-x-10 ">
                <div className="w-full md:w-1/2 ">
                    <img
                        src="/pic9.jpg"
                        alt="Rituel des lieux"
                        className="w-full h-[500px] rounded-lg shadow-xl object-cover"
                    />
                </div>
                
                <Card className="shadow-md bg-white border border-gray-200 w-full md:w-1/2">
                    <CardContent className="p-8">
                        <h2 className="text-5xl font-semibold text-[#7C4B3C] mb-4 text-center">
                            Rituel des lieux
                        </h2>
                        <p className="text-xl text-gray-800 leading-relaxed text-justify">
                            Se rendre à دار تسنيم est une expérience qui dépasse de loin la simple découverte culinaire. 
                            Il s’agit d’une véritable immersion dans un univers hors du temps, où chaque moment devient une évasion magique, guidée par le bon goût et le raffinement. 
                            Dans la tradition familiale marocaine, دار تسنيم réserve à ses invités un accueil des plus chaleureux, assuré personnellement par Yassine HASNI. 
                            Maître des lieux, Yassine se fait un plaisir de recevoir ses hôtes en leur souhaitant la bienvenue.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Restaurant;
