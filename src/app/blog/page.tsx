import type { Metadata } from "next";
import { BlogComingSoon } from "@/components/blog-coming-soon";
import { SiteFooter } from "@/components/site-footer";
import { TopNav } from "@/components/top-nav";

export const metadata: Metadata = {
  title: "Blog — Aaqif",
  description: "Writing on software engineering, product development, and full-stack systems.",
};

export default function BlogPage() {
  return (
    <>
      <TopNav />
      <BlogComingSoon />
      <SiteFooter />
    </>
  );
}
