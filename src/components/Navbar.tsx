"use client";
import { useCallback, useEffect, useRef, useState } from "react";

function Navbar() {
	const navItems = [
		{ href: "#home", label: "Home" },
		{ href: "#about", label: "About" },
		{ href: "#projects", label: "Projects" },
		{ href: "#contact", label: "Contact" },
	];

	const [atTop, setAtTop] = useState(true);
	const [activeSection, setActiveSection] = useState<string>("home");
	const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
	const [underlineStyle, setUnderlineStyle] = useState<{ left: number; width: number } | null>(null);
	useEffect(() => {
		const onScroll = () => setAtTop(window.scrollY < 10);
		window.addEventListener("scroll", onScroll);
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Intersection Observer for active section
	useEffect(() => {
		const sectionIds = ["home", "about", "projects", "contact"];
		function onScroll() {
			const scrollPos = window.scrollY + (window.innerHeight / 3);
			let current = "home";
			for (const id of sectionIds) {
				const el = document.getElementById(id);
				if (el) {
					const rect = el.getBoundingClientRect();
					const top = rect.top + window.scrollY;
					if (scrollPos >= top) {
						current = id;
					}
				}
			}
			// If near the bottom of the page, always set to contact
			if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight -100)) {
				current = "contact";
			}
			setActiveSection(current);
		}
		window.addEventListener("scroll", onScroll);
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Update underline position when activeSection or window size changes
	useEffect(() => {
		const idx = navItems.findIndex(item => item.href.replace('#', '') === activeSection);
		const el = navRefs.current[idx];
		if (el) {
			const rect = el.getBoundingClientRect();
			const navRect = el.parentElement?.parentElement?.getBoundingClientRect();
			if (navRect) {
				setUnderlineStyle({
					left: rect.left - navRect.left,
					width: rect.width
				});
			}
		}
	}, [activeSection, navItems.length]);

	useEffect(() => {
		const handleResize = () => {
			const idx = navItems.findIndex(item => item.href.replace('#', '') === activeSection);
			const el = navRefs.current[idx];
			if (el) {
				const rect = el.getBoundingClientRect();
				const navRect = el.parentElement?.parentElement?.getBoundingClientRect();
				if (navRect) {
					setUnderlineStyle({
						left: rect.left - navRect.left,
						width: rect.width
					});
				}
			}
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	}, [activeSection, navItems.length]);

	const handleNavClick = useCallback(
		(
			e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
			href: string
		) => {
			if (href.startsWith("#")) {
				e.preventDefault();
				const el = document.getElementById(href.substring(1));
				if (el) {
					if (href === "#home") {
						window.scrollTo({ top: 0, behavior: "smooth" });
					} else {
						// Get navbar height (fixed or relative)
						const navbar = document.querySelector('nav');
						const navHeight = navbar ? navbar.offsetHeight : 0;
						const rect = el.getBoundingClientRect();
						const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
						const top = rect.top + scrollTop - navHeight - 15; // 8px extra for spacing
						window.scrollTo({ top, behavior: "smooth" });
					}
				}
			}
		},
		[]
	);

	return (
		<nav
			className={`w-[60vw] mx-auto flex items-center justify-between py-4 px-8 bg-[#44444E] text-[#F5EFE6] transition-all duration-300 [transition-property:margin,box-shadow,border-radius] ${
				atTop ? "rounded-b-2xl rounded-t-none mt-0" : "rounded-2xl mt-2 shadow-lg"
			}`}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 50,
			}}
		>
			{/* Make ul relative for underline positioning */}
			<ul className="flex gap-8 text-lg font-semibold relative">
				{navItems.map((item, index) => {
					const sectionId = item.href.replace('#', '');
					const isActive = activeSection === sectionId;
					return (
						<li key={item.href}>
							<a
								href={item.href}
								ref={el => { navRefs.current[index] = el; }}
								className={`transition-colors ${isActive ? 'text-[#F5EFE6]' : 'opacity-80 hover:text-[#F5EFE6]'}`}
								onClick={(e) => handleNavClick(e, item.href)}
							>
								{item.label}
							</a>
						</li>
					);
				})}
				{/* Sliding underline */}
				{underlineStyle && (
					<span
						className="absolute bottom-0 h-1 bg-[#F5EFE6] rounded-full transition-all duration-300"
						style={{
							left: underlineStyle.left,
							width: underlineStyle.width,
							pointerEvents: 'none',
						}}
					/>
				)}
			</ul>
					<div className="flex gap-4 items-center">
						{/* LinkedIn button with tooltip */}
						<a
							href="https://www.linkedin.com/in/connor-thorpen/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LinkedIn"
							title="LinkedIn"
							className="hover:opacity-80 relative group"
						>
							<svg
								width="28"
								height="28"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									fill="#F5EFE6"
									d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"
								/>
							</svg>
							<span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-[#222] text-[#F5EFE6] text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50">
								LinkedIn
							</span>
						</a>
						{/* GitHub button with tooltip */}
						<a
							href="https://github.com/ConnorThorpen"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub"
							title="GitHub"
							className="hover:opacity-80 relative group"
						>
							<svg width="28" height="28" fill="none" viewBox="0 0 24 24">
								<path fill="#F5EFE6" d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"/>
							</svg>
							<span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-[#222] text-[#F5EFE6] text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50">
								GitHub
							</span>
						</a>
						{/* Resume download button with tooltip */}
						<a
							href="/Connor_Thorpen.pdf"
							download
							aria-label="Download Resume"
							title="Download Resume"
							className="hover:opacity-80 relative group"
						>
							<svg
								width="28"
								height="28"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									fill="#F5EFE6"
									d="M12 16.5c-.28 0-.53-.11-.71-.29l-4.5-4.5 1.42-1.42L11 12.67V4h2v8.67l2.79-2.79 1.42 1.42-4.5 4.5c-.18.18-.43.29-.71.29zM5 18v2h14v-2H5z"
								/>
							</svg>
							<span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-[#222] text-[#F5EFE6] text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50">
								Download Resume
							</span>
						</a>
					</div>
		</nav>
	);
}

export default Navbar;

