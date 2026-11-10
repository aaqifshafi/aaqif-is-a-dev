import { BlogTerminal } from "@/components/blog-terminal";
import { GridColumn } from "@/components/grid-frame";

/** /blog placeholder: the self-typing terminal, centred in the page column. */
export function BlogComingSoon() {
  return (
    <main className="flex w-full grow flex-col">
      <GridColumn className="flex grow items-center justify-center py-24">
        <BlogTerminal />
      </GridColumn>
    </main>
  );
}
