"use client";
import Image from "next/image";
import testimonials from '../testimonials.json';


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
  const [current, setCurrent] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 10000); // change every 8 seconds
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <>
      {notification && (
        <div className={`fixed top-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg z-[100] text-lg font-semibold transition-all
          ${notification.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          {notification.message}
        </div>
      )}
  <main className="flex flex-col min-h-screen w-full bg-[#F5EFE6] items-center justify-start pt-0 pb-32 overflow-x-hidden">
  {/* Hero Section */}
  <section
  id="home"
  className="w-full flex flex-col items-center my-16 py-64 relative min-h-[500px] justify-center"
  style={{
    backgroundImage: "url('/Connor_Tutor_Solo.jpeg')", // put your image in /public
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed", // makes the image stay put
  }}
>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black opacity-60 pointer-events-none z-0" />
  <div className="relative z-10 flex flex-col items-center w-full">
    <h1
      className={`text-[clamp(2.5rem,10vw,8rem)] font-extrabold text-[#F5EFE6] text-center transition-opacity duration-800 ${showName ? "opacity-100" : "opacity-0"}`}
      style={{ letterSpacing: "0.05em" }}
    >
      Connor Thorpen
    </h1>
    <h2
      className={`mt-8 text-3xl sm:text-4xl text-[#F5EFE6] text-center font-light transition-opacity duration-800 ${showSentence ? "opacity-100" : "opacity-0"}`}
    >
      Full-Stack developer focused on creating efficient, secure, and user-friendly applications.
    </h2>
  </div>
</section>

  {/* About Me Section */}
  <section id="about" ref={aboutSectionRef} className="relative w-full flex flex-col items-center mt-48 mb-32">
    {/* Sliding bar */}
    <div
      className={`absolute right-0 top-0 h-[700px] bg-[#44444E] rounded-l-3xl transition-transform duration-700 ease-out ${showAboutBar ? "translate-x-0" : "translate-x-full"}`}
      style={{ width: "85vw", maxWidth: "85vw" }}
    />
    <div className="relative flex flex-row items-center justify-between w-full max-w-[1500px]" style={{zIndex:2, height: '700px'}}>
      {/* Left image */}
      <div className={`flex-shrink-0 flex mb-32 items-center justify-center w-1/4 transition-opacity duration-700 ${showAboutContent ? "opacity-100" : "opacity-0"}`} style={{height: '100%'}}>
        <img
          src="/circle_headshot.png"
          alt="Connor Thorpen Headshot Left"
          className="w-100 h-100 rounded-full object-cover border-4 border-[#F5EFE6]"
        />
      </div>
      {/* Center About Me content */}
      <div className={`flex flex-col items-start w-2/4 px-8 py-12 transition-opacity duration-700 ${showAboutContent ? "opacity-100" : "opacity-0"}`} style={{height: '100%'}}>
        <h2 className="text-5xl font-bold text-[#F5EFE6] mb-8 text-center w-full">About Me</h2>
        <p className="text-xl text-[#F5EFE6] text-left w-full">
          Hi, I'm Connor. I'm a 22-year-old full-stack developer from Casper, Wyoming. I graduated <i>summa cum laude</i> from the University of Wyoming in May of 2025 with a B.S. in Computer Science and Mathematics, along with a minor in Statistics and a certificate in Cybersecurity.<br /><br />

          Professionally, I have hands-on experience building responsive applications with Angular, React, SQL, Docker, and a mix of other technologies. Currently, I am employed as a Full-Stack Web Developer at <a href="https://insurxcel.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#e5e0d8] transition-colors">InsurXcel</a> where I help design, develop, and maintain business applications. My background also includes tutoring advanced mathematics during my undergraduate years at The University of Wyoming.<br /><br />

          Looking ahead, I am eager to continue developing my expertise while exploring opportunities across different areas of technology. My interests include web development, software engineering, data-driven applications, and innovative tools that advance practical technology solutions.
        </p>
      </div>
      {/* Right column of text (top-aligned, matches middle body) */}
      <div className={`flex flex-col items-center w-1/4 px-8 py-12 transition-opacity duration-700 ${showAboutContent ? "opacity-100" : "opacity-0"}`} style={{height: '100%', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
        {/* Rotating Testimonials Widget */}
        {testimonials.length > 0 && (
          <div className="w-[900px] flex flex-col items-start bg-[#393943] bg-opacity-80 rounded-2xl p-6 shadow-lg border border-[#F5EFE6] min-h-[208px] max-w-lg">
            <div className="flex flex-row items-center gap-2 mb-2">
              <span className="text-lg text-[#F5EFE6] font-semibold">{testimonials[current].class}</span>
              <span className="ml-2 text-yellow-400 text-xl" aria-label={`Rated ${testimonials[current].stars} out of 5`}>
                {Array.from({ length: testimonials[current].stars }).map((_, i) => '★').join('')}
                {Array.from({ length: 5 - testimonials[current].stars }).map((_, i) => '☆').join('')}
              </span>
            </div>
            <p className="text-[#F5EFE6] text-lg italic mb-2">"{testimonials[current].message}"</p>
          </div>
        )}
        <span className="text-[#F5EFE6] text-sm w-[900px] max-w-lg text-center">Real testimonials from students after a tutoring session with Connor</span>
      </div>
    </div>
  </section>
    {/* Projects Section */}
  <section id="projects" ref={projectsSectionRef} className="relative w-full flex flex-col items-center mt-32 mb-32 min-h-[700px]">
        {/* Sliding bar for Projects */}
        <div
          className={`absolute left-0 top-0 bg-[#44444E] rounded-r-3xl transition-transform duration-700 ease-out ${showProjectsBar ? "-translate-x-0" : "-translate-x-full"}`}
          style={{ width: "85vw", maxWidth: "85vw", height: '100%' }}
        />
        <div className="relative flex mb-32 flex-col w-full max-w-[1200px]" style={{zIndex:2}}>
          {/* Projects heading */}
          <div className={`w-full py-12 transition-opacity duration-700 ${showProjectsContent ? "opacity-100" : "opacity-0"}`}> 
            <h2 className="text-5xl font-bold text-[#F5EFE6] mb-8 text-center">Projects</h2>
          </div>
          {/* Projects list */}
          <div className={`flex flex-col gap-16 transition-opacity duration-700 ${showProjectsContent ? "opacity-100" : "opacity-0"}`}>
            {/* Example projects, extensible */}
            {[
              {
                title: "PHaST Photo",
                description: "PHaST Photo is a simple, interactive, and intuitive application for organizing large collections of photos. Created by myself and three others for our senior design project, PHaST Photo utilizes a Node.js backend with a React frontend and integrates with MongoDB to provide users with an efficient way to manage and categorize their images. Check out our video on the right or visit the GitHub repository for more details.",
                video: "/PHaST_Video_small.mp4",
                image: "/circle_headshot.png" // Placeholder if no video
              },
            ].map((project, idx) => (
              <div key={project.title} className="flex flex-row items-start gap-12 bg-transparent">
                {/* Project text */}
                <div className="flex-1 text-left">
                  <div className="flex flex-row items-center gap-4 mb-2">
                    <h3 className="text-3xl font-bold text-[#F5EFE6]">{project.title}</h3>
                    {idx === 0 && (
                      <>
                        <a href="https://github.com/SeniorDesign2023/PHaSTphoto" target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-80 transition-opacity">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z" fill="#F5EFE6"/>
                          </svg>
                        </a>
                        <a href="https://www.youtube.com/watch?v=gaPr9WcSKXw" target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-80 transition-opacity">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.8 8.001a2.752 2.752 0 0 0-1.936-1.947C18.012 5.5 12 5.5 12 5.5s-6.012 0-7.864.554A2.752 2.752 0 0 0 2.2 8.001C1.646 9.854 1.646 12 1.646 12s0 2.146.554 3.999a2.752 2.752 0 0 0 1.936 1.947C5.988 18.5 12 18.5 12 18.5s6.012 0 7.864-.554a2.752 2.752 0 0 0 1.936-1.947C22.354 14.146 22.354 12 22.354 12s0-2.146-.554-3.999ZM10.5 15.5v-7l6 3.5-6 3.5Z" fill="#F5EFE6"/>
                          </svg>
                        </a>
                      </>
                    )}
                  </div>
                  <p className="text-2xl text-[#F5EFE6]">{project.description}</p>
                </div>
                {/* Project media preview */}
                <div className="flex-shrink-0">
                  {project.video ? (
                    <div className="relative group w-[480px] h-[320px]">
                      <video
                        src={project.video}
                        className="w-[480px] h-[320px] object-cover rounded-2xl border-4 border-[#F5EFE6] shadow-lg bg-[#222]"
                        controls
                        loop
                        muted
                        playsInline
                        poster="/project1.png"
                      />
                      {/* Overlay image */}
                      <img
                        src="/PHaST_thumbnail.png"
                        alt="Project thumbnail"
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl border-4 border-[#F5EFE6] shadow-lg bg-[#222] transition-opacity duration-300 pointer-events-none group-hover:opacity-0"
                        style={{ zIndex: 2 }}
                      />
                    </div>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title + " preview"}
                      className="w-[480px] h-[320px] object-cover rounded-2xl border-4 border-[#F5EFE6] shadow-lg bg-[#222]"
                    />
                  )}
                </div>
              </div>
            ))}
            {/* More to come note inside bar */}
            <div className="w-full flex justify-center items-center mt-4 mb-2">
              <span className="text-xl text-[#F5EFE6] opacity-70 italic">more to come...</span>
            </div>
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
              <p className="text-2xl text-[#F5EFE6] max-w-md">
                Feel free to reach out for collaborations, questions, or just to say hello! I'll get back to you as soon as possible.
              </p>
            </div>
            {/* Right: Contact Form */}
            <form className="flex flex-col gap-6 w-full max-w-xl bg-[#393943] bg-opacity-80 p-8 rounded-2xl border-2 border-[#F5EFE6]" onSubmit={handleSubmit}>
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
