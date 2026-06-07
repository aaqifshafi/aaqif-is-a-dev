import { PortfolioShell } from "@/components/portfolio-shell";
import { SiteFooter } from "@/components/site-footer";
import { TopNav } from "@/components/top-nav";

export default function HomePage() {
  return (
    <>
      <TopNav />
      <PortfolioShell />
      <SiteFooter />
    </>
  );
}
