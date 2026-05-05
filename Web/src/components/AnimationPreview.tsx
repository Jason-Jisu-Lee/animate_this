import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Pattern } from "@/lib/patterns";

interface AnimationPreviewProps {
  pattern: Pattern;
  size?: "small" | "large";
  autoPlay?: boolean;
}

export function AnimationPreview({
  pattern,
  size = "small",
  autoPlay = true,
}: AnimationPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);
  const previewLeadIn = 0.5;
  const replayResetMs = 60;
  const isSmall = size === "small";
  const previewDurationFloor = isSmall ? 0.7 : 0.95;
  const shouldLoop = autoPlay && isSmall;
  const loopCycleMs = Math.max(
    3200,
    Math.round((previewLeadIn + previewDurationFloor + 1.5) * 1000),
  );
  const previewShellClass = isSmall
    ? "w-full max-w-[14.5rem] aspect-[10/18]"
    : "w-full max-w-[28rem] aspect-[10/18]";
  const deviceFrameClass = "absolute inset-0";
  const deviceViewportClass = isSmall
    ? "absolute inset-[3px] top-[10px] rounded-[1.35rem]"
    : "absolute inset-[5px] top-[14px] rounded-[1.9rem]";
  const statusBarClass = isSmall
    ? "absolute inset-x-3 top-2.5 z-10 flex items-center justify-between text-[8px] font-medium text-white/65"
    : "absolute inset-x-4 top-3 z-10 flex items-center justify-between text-[10px] font-medium text-white/65";
  const scaffoldContentClass = isSmall
    ? "absolute inset-x-3 top-9 bottom-14"
    : "absolute inset-x-4 top-12 bottom-16";
  const previewMotionClass = isSmall
    ? "relative h-full w-full flex items-center justify-center overflow-hidden px-3 pt-10 pb-14"
    : "relative h-full w-full flex items-center justify-center overflow-hidden px-4 pt-12 pb-16";
  const previewCardPaddingClass = isSmall ? "p-3.5" : "p-5";
  const bottomTabClass = isSmall
    ? "absolute inset-x-3 bottom-3 h-9"
    : "absolute inset-x-4 bottom-4 h-11";
  const genericPreviewClass = "h-full w-full";
  const compactPanelClass = isSmall ? "w-[94%]" : "w-[86%]";
  const stackClass = isSmall ? "w-[94%]" : "w-[88%]";
  const sceneClass = "h-full w-full";
  const progressClass = isSmall ? "w-[94%]" : "w-[88%]";
  const drawerWidthClass = isSmall ? "w-[44%]" : "w-[46%]";
  const toastPositionClass = isSmall
    ? "top-12 left-3 right-3"
    : "top-16 left-4 right-4";
  const compactListClass = isSmall ? "w-[94%]" : "w-[88%]";
  const swipeClass = isSmall ? "w-[94%]" : "w-[86%]";
  const cardExpansionInitialWidth = isSmall ? 88 : 132;
  const cardExpansionExpandedWidth = isSmall ? 152 : 320;
  const previewAccentSolidClass = "bg-[#E7C2A8]";
  const previewAccentStrongClass = "bg-[#E7C2A8]/55";
  const previewAccentMediumClass = "bg-[#E7C2A8]/24";
  const previewAccentSoftClass = "bg-[#E7C2A8]/16";
  const previewAccentMutedClass = "bg-[#E7C2A8]/12";
  const previewAccentBorderClass = "border-[#E7C2A8]/24";
  const previewAccentBorderSoftClass = "border-[#E7C2A8]/18";
  const previewMutedSurfaceClass = "border border-white/10 bg-white/[0.06]";
  const previewMutedLineClass = "bg-white/14";
  const previewMutedTitleClass = "bg-white/38";
  const previewHeroPrimaryClass =
    "border-[#E7C2A8]/24 bg-[linear-gradient(135deg,rgba(231,194,168,0.24),rgba(231,194,168,0.08))]";
  const previewHeroMutedClass =
    "border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.05))]";

  useEffect(() => {
    if (!autoPlay) {
      setIsPlaying(false);
      return;
    }

    let playTimer: ReturnType<typeof setTimeout> | undefined;
    let loopTimer: ReturnType<typeof setTimeout> | undefined;
    let disposed = false;

    const startCycle = () => {
      setIsPlaying(false);

      playTimer = setTimeout(() => {
        if (disposed) {
          return;
        }

        setIsPlaying(true);
        setKey((k) => k + 1);

        if (shouldLoop) {
          loopTimer = setTimeout(startCycle, loopCycleMs);
        }
      }, replayResetMs);
    };

    startCycle();

    return () => {
      disposed = true;
      if (playTimer) {
        clearTimeout(playTimer);
      }
      if (loopTimer) {
        clearTimeout(loopTimer);
      }
    };
  }, [autoPlay, loopCycleMs, pattern.id, shouldLoop, size]);

  const replay = () => {
    setIsPlaying(false);
    setTimeout(() => {
      setIsPlaying(true);
      setKey((k) => k + 1);
    }, replayResetMs);
  };

  const getSpringConfig = (extraDelay = 0) => {
    if (pattern.timing.type === "spring" && pattern.timing.spring) {
      const { stiffness, damping, mass } = pattern.timing.spring;
      return {
        type: "spring" as const,
        stiffness: Math.max(
          120,
          Math.round(stiffness * (isSmall ? 0.42 : 0.34)),
        ),
        damping: Math.max(18, Math.round(damping * 0.95)),
        mass: Number((mass * 1.2).toFixed(2)),
        delay: previewLeadIn + extraDelay,
      };
    }
    return {
      type: "tween" as const,
      duration: previewDurationFloor,
      ease: "easeInOut" as const,
      delay: previewLeadIn + extraDelay,
    };
  };

  const getTweenConfig = (
    extraDelay = 0,
    durationFloor = previewDurationFloor,
  ) => {
    const normalizeEase = (
      ease: string,
    ): "easeIn" | "easeOut" | "easeInOut" | "linear" => {
      switch (ease) {
        case "easeIn":
        case "easeOut":
        case "easeInOut":
        case "linear":
          return ease;
        default:
          return "easeOut";
      }
    };

    if (pattern.timing.type === "tween" && pattern.timing.tween) {
      return {
        duration: Math.max(pattern.timing.tween.duration * 1.8, durationFloor),
        ease: normalizeEase(pattern.timing.tween.ease),
        delay: previewLeadIn + extraDelay,
      };
    }
    return {
      duration: durationFloor,
      ease: "easeOut" as const,
      delay: previewLeadIn + extraDelay,
    };
  };

  const hasScale = pattern.primitives.includes("scale");
  const hasTranslate = pattern.primitives.includes("translate");
  const hasOpacity = pattern.primitives.includes("opacity");
  const hasLayout = pattern.primitives.includes("layout");

  const renderGenericPreview = () => (
    <motion.div
      className={`relative ${genericPreviewClass}`}
      initial={{
        opacity: hasOpacity ? 0.35 : 1,
        y: hasTranslate ? 18 : 0,
        scale: hasScale ? 0.9 : 1,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={
        pattern.timing.type === "spring" ? getSpringConfig() : getTweenConfig()
      }
    >
      <div className="absolute inset-0 overflow-hidden rounded-[1.35rem] border border-primary/18 bg-[linear-gradient(180deg,#151922_0%,#0d1117_100%)] shadow-xl">
        <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,_rgba(173,198,255,0.18),_transparent_74%)]" />
        <motion.div
          className={`relative flex h-full flex-col ${previewCardPaddingClass}`}
          initial={{
            opacity: hasOpacity ? 0.55 : 1,
            y: hasTranslate ? 22 : 0,
            scale: hasScale ? 0.96 : 1,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={
            pattern.timing.type === "spring"
              ? getSpringConfig()
              : getTweenConfig()
          }
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-[1rem] border border-primary/20 bg-primary/12" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-28 rounded-full bg-primary/45" />
              <div className="h-2 w-36 rounded-full bg-primary/18" />
            </div>
          </div>

          <div className="mt-4 rounded-[1.15rem] border border-primary/20 bg-[linear-gradient(135deg,rgba(173,198,255,0.18),rgba(173,198,255,0.05))] px-4 py-5">
            <div className="h-3 w-2/3 rounded-full bg-primary/55" />
            <div className="mt-3 h-2 w-full rounded-full bg-primary/20" />
            <div className="mt-2 h-2 w-4/5 rounded-full bg-primary/16" />
          </div>

          <motion.div
            className="mt-4 space-y-3"
            initial={{
              opacity: hasOpacity ? 0.45 : 1,
              y: hasLayout ? 20 : 0,
            }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              pattern.timing.type === "spring"
                ? getSpringConfig(0.08)
                : getTweenConfig(0.08)
            }
          >
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="rounded-[1rem] border border-white/6 bg-white/[0.035] px-3 py-3"
              >
                <div className="h-2.5 w-2/5 rounded-full bg-white/16 mb-2" />
                <div className="h-2 w-full rounded-full bg-white/8 mb-1.5" />
                <div className="h-2 w-3/4 rounded-full bg-white/8" />
              </div>
            ))}
          </motion.div>

          <div className="mt-auto grid grid-cols-2 gap-2.5 pt-3">
            <div className="h-11 rounded-[0.95rem] border border-primary/14 bg-primary/10" />
            <div className="h-11 rounded-[0.95rem] border border-white/6 bg-white/[0.04]" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

    const renderScreenSurface = ({
      accent = "primary",
      variant = "orders",
      showStepper = false,
      activeStep = 0,
    }: {
      accent?: "primary" | "muted";
      variant?:
        | "orders"
        | "order-detail"
        | "discover"
        | "saved"
        | "wizard-contact"
        | "wizard-payment";
      showStepper?: boolean;
      activeStep?: number;
    }) => {
      const heroClass =
        accent === "primary"
          ? "border-[#E7C2A8]/34 bg-[linear-gradient(135deg,rgba(231,194,168,0.32),rgba(201,126,84,0.12))]"
          : "border-[#9DB4D1]/18 bg-[linear-gradient(135deg,rgba(157,180,209,0.16),rgba(157,180,209,0.05))]";
      const previewMutedSurfaceClass =
        accent === "primary"
          ? "border border-[#E7C2A8]/16 bg-[#E7C2A8]/[0.11]"
          : "border border-[#9DB4D1]/12 bg-[#9DB4D1]/[0.055]";
      const titleClass =
        accent === "primary" ? "bg-[#F0D2BA]/68" : "bg-[#D5E0EF]/42";
      const lineClass =
        accent === "primary" ? "bg-[#E7C2A8]/32" : "bg-[#B6C5D9]/20";
      const chipClass =
        accent === "primary" ? "bg-[#E7C2A8]/22" : "bg-[#9DB4D1]/14";
      const statClass =
        accent === "primary" ? "bg-[#E7C2A8]/18" : "bg-[#9DB4D1]/10";
      const headingTextClass =
        accent === "primary" ? "text-[#FFF4EC]" : "text-[#E6EEF8]/90";
      const metaTextClass =
        accent === "primary" ? "text-[#E9C7AE]/82" : "text-[#C1D1E4]/60";
      const pillClass =
        accent === "primary"
          ? "border border-[#E7C2A8]/28 bg-[#E7C2A8]/18 text-[#FFF1E7]"
          : "border border-[#9DB4D1]/16 bg-[#9DB4D1]/10 text-[#DCE7F4]/76";
      const iconClass =
        accent === "primary" ? "bg-[#E7C2A8]/20" : "bg-[#9DB4D1]/14";
      const surfaceBgClass =
        accent === "primary"
          ? "bg-[linear-gradient(180deg,#241915_0%,#171015_100%)]"
          : "bg-[linear-gradient(180deg,#0D1825_0%,#09111A_100%)]";
      const surfaceGlowClass =
        accent === "primary"
          ? "bg-[radial-gradient(circle_at_top,_rgba(231,194,168,0.24),_transparent_72%)]"
          : "bg-[radial-gradient(circle_at_top,_rgba(157,180,209,0.18),_transparent_74%)]";
      const frameBorderClass =
        accent === "primary" ? "border-[#E7C2A8]/32" : "border-[#A7BCD6]/18";

      const renderOrderRows = (trailingWidths: string[]) => (
        <div className="mt-3 space-y-2.5">
          {trailingWidths.map((width, index) => (
            <div
              key={`${variant}-order-${index}`}
              className={`rounded-[1rem] p-2.5 ${previewMutedSurfaceClass}`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`h-8 w-8 rounded-full ${iconClass}`} />
                <div className="flex-1 space-y-1.5">
                  <div
                    className={`h-2.5 rounded-full ${titleClass} ${
                      index === 0 ? "w-16" : index === 1 ? "w-20" : "w-14"
                    }`}
                  />
                  <div
                    className={`h-2 rounded-full ${lineClass} ${
                      index === 0 ? "w-24" : index === 1 ? "w-20" : "w-28"
                    }`}
                  />
                </div>
                <div className={`h-6 rounded-full ${chipClass} ${width}`} />
              </div>
            </div>
          ))}
        </div>
      );

      const renderSurfaceContent = () => {
        switch (variant) {
          case "orders":
            return (
              <>
                <div className={`mt-4 rounded-[1.15rem] border ${heroClass} p-3.5`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${metaTextClass}`}>
                        Orders
                      </p>
                      <p className={`mt-1 text-[12px] font-semibold ${headingTextClass}`}>
                        Recent activity
                      </p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] ${pillClass}`}>
                      Today
                    </span>
                  </div>
                  {renderOrderRows(["w-12", "w-10", "w-14"])}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  <div className={`rounded-[0.95rem] p-3 ${previewMutedSurfaceClass}`}>
                    <p className={`text-[8px] font-semibold uppercase tracking-[0.16em] ${metaTextClass}`}>
                      Queued
                    </p>
                    <div className={`mt-2 h-3 w-10 rounded-full ${titleClass}`} />
                  </div>
                  <div className={`rounded-[0.95rem] p-3 ${previewMutedSurfaceClass}`}>
                    <p className={`text-[8px] font-semibold uppercase tracking-[0.16em] ${metaTextClass}`}>
                      Delivered
                    </p>
                    <div className={`mt-2 h-3 w-12 rounded-full ${titleClass}`} />
                  </div>
                </div>
              </>
            );

          case "order-detail":
            return (
              <>
                <div className={`mt-4 overflow-hidden rounded-[1.15rem] border ${heroClass}`}>
                  <div className="h-20 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.03))]" />
                  <div className="space-y-3 p-3.5">
                    <div>
                      <p className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${metaTextClass}`}>
                        Order #1842
                      </p>
                      <p className={`mt-1 text-[12px] font-semibold ${headingTextClass}`}>
                        Delivery details
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className={`rounded-[0.95rem] p-2.5 ${previewMutedSurfaceClass}`}>
                        <div className={`h-2.5 w-12 rounded-full ${titleClass}`} />
                        <div className={`mt-2 h-2 w-16 rounded-full ${lineClass}`} />
                      </div>
                      <div className={`rounded-[0.95rem] p-2.5 ${previewMutedSurfaceClass}`}>
                        <div className={`h-2.5 w-10 rounded-full ${titleClass}`} />
                        <div className={`mt-2 h-2 w-14 rounded-full ${lineClass}`} />
                      </div>
                    </div>
                    <div className={`rounded-[0.95rem] p-2.5 ${previewMutedSurfaceClass}`}>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className={`h-2.5 w-16 rounded-full ${titleClass}`} />
                          <div className={`mt-2 h-2 w-20 rounded-full ${lineClass}`} />
                        </div>
                        <div className={`h-8 w-10 rounded-[0.8rem] ${chipClass}`} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5">
                  {[
                    ["w-24", "w-full"],
                    ["w-20", "w-5/6"],
                  ].map(([headingWidth, lineWidth], index) => (
                    <div
                      key={`${variant}-detail-${index}`}
                      className={`rounded-[1rem] p-3 ${previewMutedSurfaceClass}`}
                    >
                      <div className={`h-2.5 rounded-full ${titleClass} ${headingWidth}`} />
                      <div className={`mt-2 h-2 rounded-full ${lineClass} ${lineWidth}`} />
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  <div className={`rounded-[0.95rem] px-3 py-3 ${previewMutedSurfaceClass}`}>
                    <div className={`h-2.5 w-14 rounded-full ${titleClass}`} />
                    <div className={`mt-2 h-2 w-12 rounded-full ${lineClass}`} />
                  </div>
                  <div className={`rounded-[0.95rem] px-3 py-3 ${previewMutedSurfaceClass}`}>
                    <div className={`h-2.5 w-16 rounded-full ${titleClass}`} />
                    <div className={`mt-2 h-2 w-10 rounded-full ${lineClass}`} />
                  </div>
                </div>
              </>
            );

          case "discover":
            return (
              <>
                <div className={`mt-4 rounded-[1rem] px-3 py-3 ${previewMutedSurfaceClass}`}>
                  <div className="flex items-center gap-2.5">
                    <div className={`h-8 w-8 rounded-full ${iconClass}`} />
                    <div className="flex-1">
                      <div className={`h-2.5 w-20 rounded-full ${titleClass}`} />
                      <div className={`mt-2 h-2 w-24 rounded-full ${lineClass}`} />
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  {[
                    "w-12",
                    "w-14",
                    "w-10",
                  ].map((width, index) => (
                    <div
                      key={`${variant}-chip-${index}`}
                      className={`h-6 rounded-full ${chipClass} ${width}`}
                    />
                  ))}
                </div>

                <div className={`mt-4 rounded-[1.15rem] border ${heroClass} p-3.5`}>
                  <p className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${metaTextClass}`}>
                    Discover
                  </p>
                  <p className={`mt-1 text-[12px] font-semibold ${headingTextClass}`}>
                    Nearby spots
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    {[0, 1].map((index) => (
                      <div
                        key={`${variant}-card-${index}`}
                        className={`rounded-[1rem] p-2.5 ${previewMutedSurfaceClass}`}
                      >
                        <div className={`h-14 rounded-[0.8rem] ${statClass}`} />
                        <div className={`mt-2.5 h-2.5 rounded-full ${titleClass} ${index === 0 ? "w-16" : "w-14"}`} />
                        <div className={`mt-2 h-2 rounded-full ${lineClass} ${index === 0 ? "w-10" : "w-12"}`} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`mt-4 rounded-[0.95rem] p-3 ${previewMutedSurfaceClass}`}>
                  <div className="flex items-center gap-2.5">
                    <div className={`h-8 w-8 rounded-full ${iconClass}`} />
                    <div className="flex-1 space-y-1.5">
                      <div className={`h-2.5 w-20 rounded-full ${titleClass}`} />
                      <div className={`h-2 w-24 rounded-full ${lineClass}`} />
                    </div>
                    <div className={`h-6 w-10 rounded-full ${chipClass}`} />
                  </div>
                </div>
              </>
            );

          case "saved":
            return (
              <>
                <div className={`mt-4 rounded-[1.15rem] border ${heroClass} p-3.5`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${metaTextClass}`}>
                        Saved
                      </p>
                      <p className={`mt-1 text-[12px] font-semibold ${headingTextClass}`}>
                        Weekend list
                      </p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] ${pillClass}`}>
                      12 spots
                    </span>
                  </div>

                  <div className={`mt-3 rounded-[1rem] p-3 ${previewMutedSurfaceClass}`}>
                    <div className={`h-16 rounded-[0.9rem] ${statClass}`} />
                    <div className={`mt-3 h-2.5 w-20 rounded-full ${titleClass}`} />
                    <div className={`mt-2 h-2 w-full rounded-full ${lineClass}`} />
                    <div className={`mt-2 h-2 w-4/5 rounded-full ${lineClass}`} />
                  </div>
                </div>

                <div className="mt-4 space-y-2.5">
                  {["w-24", "w-16"].map((width, index) => (
                    <div
                      key={`${variant}-row-${index}`}
                      className={`rounded-[1rem] p-2.5 ${previewMutedSurfaceClass}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`h-8 w-8 rounded-[0.9rem] ${iconClass}`} />
                        <div className="flex-1 space-y-1.5">
                          <div className={`h-2.5 rounded-full ${titleClass} ${width}`} />
                          <div className={`h-2 rounded-full ${lineClass} ${index === 0 ? "w-20" : "w-24"}`} />
                        </div>
                        <div className={`h-6 w-6 rounded-full ${chipClass}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            );

          case "wizard-contact":
            return (
              <>
                <div className={`mt-4 rounded-[1.15rem] border ${heroClass} p-3.5`}>
                  <p className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${metaTextClass}`}>
                    Checkout
                  </p>
                  <p className={`mt-1 text-[12px] font-semibold ${headingTextClass}`}>
                    Contact details
                  </p>
                  <div className="mt-3 space-y-2.5">
                    {["w-10", "w-14", "w-12"].map((labelWidth, index) => (
                      <div key={`${variant}-field-${index}`} className="space-y-1.5">
                        <div className={`h-2 rounded-full ${titleClass} ${labelWidth}`} />
                        <div className={`h-10 rounded-[0.95rem] ${previewMutedSurfaceClass}`} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`mt-4 rounded-[0.95rem] px-3 py-3 ${previewMutedSurfaceClass}`}>
                  <div className={`h-2.5 w-16 rounded-full ${titleClass}`} />
                </div>
              </>
            );

          case "wizard-payment":
            return (
              <>
                <div className={`mt-4 rounded-[1.15rem] border ${heroClass} p-3.5`}>
                  <p className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${metaTextClass}`}>
                    Checkout
                  </p>
                  <p className={`mt-1 text-[12px] font-semibold ${headingTextClass}`}>
                    Payment review
                  </p>

                  <div className={`mt-3 rounded-[1rem] p-3 ${previewMutedSurfaceClass}`}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className={`h-2.5 w-14 rounded-full ${titleClass}`} />
                        <div className={`mt-2 h-2 w-16 rounded-full ${lineClass}`} />
                      </div>
                      <div className={`h-8 w-12 rounded-[0.8rem] ${chipClass}`} />
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    <div className={`rounded-[0.95rem] p-2.5 ${previewMutedSurfaceClass}`}>
                      <div className={`h-2.5 w-10 rounded-full ${titleClass}`} />
                      <div className={`mt-2 h-2 w-12 rounded-full ${lineClass}`} />
                    </div>
                    <div className={`rounded-[0.95rem] p-2.5 ${previewMutedSurfaceClass}`}>
                      <div className={`h-2.5 w-12 rounded-full ${titleClass}`} />
                      <div className={`mt-2 h-2 w-14 rounded-full ${lineClass}`} />
                    </div>
                  </div>

                  <div className={`mt-3 rounded-[0.95rem] p-2.5 ${previewMutedSurfaceClass}`}>
                    <div className={`h-2.5 w-16 rounded-full ${titleClass}`} />
                    <div className={`mt-2 h-2 w-full rounded-full ${lineClass}`} />
                  </div>
                </div>

                <div className={`mt-4 rounded-[0.95rem] px-3 py-3 ${previewMutedSurfaceClass}`}>
                  <div className={`h-2.5 w-20 rounded-full ${titleClass}`} />
                </div>
              </>
            );
        }
      };

      return (
        <div
          className={`relative h-full w-full overflow-hidden rounded-[1.35rem] border ${frameBorderClass} ${surfaceBgClass} shadow-[0_18px_36px_rgba(0,0,0,0.36)]`}
        >
          <div className={`absolute inset-x-0 top-0 h-24 ${surfaceGlowClass}`} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0))]" />
          <div
            className={`relative flex h-full flex-col ${previewCardPaddingClass}`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`rounded-[1rem] border border-white/8 ${chipClass} ${
                  isSmall ? "h-10 w-10" : "h-12 w-12"
                }`}
              />
              <div className="flex-1 space-y-2">
                <div
                  className={`h-3 rounded-full ${titleClass} ${
                    isSmall ? "w-24" : "w-32"
                  }`}
                />
                <div
                  className={`h-2 rounded-full ${lineClass} ${
                    isSmall ? "w-32" : "w-40"
                  }`}
                />
              </div>
            </div>

            {showStepper && (
              <div className="mt-4 flex gap-2">
                {[0, 1, 2].map((step) => (
                  <div
                    key={step}
                    className={`h-1.5 flex-1 rounded-full ${
                      step === activeStep
                        ? previewAccentSolidClass
                        : step < activeStep
                          ? previewAccentMediumClass
                          : "bg-white/12"
                    }`}
                  />
                ))}
              </div>
            )}

            {renderSurfaceContent()}
          </div>
        </div>
      );
    };

  const renderPhoneScaffold = () => (
    <>
      <div className={statusBarClass}>
        <span className="tracking-[0.18em] uppercase">9:41</span>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
          <span className="h-1.5 w-3 rounded-full bg-white/30" />
          <span className="h-1.5 w-4 rounded-full bg-white/45" />
        </div>
      </div>

      <div className={scaffoldContentClass}>
        <div className="absolute inset-0 rounded-[1.25rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.012))]" />
        <div className="absolute inset-x-2 top-3 h-16 rounded-[1rem] border border-white/5 bg-white/[0.024]" />
        <div className="absolute inset-x-2 top-24 space-y-2.5">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="h-16 rounded-[1rem] border border-white/4 bg-white/[0.02]"
            />
          ))}
        </div>
      </div>

      <div className={bottomTabClass}>
        <div className="h-full rounded-[1.1rem] border border-white/8 bg-white/[0.045] backdrop-blur-sm flex items-center justify-around px-4">
          {[0, 1, 2].map((item) => (
            <div key={item} className="flex flex-col items-center gap-1">
              <div
                className={`rounded-full ${item === 1 ? previewAccentStrongClass : "bg-white/12"} ${isSmall ? "w-5 h-1.5" : "w-6 h-1.5"}`}
              />
              <div
                className={`rounded-full ${item === 1 ? previewAccentMediumClass : "bg-white/8"} ${isSmall ? "w-7 h-1" : "w-8 h-1"}`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className={`relative ${previewShellClass} mx-auto`}>
      <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(180deg,#151922_0%,#090b10_100%)] shadow-[0_26px_60px_rgba(0,0,0,0.45)]" />
      <div className="absolute inset-0 rounded-[2rem] ring-1 ring-white/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(173,198,255,0.12),_transparent_42%)] rounded-[2rem]" />

      <div
        className={`${deviceFrameClass} rounded-[2rem] bg-[#07080a] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.45)] overflow-hidden`}
      >
        <div className="absolute inset-[2px] rounded-[1.9rem] bg-[#111318]" />
        <div
          className={`absolute left-1/2 top-2 z-20 h-1.5 ${isSmall ? "w-12" : "w-16"} -translate-x-1/2 rounded-full bg-black/45`}
        />
        <div
          className={`${deviceViewportClass} overflow-hidden bg-[linear-gradient(180deg,#15181d_0%,#0d1014_100%)] flex items-center justify-center`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(173,198,255,0.1),_transparent_52%)]" />
          <div className="absolute inset-x-0 top-0 h-8 bg-white/[0.025]" />
          <div className="absolute inset-x-5 bottom-3 h-10 rounded-full bg-[#E7C2A8]/14 blur-2xl" />
          {renderPhoneScaffold()}

          <AnimatePresence mode="wait">
            {isPlaying && (
              <motion.div key={key} className={previewMotionClass}>
                {pattern.id === "bottom-sheet" && (
                  <>
                    <motion.div
                      className="absolute inset-0 bg-black/35"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={getTweenConfig(0.05, 0.6)}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 bg-primary-container rounded-t-xl p-4"
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={getSpringConfig(0.08)}
                    >
                      <div className="w-12 h-1 bg-primary/30 rounded-full mx-auto mb-2" />
                      <div className="h-8 bg-primary/20 rounded mb-3" />
                      <div className="h-2 w-4/5 bg-primary/15 rounded-full mb-1.5" />
                      <div className="h-2 w-3/5 bg-primary/15 rounded-full" />
                    </motion.div>
                  </>
                )}

                {pattern.id === "modal-dialog" && (
                  <>
                    <motion.div
                      className="absolute inset-0 bg-black/30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={getTweenConfig(0.04, 0.55)}
                    />
                    <motion.div
                      className={`${compactPanelClass} bg-surface-3 rounded-lg shadow-xl border border-primary/20 ${isSmall ? "p-4" : "p-6"}`}
                      initial={{ scale: 0.82, opacity: 0, y: 12 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={getSpringConfig(0.08)}
                    >
                      <div className="h-3 bg-primary/40 rounded mb-2" />
                      <div className="h-2 bg-primary/20 rounded mb-4" />
                      <div className="flex gap-2 justify-end">
                        <div className="h-6 w-12 rounded-md bg-primary/10" />
                        <div className="h-6 w-16 rounded-md bg-primary/25" />
                      </div>
                    </motion.div>
                  </>
                )}

                {pattern.id === "accordion-expand" && (
                  <motion.div className={stackClass}>
                    <div className="bg-surface-3 rounded-lg p-3 mb-1">
                      <div className="h-2 bg-primary/40 rounded" />
                    </div>
                    <motion.div
                      className="bg-surface-3 rounded-lg overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={getSpringConfig()}
                    >
                      <div className="p-3 space-y-1">
                        <div className="h-2 bg-primary/20 rounded" />
                        <div className="h-2 bg-primary/20 rounded" />
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {pattern.id === "toast-notification" && (
                  <motion.div
                    className={`absolute ${toastPositionClass} bg-primary-container rounded-xl p-3.5 shadow-lg border border-primary/30`}
                    initial={{ y: -38, opacity: 0, scale: 0.94 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={getSpringConfig()}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-sm">
                          notifications
                        </span>
                      </div>
                      <div className="flex-1 pt-0.5">
                        <div className="h-2.5 w-2/5 bg-primary rounded-full mb-2" />
                        <div className="h-2 w-full bg-primary/45 rounded-full mb-1.5" />
                        <div className="h-2 w-3/4 bg-primary/35 rounded-full" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {pattern.id === "drawer-slide" && (
                  <motion.div
                    className={`absolute left-0 top-0 bottom-0 ${drawerWidthClass} bg-surface-3 border-r border-primary/20 p-3`}
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    transition={getSpringConfig()}
                  >
                    <div className="space-y-2">
                      <div className="h-2 bg-primary/40 rounded" />
                      <div className="h-2 bg-primary/20 rounded" />
                      <div className="h-2 bg-primary/20 rounded" />
                    </div>
                  </motion.div>
                )}

                {pattern.id === "tooltip-popover" && (
                  <div className="relative">
                    <div className="w-8 h-8 bg-primary/30 rounded" />
                    <motion.div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-surface-4 rounded px-3 py-1 text-xs whitespace-nowrap border border-primary/20"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={getTweenConfig()}
                    >
                      Tooltip
                    </motion.div>
                  </div>
                )}

                {pattern.id === "card-expansion" && (
                  <motion.div
                    className="bg-surface-3 rounded-lg p-4 border border-primary/20"
                    initial={{ width: cardExpansionInitialWidth }}
                    animate={{ width: cardExpansionExpandedWidth }}
                    transition={getSpringConfig()}
                  >
                    <div className="h-2 bg-primary/40 rounded mb-2" />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={getTweenConfig(0.14, 0.65)}
                      className="space-y-1"
                    >
                      <div className="h-1 bg-primary/20 rounded" />
                      <div className="h-1 bg-primary/20 rounded" />
                    </motion.div>
                  </motion.div>
                )}

                {pattern.id === "page-slide" && (
                  <div className={`relative ${sceneClass}`}>
                    <motion.div
                      className="absolute inset-0"
                      initial={{ x: 0, opacity: 1 }}
                      animate={{ x: "-20%", opacity: 1, scale: 0.965 }}
                      transition={getSpringConfig()}
                    >
                      <div className="relative h-full w-full">
                        {renderScreenSurface({
                          accent: "muted",
                          variant: "orders",
                        })}
                        <div className="absolute inset-0 rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(6,8,12,0.06),rgba(6,8,12,0.34))]" />
                      </div>
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 z-10"
                      initial={{ x: "34%", opacity: 0.12, scale: 0.98 }}
                      animate={{ x: 0, opacity: 1, scale: 1 }}
                      transition={getSpringConfig()}
                    >
                      {renderScreenSurface({
                        accent: "primary",
                        variant: "order-detail",
                      })}
                    </motion.div>
                  </div>
                )}

                {pattern.id === "wizard-step" && (
                  <div className={`relative ${sceneClass}`}>
                    <motion.div
                      className="absolute inset-0"
                      initial={{ x: 0, opacity: 0.95 }}
                      animate={{ x: "-15%", opacity: 1, scale: 0.97 }}
                      transition={getSpringConfig()}
                    >
                      <div className="relative h-full w-full">
                        {renderScreenSurface({
                          accent: "muted",
                          variant: "wizard-contact",
                          showStepper: true,
                          activeStep: 0,
                        })}
                        <div className="absolute inset-0 rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(7,10,15,0.08),rgba(7,10,15,0.3))]" />
                      </div>
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 z-10"
                      initial={{ x: "28%", opacity: 0.1, scale: 0.98 }}
                      animate={{ x: 0, opacity: 1, scale: 1 }}
                      transition={getSpringConfig()}
                    >
                      {renderScreenSurface({
                        accent: "primary",
                        variant: "wizard-payment",
                        showStepper: true,
                        activeStep: 1,
                      })}
                    </motion.div>
                  </div>
                )}

                {pattern.id === "page-fade" && (
                  <div className={`relative ${sceneClass}`}>
                    <motion.div
                      className="absolute inset-0"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1, scale: 0.992 }}
                      transition={getTweenConfig(0, 0.82)}
                    >
                      <div className="relative h-full w-full">
                        {renderScreenSurface({
                          accent: "muted",
                          variant: "discover",
                        })}
                        <motion.div
                          className="absolute inset-0 rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(7,10,15,0.06),rgba(7,10,15,0.3))]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={getTweenConfig(0.03, 0.6)}
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 z-10"
                      initial={{ opacity: 0, scale: 1.02, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={getTweenConfig(0.04, 0.86)}
                    >
                      {renderScreenSurface({
                        accent: "primary",
                        variant: "saved",
                      })}
                    </motion.div>
                  </div>
                )}

                {pattern.id === "error-shake" && (
                  <motion.div
                    className={`${compactPanelClass} rounded-[1.25rem] border border-destructive/25 bg-[linear-gradient(180deg,rgba(88,24,24,0.7),rgba(27,12,12,0.95))] p-4 shadow-xl`}
                    animate={{ x: [0, -10, 10, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="h-2.5 w-24 bg-destructive/70 rounded-full mb-4" />
                    <div className="rounded-[1rem] border border-destructive/30 bg-destructive/10 px-3 py-3">
                      <div className="h-2 w-full bg-destructive/25 rounded-full mb-1.5" />
                      <div className="h-2 w-3/4 bg-destructive/20 rounded-full" />
                    </div>
                  </motion.div>
                )}

                {pattern.id === "success-checkmark" && (
                  <div
                    className={`${compactPanelClass} rounded-[1.25rem] border border-primary/20 bg-[linear-gradient(180deg,#151922_0%,#0d1117_100%)] p-4 shadow-xl`}
                  >
                    <div className="flex flex-col items-center justify-center gap-4 py-4">
                      <motion.div
                        className="w-16 h-16 bg-primary/18 rounded-full border border-primary/24 flex items-center justify-center"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={getSpringConfig()}
                      >
                        <motion.span
                          className="material-symbols-outlined text-primary text-[2rem]"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={getSpringConfig(0.14)}
                        >
                          check
                        </motion.span>
                      </motion.div>
                      <div className="h-2.5 w-28 bg-primary/50 rounded-full" />
                      <div className="h-2 w-40 bg-primary/18 rounded-full" />
                    </div>
                  </div>
                )}

                {pattern.id === "button-press" && (
                  <div
                    className={`${compactPanelClass} rounded-[1.25rem] border border-primary/18 bg-[linear-gradient(180deg,#151922_0%,#0d1117_100%)] p-4 shadow-xl`}
                  >
                    <div className="h-2.5 w-20 bg-white/16 rounded-full mb-4" />
                    <div className="h-20 rounded-[1rem] border border-white/6 bg-white/[0.04] mb-4" />
                    <motion.button
                      className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-[1rem] font-medium"
                      whileTap={{ scale: 0.95 }}
                      animate={{ scale: [1, 0.95, 1] }}
                      transition={{
                        duration: isSmall ? 0.65 : 0.8,
                        ease: "easeInOut",
                        delay: previewLeadIn,
                      }}
                    >
                      Save Changes
                    </motion.button>
                  </div>
                )}

                {pattern.id === "spinner-rotation" && (
                  <div
                    className={`${compactPanelClass} rounded-[1.25rem] border border-primary/18 bg-[linear-gradient(180deg,#151922_0%,#0d1117_100%)] p-4 shadow-xl`}
                  >
                    <div className="h-2.5 w-20 bg-white/16 rounded-full mb-4" />
                    <div className="flex items-center justify-center py-8">
                      <motion.div
                        className="w-14 h-14 border-[3px] border-primary/20 border-t-primary rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          delay: previewLeadIn,
                          duration: isSmall ? 1.6 : 1.9,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </div>
                    <div className="h-2 w-32 bg-primary/18 rounded-full mx-auto" />
                  </div>
                )}

                {pattern.id === "skeleton-pulse" && (
                  <div
                    className={`${compactPanelClass} space-y-3 rounded-[1.25rem] border border-primary/18 bg-[linear-gradient(180deg,#151922_0%,#0d1117_100%)] p-4 shadow-xl`}
                  >
                    <motion.div
                      className="h-24 rounded-[1rem] bg-primary/12"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        delay: previewLeadIn,
                      }}
                    />
                    <motion.div
                      className="h-12 rounded-[1rem] bg-primary/12"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        delay: previewLeadIn + 0.25,
                      }}
                    />
                    <motion.div
                      className="h-12 w-4/5 rounded-[1rem] bg-primary/12"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        delay: previewLeadIn + 0.45,
                      }}
                    />
                  </div>
                )}

                {pattern.id === "progress-bar" && (
                  <div className={`${progressClass} space-y-3`}>
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">
                      <span>Uploading</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={getTweenConfig(0.12, 0.45)}
                      >
                        72%
                      </motion.span>
                    </div>
                    <div className="w-full h-2.5 bg-surface-3 rounded-full overflow-hidden border border-primary/15">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 0.72 }}
                        style={{ transformOrigin: "left" }}
                        transition={getSpringConfig(0.08)}
                      />
                    </div>
                    <motion.div
                      className="h-2 w-28 bg-primary/15 rounded-full"
                      initial={{ opacity: 0.2 }}
                      animate={{ opacity: 0.6 }}
                      transition={getTweenConfig(0.18, 0.65)}
                    />
                  </div>
                )}

                {pattern.id === "drag-card" && (
                  <div className={`relative ${sceneClass}`}>
                    <div className="absolute inset-x-12 bottom-5 h-14 rounded-xl border border-dashed border-primary/20 bg-surface-3/30" />
                    <motion.div
                      className="absolute left-12 top-8 bg-surface-3 rounded-lg p-4 w-24 border border-primary/20 shadow-lg"
                      initial={{ x: -28, y: 10, rotate: -6, scale: 0.96 }}
                      animate={{ x: 18, y: -10, rotate: 5, scale: 1.03 }}
                      transition={getSpringConfig()}
                    >
                      <div className="h-2 bg-primary/40 rounded mb-2" />
                      <div className="h-1.5 bg-primary/20 rounded" />
                    </motion.div>
                  </div>
                )}

                {pattern.id === "swipe-dismiss" && (
                  <motion.div
                    className={`${swipeClass} bg-surface-3 rounded-lg p-3 border border-primary/20`}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    initial={{ x: 0, opacity: 1 }}
                    animate={{ x: 100, opacity: 0 }}
                    transition={getSpringConfig(0.15)}
                  >
                    <div className="h-2 bg-primary/40 rounded" />
                  </motion.div>
                )}

                {pattern.id === "input-focus" && (
                  <div className={`relative ${stackClass}`}>
                    <motion.span
                      className="absolute left-3 top-1 z-10 text-[10px] uppercase tracking-[0.16em] text-primary"
                      initial={{ y: 10, opacity: 0.55 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={getSpringConfig(0.05)}
                    >
                      Email
                    </motion.span>
                    <div className="h-12 bg-surface-3 rounded-lg border-2 border-primary/20 relative pt-4 px-3">
                      <div className="h-2 w-3/4 rounded-full bg-primary/15" />
                      <motion.div
                        className="absolute inset-0 rounded-lg border-2 border-primary"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={getSpringConfig()}
                      />
                      <motion.div
                        className="absolute left-3 right-3 bottom-2 h-0.5 bg-primary"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        style={{ transformOrigin: "left" }}
                        transition={getTweenConfig(0.12, 0.55)}
                      />
                    </div>
                  </div>
                )}

                {pattern.id === "dropdown-menu" && (
                  <div className={`${stackClass} relative`}>
                    <div className="h-12 rounded-[1rem] border border-primary/20 bg-surface-3 px-4 flex items-center justify-between">
                      <div className="h-2.5 w-24 rounded-full bg-primary/18" />
                      <div className="w-4 h-4 rounded-full bg-primary/18" />
                    </div>
                    <motion.div
                      className="absolute inset-x-0 top-full mt-2 bg-surface-3 rounded-[1rem] border border-primary/20 overflow-hidden shadow-xl"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={getSpringConfig()}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="px-4 py-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={getSpringConfig(0.1 + i * 0.08)}
                        >
                          <div className="h-2 bg-primary/30 rounded-full" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}

                {pattern.id === "stagger-list" && (
                  <div className={`space-y-2 ${compactListClass}`}>
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="h-3 bg-surface-3 rounded border border-primary/20"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={getSpringConfig(0.08 + i * 0.08)}
                      />
                    ))}
                  </div>
                )}

                {pattern.id === "ripple-effect" && (
                  <div
                    className={`${compactPanelClass} rounded-[1.25rem] border border-primary/18 bg-[linear-gradient(180deg,#151922_0%,#0d1117_100%)] p-4 shadow-xl`}
                  >
                    <div className="h-2.5 w-24 bg-white/16 rounded-full mb-4" />
                    <div className="flex items-center justify-center py-6">
                      <div className="relative w-full max-w-[12rem] h-14 bg-primary/12 rounded-[1rem] overflow-hidden flex items-center justify-center border border-primary/20">
                        <motion.div
                          className="absolute w-5 h-5 bg-primary/30 rounded-full"
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: 10, opacity: 0 }}
                          transition={getTweenConfig(0.04, 0.8)}
                        />
                        <span className="relative z-10 text-sm text-foreground">
                          Tap to Confirm
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {pattern.id === "parallax-scroll" && (
                  <div
                    className={`relative ${sceneClass} overflow-hidden rounded-xl border border-primary/15 bg-surface-3`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-primary/12 to-transparent"
                      initial={{ y: 10 }}
                      animate={{ y: -8 }}
                      transition={getTweenConfig(0.04, 1.05)}
                    />
                    <motion.div
                      className="absolute bottom-10 left-4 h-10 w-20 rounded-full bg-primary/12 blur-sm"
                      initial={{ x: -8 }}
                      animate={{ x: 12 }}
                      transition={getTweenConfig(0.08, 1.1)}
                    />
                    <motion.div
                      className="absolute bottom-4 left-6 h-12 w-16 rounded-t-full bg-primary/20"
                      initial={{ x: 0 }}
                      animate={{ x: -18 }}
                      transition={getTweenConfig(0.12, 1.15)}
                    />
                    <motion.div
                      className="absolute bottom-3 right-4 h-16 w-20 rounded-t-full bg-primary/30"
                      initial={{ x: 0 }}
                      animate={{ x: -28 }}
                      transition={getTweenConfig(0.12, 1.2)}
                    />
                  </div>
                )}

                {pattern.id === "scroll-reveal" && (
                  <div className={`space-y-2 ${stackClass}`}>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="rounded-lg border border-primary/20 bg-surface-3 p-3"
                        initial={{ y: 24, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={getSpringConfig(0.08 + i * 0.1)}
                      >
                        <div className="h-2 bg-primary/35 rounded mb-1.5" />
                        <div className="h-2 bg-primary/15 rounded w-4/5" />
                      </motion.div>
                    ))}
                  </div>
                )}

                {pattern.id === "sticky-header" && (
                  <div
                    className={`relative ${sceneClass} overflow-hidden rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,#171C24_0%,#0F131A_100%)] shadow-[0_18px_36px_rgba(0,0,0,0.36)]`}
                  >
                    <motion.div
                      className="absolute inset-x-0 top-0 border-b border-white/10 bg-[linear-gradient(180deg,rgba(23,28,36,0.98),rgba(15,19,26,0.92))] px-4"
                      initial={{ height: isSmall ? 72 : 84 }}
                      animate={{ height: isSmall ? 50 : 60 }}
                      transition={getSpringConfig()}
                    >
                      <div className="flex h-full items-end pb-3">
                        <div
                          className={`h-3 w-24 rounded-full ${previewAccentStrongClass}`}
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      className={`absolute inset-x-4 ${isSmall ? "top-24" : "top-28"} space-y-3`}
                      initial={{ y: 0 }}
                      animate={{ y: -28 }}
                      transition={getTweenConfig(0.06, 1)}
                    >
                      <div
                        className={`h-24 rounded-[1.15rem] border ${previewAccentBorderClass} ${previewHeroPrimaryClass}`}
                      />
                      <div
                        className={`h-12 rounded-[1rem] ${previewMutedSurfaceClass}`}
                      />
                      <div
                        className={`h-12 rounded-[1rem] ${previewMutedSurfaceClass}`}
                      />
                      <div
                        className={`h-12 rounded-[1rem] ${previewMutedSurfaceClass}`}
                      />
                    </motion.div>
                  </div>
                )}

                {pattern.id === "reorder-list" && (
                  <div className={`relative ${stackClass} space-y-2`}>
                    <motion.div
                      className="h-8 rounded-lg border border-primary/15 bg-surface-3"
                      initial={{ y: 18 }}
                      animate={{ y: 0 }}
                      transition={getSpringConfig(0.12)}
                    />
                    <motion.div
                      className="h-8 rounded-lg border border-primary/30 bg-surface-4 shadow-lg"
                      initial={{ y: 0, scale: 0.98 }}
                      animate={{ y: -10, scale: 1.04 }}
                      transition={getSpringConfig()}
                    />
                    <motion.div
                      className="h-8 rounded-lg border border-primary/15 bg-surface-3"
                      initial={{ y: -18 }}
                      animate={{ y: 0 }}
                      transition={getSpringConfig(0.18)}
                    />
                  </div>
                )}

                {![
                  "bottom-sheet",
                  "modal-dialog",
                  "accordion-expand",
                  "toast-notification",
                  "drawer-slide",
                  "tooltip-popover",
                  "card-expansion",
                  "page-slide",
                  "wizard-step",
                  "page-fade",
                  "error-shake",
                  "success-checkmark",
                  "button-press",
                  "spinner-rotation",
                  "skeleton-pulse",
                  "progress-bar",
                  "drag-card",
                  "swipe-dismiss",
                  "input-focus",
                  "dropdown-menu",
                  "stagger-list",
                  "ripple-effect",
                  "parallax-scroll",
                  "scroll-reveal",
                  "sticky-header",
                  "reorder-list",
                ].includes(pattern.id) && renderGenericPreview()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {!autoPlay && !isPlaying && (
        <button
          onClick={replay}
          className="absolute inset-0 flex items-center justify-center bg-surface-1/50 backdrop-blur-sm group hover:bg-surface-1/70 transition-colors"
        >
          <span className="material-symbols-outlined text-primary text-4xl group-hover:scale-110 transition-transform">
            play_arrow
          </span>
        </button>
      )}

      {size === "large" && isPlaying && (
        <button
          onClick={replay}
          className="absolute bottom-4 right-4 bg-surface-4/90 hover:bg-primary/20 text-foreground px-4 py-2 rounded-lg flex items-center gap-2 transition-colors border border-primary/20 backdrop-blur-sm"
        >
          <span className="material-symbols-outlined text-sm">replay</span>
          <span className="text-sm font-medium">Replay</span>
        </button>
      )}
    </div>
  );
}
