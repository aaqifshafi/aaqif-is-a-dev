import React from "react";
import { LuGraduationCap } from "react-icons/lu";
import { FaReact } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa6";
import gcetImg from "@/public/gcet.png";
import busappImg from "@/public/busapp.png";
import chatWithPdfImg from "@/public/chatWithPdf.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Graduated - B.Tech CSE",
    location: "GCET, Safapora",
    description:
      "I completed my degree in Computer Science and Engineering. I learned the basics of programming and DSA. I also learned about databases and networking.",
    icon: React.createElement(LuGraduationCap),
    date: "2019 - 2024",
  },
  {
    title: "Graduated Bootcamp",
    location: "Remote",
    description:
      "I graduated after 6 months of studying. I immediately started building projects and diving into Open-Source.",
    icon: React.createElement(FaLaptopCode),
    date: "2022",
  },

  {
    title: "Full-Stack Developer",
    location: "Remote",
    description:
      "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind,MongoDB, Express. I'm open to full-time opportunities.",
    icon: React.createElement(FaReact),
    date: "2023 - present",
  },
] as const;

export const projectsData = [
  {
    title: "Final Year Project",
    description:
      "College management web app with notice board, authentication, student/admin portals, result management, fee payment, and syllabus-based question paper generator and more",
    tags: ["React", "Next.js", "MongoDB", "Tailwind", "Stripe"],
    imageUrl: gcetImg, /// GCET PROJECT IMAGE
    repo: "https://github.com/aaqifshafi/G-CET/",
  },
  {
    title: "Bus Tracking App",
    description:
      "A web app for tracking buses in real-time. It shows the location of bus on a map. It also shows the estimated time of arrival It uses the Google Maps API.",
    tags: ["JavaScript", "Next.js", "Tailwind", "shadcn/ui", "Google Maps API"],
    imageUrl: busappImg,
    repo: "https://github.com/aaqifshafi/Bus-Tracking-App",
  },
  {
    title: "Chat with PDF",
    description:
      "An AI Assistat to make PDFs interactive turns static documents into dynamic conversations, enhancing productivity 10x fold effortlessly.",
    tags: ["Next.js", "Firebase", "Langchain", "Pinecone", "OpenAI"],
    imageUrl: chatWithPdfImg,
    repo: "https://github.com/aaqifshafi/chat-with-pdf",
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "MongoDB",
  "PostgreSQL",
  "Redux",
  "GraphQL",
  "Apollo",
  "Express",
  "Chakra UI",
  "Ridix UI",
  "ShadCn UI",
  "Framer Motion",
] as const;
