import logoLightUrl from "@/assets/logo-light.png";

type PictureProps = {
  name: "marta-hero" | "marta-about" | "marta-desk" | "marta-book" | "marta-online";
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
};

const FALLBACK: Record<PictureProps["name"], string> = {
  "marta-hero": "/fotomarta2.jpg",
  "marta-about": "/fotomarta5.jpg",
  "marta-desk": "/fotomarta1.jpg",
  "marta-book": "/fotomarta4.jpg",
  "marta-online": "/fotomarta3.jpg",
};

export function Picture({
  name,
  alt,
  className,
  priority = false,
  width = 900,
  height = 1100,
}: PictureProps) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`/images/${name}-sm.webp 800w, /images/${name}.webp 1400w`}
        sizes="(max-width: 720px) 90vw, 42vw"
      />
      <img
        src={FALLBACK[name]}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        decoding={priority ? "sync" : "async"}
      />
    </picture>
  );
}

export function Logo({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  if (variant === "light") {
    return (
      <img
        className={`brand-logo ${className}`}
        src={logoLightUrl}
        alt="Desencaixe — Clínica Online. Marta Lima Psicóloga"
        width="520"
        height="90"
        decoding="async"
      />
    );
  }

  return (
    <picture>
      <source type="image/webp" srcSet="/images/logo.webp" />
      <img
        className={`brand-logo ${className}`}
        src="/images/logo.png"
        alt="Desencaixe — Clínica Online. Marta Lima Psicóloga"
        width="520"
        height="90"
        decoding="async"
      />
    </picture>
  );
}
