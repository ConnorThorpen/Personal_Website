"use client";
import Image from "next/image";


import { useEffect, useState, useRef } from "react";


export default function Home() {
  const [showName, setShowName] = useState(false);
  const [showSentence, setShowSentence] = useState(false);
  const [showAboutBar, setShowAboutBar] = useState(false);
  const [showAboutContent, setShowAboutContent] = useState(false);
  const [showProjectsBar, setShowProjectsBar] = useState(false);
  const [showProjectsContent, setShowProjectsContent] = useState(false);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const [showContactBar, setShowContactBar] = useState(false);
  const [showContactContent, setShowContactContent] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    setTimeout(() => setShowName(true), 100);
    setTimeout(() => setShowSentence(true), 500);
  }, []);

  // Intersection Observer for About section
  useEffect(() => {
    const section = aboutSectionRef.current;
    if (!section) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowAboutBar(true);
          setTimeout(() => setShowAboutContent(true), 400);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Intersection Observer for Projects section
  useEffect(() => {
    const section = projectsSectionRef.current;
    if (!section) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowProjectsBar(true);
          setTimeout(() => setShowProjectsContent(true), 400);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    // Always scroll to top on load and on navigation
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    const handleBeforeUnload = () => window.scrollTo(0, 0);
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Intersection Observer for Contact section
  useEffect(() => {
    const section = contactSectionRef.current;
    if (!section) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowContactBar(true);
          setTimeout(() => setShowContactContent(true), 400);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setNotification({ type: "success", message: "Message sent!" });
      form.reset();
    } else {
      setNotification({ type: "error", message: "Failed to send message." });
    }
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <>
      {notification && (
        <div className={`fixed top-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg z-[100] text-lg font-semibold transition-all
          ${notification.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          {notification.message}
        </div>
      )}
      <main className="flex flex-col min-h-screen w-full bg-[#F5EFE6] items-center justify-start pt-64 pb-32">
  {/* Hero Section */}
  <section id="home" className="w-full flex flex-col items-center my-32">
    <h1
      className={`text-[clamp(2.5rem,10vw,8rem)] font-extrabold text-[#44444E] text-center transition-opacity duration-800 ${showName ? "opacity-100" : "opacity-0"}`}
      style={{ letterSpacing: "0.05em" }}
    >
      Connor Thorpen
    </h1>
    <p
      className={`mt-8 text-3xl sm:text-4xl text-[#44444E] text-center font-light transition-opacity duration-800 ${showSentence ? "opacity-100" : "opacity-0"}`}
    >
      Welcome to my professional portfolio website
    </p>
  </section>

  {/* About Me Section */}
  <section id="about" ref={aboutSectionRef} className="relative w-full flex flex-col items-center mt-64 mb-32">
    {/* Sliding bar */}
    <div
      className={`absolute right-0 top-0 h-[500px] bg-[#44444E] rounded-l-3xl transition-transform duration-700 ease-out ${showAboutBar ? "translate-x-0" : "translate-x-full"}`}
      style={{ width: "85vw", maxWidth: "85vw" }}
    />
    <div className="relative flex flex-row items-center justify-between w-full max-w-[1500px]" style={{zIndex:2, height: '500px'}}>
      {/* Left image */}
      <div className={`flex-shrink-0 flex items-center justify-center w-1/4 transition-opacity duration-700 ${showAboutContent ? "opacity-100" : "opacity-0"}`} style={{height: '100%'}}>
        <img
          src="/circle_headshot.png"
          alt="Connor Thorpen Headshot Left"
          className="w-100 h-100 rounded-full object-cover border-4 border-[#F5EFE6]"
        />
      </div>
      {/* Center About Me content */}
      <div className={`flex flex-col items-start w-2/4 px-8 py-12 transition-opacity duration-700 ${showAboutContent ? "opacity-100" : "opacity-0"}`} style={{height: '100%'}}>
        <h2 className="text-5xl font-bold text-[#F5EFE6] mb-8 text-center w-full">About Me</h2>
        <p className="text-2xl text-[#F5EFE6] text-left max-w-2xl w-full">
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br /><br />
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. <br /><br />
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      {/* Right column of text (top-aligned, matches middle body) */}
      <div className={`flex flex-col items-center w-1/4 px-8 py-12 transition-opacity duration-700 ${showAboutContent ? "opacity-100" : "opacity-0"}`} style={{height: '100%', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
        <p className="text-2xl text-[#F5EFE6] text-left max-w-2xl">
          put a widget here or something idk<br />
        </p>
      </div>
    </div>
  </section>
    {/* Projects Section */}
  <section id="projects" ref={projectsSectionRef} className="relative w-full flex flex-col items-center mt-32 mb-32 min-h-[700px]">
        {/* Sliding bar for Projects */}
        <div
          className={`absolute left-0 top-0 h-[700px] bg-[#44444E] rounded-r-3xl transition-transform duration-700 ease-out ${showProjectsBar ? "-translate-x-0" : "-translate-x-full"}`}
          style={{ width: "85vw", maxWidth: "85vw" }}
        />
        <div className="relative flex flex-col w-full max-w-[1200px] min-h-[700px]" style={{zIndex:2}}>
          {/* Projects heading */}
          <div className={`w-full py-12 transition-opacity duration-700 ${showProjectsContent ? "opacity-100" : "opacity-0"}`}> 
            <h2 className="text-5xl font-bold text-[#F5EFE6] mb-8 text-center">Projects</h2>
          </div>
          {/* Projects list */}
          <div className={`flex flex-col gap-16 transition-opacity duration-700 ${showProjectsContent ? "opacity-100" : "opacity-0"}`}>
            {/* Example projects, extensible */}
            {[
              {
                title: "Project One",
                description: "A brief description of the first project goes here. You can add more details as needed.",
                image: "/project1.png"
              },
              {
                title: "Project Two",
                description: "A brief description of the second project goes here. You can add more details as needed.",
                image: "/project2.png"
              }
            ].map((project, idx) => (
              <div key={project.title} className="flex flex-row items-center gap-12 bg-transparent">
                {/* Project text */}
                <div className="flex-1 text-left">
                  <h3 className="text-3xl font-bold text-[#F5EFE6] mb-2">{project.title}</h3>
                  <p className="text-lg text-[#F5EFE6]">{project.description}</p>
                </div>
                {/* Project image preview */}
                <div className="flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title + " preview"}
                    className="w-64 h-40 object-cover rounded-2xl border-4 border-[#F5EFE6] shadow-lg bg-[#222]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  {/* Contact Section */}
  <section id="contact" ref={contactSectionRef} className="relative w-full flex flex-col items-center mt-32 mb-0 min-h-[400px]" style={{paddingBottom: 0}}>
        {/* Sliding bar for Contact */}
        <div
          className={`absolute right-0 top-0 h-full w-[85vw] max-w-[85vw] bg-[#44444E] rounded-l-3xl transition-transform duration-700 ease-out ${showContactBar ? "translate-x-0" : "translate-x-full"}`}
          style={{ zIndex: 1 }}
        />
        <div className={`relative flex flex-col items-center justify-center w-full max-w-[1200px] min-h-[200px] transition-opacity duration-700 ${showContactContent ? "opacity-100" : "opacity-0"}`} style={{zIndex:2}}>
          <h2 className="text-5xl font-bold text-[#F5EFE6] py-12 text-center mt-0 w-full">Contact</h2>
          <div className="flex flex-row w-full max-w-[1200px] gap-12 pb-12 items-start">
            {/* Left: Text area */}
            <div className="flex-1 flex flex-col justify-center items-start pr-4">
              <h3 className="text-3xl font-bold text-[#F5EFE6] mb-4">Let's Connect</h3>
              <p className="text-lg text-[#F5EFE6] max-w-md">
                Feel free to reach out for collaborations, questions, or just to say hello! I'll get back to you as soon as possible.
              </p>
            </div>
            {/* Right: Contact Form */}
            <form className="flex flex-col gap-6 w-full max-w-xl bg-[#44444E] bg-opacity-80 p-8 rounded-2xl border-2 border-[#F5EFE6]" onSubmit={handleSubmit}>
              <div className="flex flex-row gap-6 w-full">
                {/* Left: Name and Email */}
                <div className="flex flex-col gap-6 w-1/2">
                  <label className="flex flex-col text-[#F5EFE6] text-lg font-semibold">
                    Name
                    <input type="text" name="name" required className="mt-2 p-3 rounded-lg border border-[#F5EFE6] bg-[#F5EFE6] bg-opacity-10 text-black focus:outline-none focus:ring-2 focus:ring-[#F5EFE6]" />
                  </label>
                  <label className="flex flex-col text-[#F5EFE6] text-lg font-semibold">
                    Email
                    <input type="email" name="email" required className="mt-2 p-3 rounded-lg border border-[#F5EFE6] bg-[#F5EFE6] bg-opacity-10 text-black focus:outline-none focus:ring-2 focus:ring-[#F5EFE6]" />
                  </label>
                </div>
                {/* Right: Message */}
                <div className="flex flex-col w-1/2">
                  <label className="flex flex-col text-[#F5EFE6] text-lg font-semibold h-full">
                    Message
                    <textarea name="message" required rows={5} className="mt-2 p-3 rounded-lg border border-[#F5EFE6] bg-[#F5EFE6] bg-opacity-10 text-black focus:outline-none focus:ring-2 focus:ring-[#F5EFE6] resize-none h-full min-h-[120px]" />
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 px-8 py-3 rounded-xl bg-[#F5EFE6] text-[#44444E] font-bold text-lg w-full transition-all duration-150 ease-in-out hover:bg-[#e5e0d8] active:scale-95 active:shadow-inner focus:outline-none focus:ring-2 focus:ring-[#44444E] shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
    <footer className="w-full flex items-center justify-center py-8 bg-[#44444E] text-[#F5EFE6] text-lg font-light">
      © {new Date().getFullYear()} Connor Thorpen. All rights reserved.
    </footer>
    </>
  );
}
