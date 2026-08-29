import { IconClock, IconMapPin } from "@tabler/icons-react";
import { AvailabilityBadge } from "@/components/availability-badge";
import { AvatarImage } from "@/components/avatar-image";
import { CopyEmail } from "@/components/copy-email";
import { GridColumn } from "@/components/grid-frame";
import { LiveClock } from "@/components/live-clock";
import { Reveal } from "@/components/reveal";
import { SocialChip } from "@/components/social-chip";
import { TextScramble } from "@/components/ui/text-scramble";
import { bootDelay } from "@/lib/motion";
import { profile, socialLinks } from "@/lib/portfolio-data";

/** Intro block: monogram + name, live status line, bio, and contact row. */
export function ProfileHeader() {
  return (
    <header>
      <GridColumn className="flex flex-col gap-6 py-14 sm:py-20">
        <Reveal
          immediate
          delay={bootDelay.profile}
          className="flex items-center gap-4"
        >
          <AvatarImage photo={profile.photo} name={profile.name} />
          <div className="flex flex-col gap-0.5">
            <TextScramble
              as="h1"
              duration={0.9}
              speed={0.03}
              className="font-pixel text-2xl text-primary sm:text-3xl"
            >
              {profile.name}
            </TextScramble>
            <span className="font-technical text-xs text-on-surface-variant">
              {"// "}
              {profile.title}
            </span>
          </div>
        </Reveal>

        <Reveal
          immediate
          delay={bootDelay.manifest}
          className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-technical text-[11px]"
        >
          <AvailabilityBadge
            available={profile.available}
            className="text-[11px]"
          />
          <span className="text-outline">·</span>
          <span className="inline-flex items-center gap-1.5 text-on-surface-variant">
            <IconMapPin className="size-3 shrink-0" aria-hidden />
            {profile.location}
          </span>
          <span className="text-outline">·</span>
          <span className="inline-flex items-center gap-1.5 text-on-surface-variant">
            <IconClock className="size-3 shrink-0" aria-hidden />
            <LiveClock timeZone={profile.timezone} />
          </span>
        </Reveal>

        <Reveal immediate delay={bootDelay.heroTagline}>
          <p className="max-w-[60ch] text-pretty text-base leading-relaxed text-on-surface-variant sm:text-lg">
            {profile.tagline}
          </p>
        </Reveal>

        <Reveal
          immediate
          delay={bootDelay.social}
          className="flex flex-wrap items-center gap-2"
        >
          {socialLinks.map((link) => (
            <SocialChip key={link.label} label={link.label} href={link.href} />
          ))}
          <CopyEmail email={profile.email} />
        </Reveal>
      </GridColumn>
    </header>
  );
}
