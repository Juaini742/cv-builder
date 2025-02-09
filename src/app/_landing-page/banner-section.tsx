import { BlurFade } from "@/components/ui/blur-fade";
import { UserCheck, FileText, Download } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    title: "Create Account",
    description: "Sign up for free and create your account.",
    icon: <UserCheck size={32} />,
  },
  {
    title: "Create CV",
    description: "Fill out the form and create your CV.",
    icon: <FileText size={32} />,
  },
  {
    title: "Download",
    description: "Download your CV and share it with the world.",
    icon: <Download size={32} />,
  },
];

export default function BannerSection() {
  return (
    <section
      id="step"
      className="bg-gradient-to-br from-blue-900 via-primary to-blue-400 w-ful py-10 lg:py-5 h-full lg:h-[30rem] flex flex-col items-center justify-center text-white px-6"
    >
      <BlurFade delay={0.25} inView>
        <h1 className="text-4xl font-bold text-center mb-6">
          Build Your CV in 3 Simple Steps
        </h1>
      </BlurFade>

      <div className="flex flex-col md:flex-row items-center gap-8 relative">
        {steps.map((item, index) => (
          <BlurFade delay={index * 0.25} key={index} inView>
            <div className="flex flex-col md:flex-row items-center">
              <LoopItem item={item} index={index} />
            </div>
          </BlurFade>
        ))}
      </div>

      <BlurFade delay={0.25} inView>
        <Link href="/sign-in">
          <button className="mt-8 px-6 py-3 bg-white text-primary font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-all">
            Get Started Now
          </button>
        </Link>
      </BlurFade>
    </section>
  );
}

interface LoopItemProps {
  item: {
    title: string;
    description: string;
    icon: React.ReactNode;
  };
  index: number;
}

const LoopItem = ({ item, index }: LoopItemProps) => {
  return (
    <>
      <div className="flex flex-col items-center text-center">
        <div className="bg-white text-primary p-4 rounded-full shadow-lg">
          {item.icon}
        </div>
        <h2 className="mt-4 text-xl font-semibold">{item.title}</h2>
        <p className="text-sm opacity-80">{item.description}</p>
      </div>
      {index !== steps.length - 1 && (
        <div className="hidden md:block w-24 h-1 bg-white opacity-50"></div>
      )}
    </>
  );
};
