import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { OptImage } from "@/components/ui/opt-image";

const SHOTS = [
  { src: "/projects/applications/pablo-cafe-menu-board.jpg", key: "pabloCafeMenuBoard" as const },
  { src: "/projects/applications/lounge-led-wall-paint.jpg", key: "loungeLedWallPaint" as const },
  { src: "/projects/applications/hospital-acil-led-install.jpg", key: "hospitalAcilLedInstall" as const },
  { src: "/projects/applications/vertical-led-fuji-stand.jpg", key: "verticalLedFujiStand" as const },
  { src: "/projects/applications/facade-frame-install.jpg", key: "facadeFrameInstall" as const },
  { src: "/projects/applications/circular-brand-led-signs.jpg", key: "circularBrandLedSigns" as const },
  { src: "/projects/applications/office-meeting-led-wall.jpg", key: "officeMeetingLedWall" as const },
  { src: "/projects/applications/interactive-totem-kiosk.jpg", key: "interactiveTotemKiosk" as const },
  { src: "/projects/applications/pharmacy-duty-led.jpg", key: "pharmacyDutyLed" as const },
  { src: "/projects/applications/cafe-pillar-signage.jpg", key: "cafePillarSignage" as const },
  { src: "/projects/applications/led-poster-totems.jpg", key: "ledPosterTotems" as const },
  { src: "/projects/applications/indoor-stage-videowall.jpg", key: "indoorStageWall" as const },
  { src: "/projects/applications/curved-led-tulips.jpg", key: "curvedLedDisplay" as const },
  { src: "/projects/applications/mobile-led-truck-isuzu.jpg", key: "mobileLedTruck" as const },
  { src: "/projects/applications/mobile-led-stage-iveco.jpg", key: "mobileLedStage" as const },
  { src: "/projects/install-scaffold.jpg", key: "installScaffold" as const },
] as const;

interface Props {
  locale: Locale;
}

export function CompletedProjectsGallery({ locale }: Props) {
  const dict = getDictionary(locale);
  const labels = dict.projects.shots;

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SHOTS.map((shot) => (
        <li key={shot.src}>
          <figure className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface">
            <OptImage
              src={shot.src}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F2A4F]/90 via-[#0F2A4F]/45 to-transparent p-4 pt-14">
              <p className="font-display text-sm font-semibold text-white">{labels[shot.key]}</p>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
