import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* HERO SECTION */}
            <div className="pt-32 pb-20 px-8 relative">
                <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
                <div className="max-w-6xl mx-auto text-center space-y-6">
                    <h2 className="text-5xl md:text-6xl font-serif text-white tracking-widest text-glow leading-tight">
                        POTOMAC{" "}
                        <span className="text-potomac-gold italic">
                            DATABASE SYSTEMS
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto uppercase tracking-widest border-t border-b border-white/10 py-2 inline-block">
                        The Lunar Data Company.
                    </p>
                </div>
            </div>

            {/* MAIN CONTENT (Grid Layout) */}
            <main className="flex-1 px-8 pb-20 relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 1. PROBLEM (Full Width) */}
                    <div className="glass-card p-10 rounded-lg md:col-span-2 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition">
                            <svg
                                className="w-32 h-32 text-potomac-gold"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                ></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-serif text-potomac-gold tracking-widest mb-6">
                            THE PROBLEM
                        </h3>
                        <div className="space-y-4 text-gray-300 leading-relaxed font-light text-lg">
                            <p>
                                The emerging lunar economy faces a critical data
                                bottleneck. Today, lunar surface data collection
                                is defined by impermanence; solar-powered assets
                                operate for only 14 days before freezing
                                permanently during the -170°C lunar night.
                            </p>
                            <p>
                                Consequently, data is scarce, fragmented, and
                                prohibitively expensive (exceeding{" "}
                                <strong>$2 million per gigabyte</strong>).
                            </p>
                            <p className="border-l-2 border-potomac-gold pl-4 italic text-white/90">
                                We need terabytes or petabytes of data to enable
                                resource utilization and persistent human
                                habitation, but no one is focused on making the
                                data affordable. Until now - Potomac is a
                                dedicated Lunar Data company.
                            </p>
                        </div>
                    </div>

                    {/* NOTE: The Video section was commented out in your HTML. 
             I have removed it here to match the provided file. 
             If you need it back, uncomment the block below.
          */}
                    {/* <div className="md:col-span-2 w-full rounded-lg overflow-hidden border border-potomac-gold/20 shadow-2xl relative group"> ... </div> */}

                    {/* 2. SOURCE */}
                    <div
                        className="glass-card p-0 rounded-lg flex flex-col relative group overflow-hidden cursor-pointer"
                        onClick={() => navigate("/source")}
                    >
                        {/* Image Background */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="/Source Rendering.png"
                                alt="Source Hardware"
                                className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-potomac-secondary via-potomac-secondary/80 to-transparent"></div>
                        </div>

                        <div className="p-10 relative z-10 flex flex-col h-full">
                            <div className="absolute top-6 right-6 p-2 bg-potomac-gold/10 rounded-full">
                                <svg
                                    className="w-6 h-6 text-potomac-gold"
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
                            <h3 className="text-2xl font-serif text-white tracking-widest mb-4 group-hover:text-potomac-gold transition">
                                SOURCE
                            </h3>
                            <p className="text-gray-400 leading-relaxed flex-1">
                                A persistent sensor node and proprietary thermal
                                packaging to survive the lunar night. Source
                                operates for years, turning lunar understanding
                                from brief snapshots into a continuous, dynamic
                                picture.
                            </p>
                            <span className="mt-6 text-xs font-bold text-potomac-gold uppercase tracking-widest border-b border-potomac-gold/30 pb-1 self-start hover:border-potomac-gold transition">
                                View Hardware Specs
                            </span>
                        </div>
                    </div>

                    {/* 3. NEXUS */}
                    <div
                        className="glass-card p-0 rounded-lg flex flex-col relative group overflow-hidden cursor-pointer"
                        onClick={() => navigate("/nexus")}
                    >
                        {/* Image Background */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="/Nexus Screenshot.png"
                                alt="Nexus Platform Interface"
                                className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-potomac-secondary via-potomac-secondary/80 to-transparent"></div>
                        </div>

                        <div className="p-10 relative z-10 flex flex-col h-full">
                            <div className="absolute top-6 right-6 p-2 bg-potomac-gold/10 rounded-full">
                                <svg
                                    className="w-6 h-6 text-potomac-gold"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                    ></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-serif text-white tracking-widest mb-4 group-hover:text-potomac-gold transition">
                                NEXUS
                            </h3>
                            <p className="text-gray-400 leading-relaxed flex-1">
                                A unified analytics platform that aggregates
                                existing public data with the exclusive,
                                high-value data streams collected by Source.
                            </p>
                            <span className="mt-6 text-xs font-bold text-potomac-gold uppercase tracking-widest border-b border-potomac-gold/30 pb-1 self-start hover:border-potomac-gold transition">
                                See more Nexus
                            </span>
                        </div>
                    </div>

                    {/* 4. IMPACT (Full Width) */}
                    <div className="glass-card p-10 rounded-lg md:col-span-2 bg-gradient-to-r from-potomac-gold/5 to-transparent border-potomac-gold/20">
                        <h3 className="text-2xl font-serif text-potomac-gold tracking-widest mb-4">
                            IMPACT
                        </h3>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            By reducing the cost of lunar surface data by{" "}
                            <strong>90%</strong>, and demonstrating the first
                            systemic, persistent operations on the Moon, we
                            provide the data needed to de-risk future
                            investments in lunar science, domain awareness,
                            resource utilization and landing/habitation site
                            characterization.
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
