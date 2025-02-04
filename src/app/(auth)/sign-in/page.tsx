import { Card } from "@/components/ui/card";
import LoginForm from "./Form";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <Card className="container px-5 py-10 w-96">
        <div className="mb-4 w-full flex justify-center">
          {/* <Image src={imageUrl} alt="Logo" className="w-32 md:w-52" /> */}
        </div>
        <LoginForm />
        {/* <p className="py-2 text-center text-muted-foreground">atau</p>
        <LoginGoogleButton /> */}
      </Card>
    </div>
  );
}
