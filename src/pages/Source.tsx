import React, { useState } from "react";
import Modal from "../components/Modal";

const Source: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            {/* HERO */}
            <div className="pt-32 pb-6 px-8 relative bg-potomac-primary">
                <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
                <div className="relative z-10 text-center space-y-6 max-w-5xl mx-auto">
                    <h2 className="text-6xl md:text-8xl font-serif text-white tracking-widest text-glow leading-tight">
                        SOURCE
                    </h2>
                    <p className="text-2xl text-potomac-gold font-light tracking-[0.3em] uppercase">
                        The Persistent Sensor Node
                    </p>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto pt-4 leading-relaxed border-t border-white/10">
                        Designed to survive the 14-day lunar night. Built to
                        operate for years. Source transforms lunar exploration
                        from fleeting moments into a continuous data stream.
                    </p>
                </div>
            </div>

            {/* MAIN */}
            <main className="flex-1 px-8 py-2 relative z-10 bg-potomac-secondary">
                <div className="max-w-7xl mx-auto space-y-2">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-potomac-gold/30 flex-1"></div>
                        <h3 className="text-2xl font-serif text-potomac-cream tracking-widest">
                            POTOMAC SOURCE
                        </h3>
                        <div className="h-px bg-potomac-gold/30 flex-1"></div>
                    </div>

                    <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-potomac-gold/20 shadow-2xl mb-16 group">
                        <img
                            src="/Source Rendering.png"
                            alt="Source Hardware on Lunar Surface"
                            className="w-full h-full object-cover transition transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-potomac-secondary via-transparent to-transparent opacity-60"></div>
                        <div className="absolute bottom-8 left-8">
                            <p className="text-potomac-gold text-xs font-bold uppercase tracking-widest mb-1">
                                Mission Configuration
                            </p>
                            <h4 className="text-2xl text-white font-serif tracking-wider">
                                VAPORS Lander Class
                            </h4>
                        </div>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Features (Condensed for brevity, similar structure to Home) */}
                        <FeatureCard
                            icon={
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                ></path>
                            }
                            title="Extreme Survival"
                            desc="Proprietary thermal packaging and cutting-edge insulation enable operations through the -170°C lunar night without massive power draw inside the Space Garage."
                        />
                        <FeatureCard
                            icon={
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            }
                            title="Long-Endurance Power"
                            desc="Integrated lightweight heaters and high-efficiency power management systems ensure multi-year operational lifespans, not just weeks."
                        />
                        {/* Instruments - Full Width */}
                        <div className="glass-card p-8 rounded-lg group md:col-span-2 lg:col-span-3 bg-gradient-to-r from-potomac-gold/5 to-transparent">
                            <div className="w-12 h-12 mb-6 text-potomac-gold border border-potomac-gold/30 rounded-full flex items-center justify-center bg-white/5">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                    ></path>
                                </svg>
                            </div>
                            <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-3">
                                Modular Instrument Core
                            </h4>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                Interoperable with flight-qualified instruments
                                for comprehensive site characterization:
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-400">
                                {[
                                    "Neutron Spectrometers",
                                    "Stereo Cameras (DTM)",
                                    "Mass Spectrometers",
                                    "Geotech Penetrometers",
                                ].map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="w-1.5 h-1.5 bg-potomac-gold rounded-full"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="glass-card p-8 rounded-lg group md:col-span-1 lg:col-span-2">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-12 h-12 shrink-0 text-potomac-gold border border-potomac-gold/30 rounded-full flex items-center justify-center bg-white/5">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                        ></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-3">
                                        Integrated Mobility
                                    </h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        Includes a deployable mobility asset
                                        that extends science reach up to{" "}
                                        <strong>10km</strong> from the landing
                                        site, enabling broad-area surveys from a
                                        single node.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-8 rounded-lg group border-potomac-gold/30 bg-potomac-gold/5">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-3xl font-bold text-potomac-gold">
                                    90%
                                </div>
                                <h4 className="text-lg font-bold text-white uppercase tracking-wider">
                                    Radical Affordability
                                </h4>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                By amortizing persistent operations across
                                multiple customers, Source brings the cost of a
                                high-fidelity lunar dataset down to as little as{" "}
                                <strong>$5 Million</strong>.
                            </p>
                        </div>
                    </div>

                    <div className="text-center pt-10 pb-10 border-t border-white/5">
                        <p className="text-potomac-gold uppercase tracking-[0.2em] text-sm mb-6">
                            Current Mission Status:{" "}
                            <span className="text-white font-bold">
                                INVITE ONLY
                            </span>
                        </p>
                        <h3 className="text-3xl font-serif text-white mb-8">
                            Secure Your Dataset
                        </h3>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-8 py-4 bg-transparent border border-potomac-gold text-potomac-gold font-bold uppercase tracking-widest hover:bg-potomac-gold hover:text-potomac-primary transition duration-300"
                        >
                            Register Interest
                        </button>
                    </div>
                </div>
            </main>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                context="source_interest"
            />
        </>
    );
};

const FeatureCard = ({
    icon,
    title,
    desc,
}: {
    icon: any;
    title: string;
    desc: string;
}) => (
    <div className="glass-card p-8 rounded-lg group">
        <div className="w-12 h-12 mb-6 text-potomac-gold border border-potomac-gold/30 rounded-full flex items-center justify-center bg-white/5">
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                {icon}
            </svg>
        </div>
        <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-3">
            {title}
        </h4>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
);

export default Source;
