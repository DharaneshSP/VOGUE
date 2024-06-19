import HeroNavbar from "@/components/heronavbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <HeroNavbar/> 
      {children}
    </div>
  );
}
