"use client";

import Image from "next/image";
import { useState } from "react";

export type AvatarImageProps = {
  photo: string;
  name: string;
};

export function AvatarImage({ photo, name }: AvatarImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-border bg-surface">
        <span className="font-pixel text-xl text-on-surface-variant">AQ</span>
      </div>
    );
  }

  return (
    <Image
      src={photo}
      alt={`${name}'s avatar`}
      width={56}
      height={56}
      className="size-14 shrink-0 rounded-xl border border-border object-cover"
      onError={() => setFailed(true)}
    />
  );
}
