import { useRef, useState } from 'react';
import type { KeyboardEvent, TouchEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProjectImage } from '../types/project';

interface ImageCarouselProps {
  images: ProjectImage[];
  // Accessible name of the whole carousel, e.g. "Captures d'écran de Fisheye".
  label: string;
}

// Minimum horizontal distance (px) for a touch gesture to count as a swipe.
const SWIPE_THRESHOLD = 50;

// Floating over the picture: translucent so it stays legible on light and dark screenshots alike.
const ARROW_CLASS =
  'absolute top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/75 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-primary hover:text-primary';

const THUMB_CLASS =
  'aspect-video w-20 overflow-hidden rounded border transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

export function ImageCarousel({ images, label }: ImageCarouselProps) {
  const [index, setIndex] = useState<number>(0);
  const touchStartX = useRef<number | null>(null);
  const count = images.length;
  const hasControls = count > 1;

  // Wraps around: after the last image comes the first one, and the other way round.
  const goTo = (target: number) => setIndex((target + count) % count);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') goTo(index - 1);
    if (event.key === 'ArrowRight') goTo(index + 1);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < SWIPE_THRESHOLD) return;
    goTo(distance > 0 ? index - 1 : index + 1);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={handleKeyDown}
      className="flex flex-col gap-4"
    >
      <div
        className="group relative overflow-hidden rounded border border-border bg-muted"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* All slides sit side by side; moving the track by -index * 100% shows the current one. */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map(({ src, caption }, slideIndex) => (
            <div
              key={src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${slideIndex + 1} sur ${count}`}
              // Off-screen slides must not be reachable by keyboard or screen reader.
              inert={slideIndex !== index}
              className="w-full shrink-0"
            >
              <img
                className="aspect-video w-full object-contain"
                src={src}
                alt={caption}
                loading={slideIndex === 0 ? 'eager' : 'lazy'}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {hasControls && (
          <>
            <button type="button" className={`${ARROW_CLASS} left-3`} onClick={() => goTo(index - 1)} aria-label="Image précédente">
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button type="button" className={`${ARROW_CLASS} right-3`} onClick={() => goTo(index + 1)} aria-label="Image suivante">
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
            {/* Position, kept out of the caption so the live region only announces text. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-3 rounded bg-background/75 px-2 py-1 text-xs font-medium tabular-nums text-muted-foreground backdrop-blur-sm"
            >
              {index + 1} / {count}
            </span>
          </>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        {/* aria-live: screen readers announce each new caption as it fades in. */}
        <p aria-live="polite" className="max-w-2xl flex-1 text-sm text-muted-foreground">
          <span key={index} className="block animate-in fade-in-0 slide-in-from-bottom-1 duration-500">
            {images[index].caption}
          </span>
        </p>

        {hasControls && (
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {images.map(({ src }, thumbIndex) => (
              <button
                key={src}
                type="button"
                onClick={() => goTo(thumbIndex)}
                aria-label={`Afficher l'image ${thumbIndex + 1} sur ${count}`}
                aria-current={thumbIndex === index ? 'true' : undefined}
                className={
                  thumbIndex === index
                    ? `${THUMB_CLASS} border-primary ring-1 ring-primary`
                    : `${THUMB_CLASS} border-border opacity-60 hover:border-primary/60 hover:opacity-100`
                }
              >
                <img src={src} alt="" loading="lazy" draggable={false} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
