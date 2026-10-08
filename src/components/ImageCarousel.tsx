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

const CONTROL_CLASS =
  'inline-flex size-10 items-center justify-center rounded border border-border bg-background transition-colors hover:border-primary hover:text-primary';

export function ImageCarousel({ images, label }: ImageCarouselProps) {
  const [index, setIndex] = useState<number>(0);
  const touchStartX = useRef<number | null>(null);
  const count = images.length;

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
      className="flex flex-col gap-3"
    >
      <div
        className="overflow-hidden rounded border border-border bg-muted"
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
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        {/* aria-live: screen readers announce the new caption when the slide changes. */}
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {images[index].caption}
        </p>

        {count > 1 && (
          <div className="flex shrink-0 items-center gap-3">
            <span className="text-sm tabular-nums text-muted-foreground" aria-hidden="true">
              {index + 1} / {count}
            </span>
            <button type="button" className={CONTROL_CLASS} onClick={() => goTo(index - 1)} aria-label="Image précédente">
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button type="button" className={CONTROL_CLASS} onClick={() => goTo(index + 1)} aria-label="Image suivante">
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
