import React from "react";

const Team: React.FC = () => {
    return (
        <>
            {/* HERO SECTION */}
            <div className="pt-32 pb-16 px-8 relative bg-potomac-primary">
                <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
                <div className="relative z-10 text-center space-y-6 max-w-5xl mx-auto">
                    <h2 className="text-5xl md:text-6xl font-serif text-white tracking-widest text-glow leading-tight">
                        LEADERSHIP & ADVISORS
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto pt-4 leading-relaxed border-t border-white/10">
                        Pioneering the future of lunar data with a team of
                        experts in engineering, science, and space exploration.
                    </p>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <main className="flex-1 px-8 py-12 relative z-10 bg-potomac-secondary">
                <div className="max-w-7xl mx-auto space-y-20">
                    {/* Leadership Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-potomac-gold/30 flex-1"></div>
                        <h3 className="text-2xl font-serif text-potomac-cream tracking-widest">
                            LEADERSHIP TEAM
                        </h3>
                        <div className="h-px bg-potomac-gold/30 flex-1"></div>
                    </div>

                    {/* Leadership Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Jacob Matthews */}
                        <div className="glass-card p-8 rounded-lg flex flex-col items-center text-center group">
                            <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-potomac-gold/50 mb-6 group-hover:border-potomac-gold transition">
                                <img
                                    src="/jacob_matthews.jpeg"
                                    alt="Jacob Matthews"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h4 className="text-2xl font-serif text-white tracking-wider mb-1">
                                Jacob Matthews
                            </h4>
                            <p className="text-potomac-gold text-sm font-bold uppercase tracking-widest mb-4">
                                CEO & Founder
                            </p>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Visionary leader driving the mission to unlock
                                the lunar economy. Jacob brings a unique blend
                                of strategic foresight and technical acumen,
                                guiding Potomac Nexus towards becoming the
                                premier lunar data company.
                            </p>
                        </div>

                        {/* Cole Duffner */}
                        <div className="glass-card p-8 rounded-lg flex flex-col items-center text-center group">
                            <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-potomac-gold/50 mb-6 group-hover:border-potomac-gold transition">
                                <img
                                    src="/cole_duffner.jpeg"
                                    alt="Cole Duffner"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h4 className="text-2xl font-serif text-white tracking-wider mb-1">
                                Cole Duffner
                            </h4>
                            <p className="text-potomac-gold text-sm font-bold uppercase tracking-widest mb-4">
                                Co-Founder & Nexus Lead Engineer
                            </p>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                The architect behind the Nexus platform. Cole
                                leads the engineering efforts, ensuring the
                                seamless integration of complex lunar data into
                                a user-friendly, high-performance interface.
                            </p>
                        </div>
                    </div>

                    {/* Advisors Section - Commented out to match source HTML */}
                    {/* <div className="flex items-center gap-4 mb-8 pt-10">
                        <div className="h-px bg-potomac-gold/30 flex-1"></div>
                        <h3 className="text-2xl font-serif text-potomac-cream tracking-widest">ADVISORY BOARD</h3>
                        <div className="h-px bg-potomac-gold/30 flex-1"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <AdvisorCard 
                            img="/chad_barklay.jpeg" 
                            name="Dr. Chad Barklay" 
                            role="Advisor, UDRI" 
                            desc="Distinguished expert from the University of Dayton Research Institute, providing critical guidance on advanced materials and power systems for extreme environments."
                        />
                        <AdvisorCard 
                            img="/ann_carbonell.jpeg" 
                            name="Dr. Ann Carbonell" 
                            role="Advisor, UDRI DTC" 
                            desc="Leading voice from the UDRI Digital Transformation Center, advising on data strategy, digital infrastructure, and the integration of cutting-edge technologies."
                        />
                        <AdvisorCard 
                            img="/clive_neal.jpeg" 
                            name="Dr. Clive Neal" 
                            role="Advisor, Notre Dame" 
                            desc="Renowned lunar scientist and professor at the University of Notre Dame, offering deep expertise in lunar geology, petrology, and exploration strategy."
                        />
                    </div> */}
                </div>
            </main>
        </>
    );
};

// Reusable Advisor Card component (kept in code but unused for now)
// const AdvisorCard = ({
//     img,
//     name,
//     role,
//     desc,
// }: {
//     img: string;
//     name: string;
//     role: string;
//     desc: string;
// }) => (
//     <div className="glass-card p-6 rounded-lg flex flex-col items-center text-center group">
//         <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-potomac-gold/30 mb-4 group-hover:border-potomac-gold transition">
//             <img src={img} alt={name} className="w-full h-full object-cover" />
//         </div>
//         <h4 className="text-xl font-serif text-white tracking-wider mb-1">
//             {name}
//         </h4>
//         <p className="text-potomac-gold/80 text-xs font-bold uppercase tracking-widest mb-3">
//             {role}
//         </p>
//         <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
//     </div>
// );

export default Team;
