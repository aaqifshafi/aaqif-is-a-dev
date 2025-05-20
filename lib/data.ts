import React from "react";
import { LuGraduationCap } from "react-icons/lu";
import { FaReact } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa6";
import { GiGreenhouse } from "react-icons/gi";
import { FaServer } from "react-icons/fa";
import gcetImg from "@/public/gcet.png";
import busappImg from "@/public/busapp.png";
import chatWithPdfImg from "@/public/chatWithPdf.png";
import { FaCodeMerge } from "react-icons/fa6";

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
    title: "Full-Stack Engineer",
    location: "Remote",
    description:
      "I worked as freelance full-stack engineer after during and after my degree. My stack included React, Next.js, TypeScript, Tailwind, MongoDB, Express, and more.",
    icon: React.createElement(FaReact),
    date: "2023 - 2024",
  },
  {
    title: "Payoll Payments LLC",
    location: "Dubai, UAE",
    description:
      "Contributed in developing a web application for managing billers using React, TypeScript, ANT Design, PostgreSQL, and Express.js, streamlining global billing processes and integrating seamlessly with Payoll's API services.",
    icon: React.createElement(FaServer),
    date: "2024",
  },
  {
    title: "Ared",
    location: "Dubai, UAE",
    description:
      "At Payoll, I contributed to the development of Ared, an advanced API service focused on carbon calculators. This project involved creating innovative tools that enable users to measure and manage their carbon footprints effectively, supporting sustainability goals.",
    icon: React.createElement(GiGreenhouse),
    date: "2024",
  },
  {
    title: " Nudge Lab",
    location: "Bangalore, India",
    description:
      "I'm currently working as a Frontend Engineer at Nudge Lab, where we're building Gistr, an AI-powered tool that helps users learn and retain knowledge better. I craft user-facing features with Next.js, TypeScript, and Tailwind CSS, and work closely with design and backend teams to deliver fast, intuitive, and seamless user experiences.",
    icon: React.createElement(FaCodeMerge),
    date: "2024 - present",
  },
] as const;
export const projectsData = [
  {
    title: "Final Year Project",
    description:
      "College management web app with notice board, auth, student/admin portals, result management, fee payment, and syllabus-based question paper generation",
    tags: ["React", "Next.js", "MongoDB", "Express", "Stripe", "Tailwind"],
    imageUrl: gcetImg, /// GCET PROJECT IMAGE
    repo: "https://gcet.aaqif.codes",
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
    tags: [
      "Next.js",
      "Firebase",
      "Langchain",
      "Pinecone",
      "OpenAI",
      "TypeScript",
    ],
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
