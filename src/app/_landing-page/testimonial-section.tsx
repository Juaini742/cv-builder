import React from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import SubHeader from "@/components/custom/SubHeader";

const testimonials = [
  {
    quote:
      "Creating a professional CV has never been easier! The templates provided helped me land my dream job.",
    name: "Andi Pratama",
    designation: "Fresh Graduate - Informatics",
    src: "https://res.cloudinary.com/dixdqxpza/image/upload/v1738228340/img1_m41l0e.png",
  },
  {
    quote:
      "This platform is a game-changer! My CV is now ATS-friendly, and I successfully secured a job at my dream company.",
    name: "Siti Rahma",
    designation: "HR Specialist - TalentHub",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=3600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The professional design and easy-to-use interface made it simple to create my CV. Exporting to PDF is seamless. Highly recommended!",
    name: "Budi Santoso",
    designation: "Junior Developer - TechSavvy",
    src: "https://res.cloudinary.com/dixdqxpza/image/upload/v1738228340/img4_fqah6o.png",
  },
  {
    quote:
      "This platform offers a variety of well-designed templates suited for my industry. My CV now looks professional and stands out.",
    name: "Dian Kusuma",
    designation: "Marketing Manager - BrandBoost",
    src: "https://res.cloudinary.com/dixdqxpza/image/upload/v1710201286/samples/people/smiling-man.jpg",
  },
  {
    quote:
      "As a freelancer, I need different CVs for different projects. This tool makes it so easy to create and customize them!",
    name: "Rizky Hidayat",
    designation: "Freelance Graphic Designer",
    src: "https://res.cloudinary.com/dixdqxpza/image/upload/v1710201283/samples/people/kitchen-bar.jpg",
  },
];

export default function TestimonialSection() {
  return (
    <section id="testimonial" className="container">
      <SubHeader
        title="What Our Users Say"
        description="Discover how our CV Builder has helped professionals land their dream jobs. Real stories from real users who have transformed their resumes effortlessly."
      />
      <AnimatedTestimonials testimonials={testimonials} />
    </section>
  );
}
