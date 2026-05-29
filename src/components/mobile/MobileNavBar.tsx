import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MobileNav: React.FC = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (!isOpen) return;
        const scrollY = window.scrollY;
        const { body } = document;
        body.style.position = "fixed";
        body.style.top = `-${scrollY}px`;
        body.style.width = "100%";
        return () => {
            body.style.position = "";
            body.style.top = "";
            body.style.width = "";
            window.scrollTo(0, scrollY);
        };
    }, [isOpen]);

    const getDrawerLinkClass = (path: string) => {
        const isActive = location.pathname === path;
        return `py-4 pl-4 border-l-2 text-base font-semibold tracking-widest uppercase transition ${
            isActive
                ? "text-potomac-gold border-potomac-gold"
                : "text-gray-300 border-transparent hover:text-potomac-gold"
        }`;
    };

    return (
        <>
            {/* Hamburger */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
                aria-expanded={isOpen}
                className="md:hidden p-3 text-potomac-gold"
            >
                <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            {/* Backdrop */}
            <div
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
                className={`md:hidden fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
                    isOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            />

            {/* Drawer */}
            <aside
                aria-hidden={!isOpen}
                className={`md:hidden fixed top-0 right-0 h-full w-72 bg-potomac-primary border-l border-potomac-gold/30 z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex justify-end p-3">
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close menu"
                        className="p-3 text-potomac-gold"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col gap-2 px-8 pt-4">
                    <Link to="/nexus" className={getDrawerLinkClass("/nexus")}>
                        Nexus
                    </Link>
                    <Link
                        to="/source"
                        className={getDrawerLinkClass("/source")}
                    >
                        Source
                    </Link>
                    <Link to="/team" className={getDrawerLinkClass("/team")}>
                        Team
                    </Link>
                    <Link to="/news" className={getDrawerLinkClass("/news")}>
                        News
                    </Link>
                </div>

                <div className="h-px bg-white/10 my-4 mx-8" />

                <a
                    href="https://www.potomacdb.com/"
                    className="block text-center mx-8 px-5 py-3 border border-potomac-gold text-potomac-gold text-xs font-bold tracking-[0.2em] uppercase rounded hover:bg-potomac-gold hover:text-potomac-primary transition duration-300"
                >
                    Sign in / Sign Up
                </a>
            </aside>
        </>
    );
};

export default MobileNav;
