import OpengraphImage, { alt, contentType, size } from "./opengraph-image";

export { alt, contentType, size };

/** Reuse the Open Graph card for the Twitter/X summary_large_image. */
export default function TwitterImage() {
  return OpengraphImage();
}
