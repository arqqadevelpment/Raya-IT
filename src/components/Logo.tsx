import Image from "next/image";

// Logo files are 7892 x 1164. Brand rule: never recolor, stretch or box the logo.
export default function Logo({
  variant = "color",
  height = 34,
}: {
  variant?: "color" | "white";
  height?: number;
}) {
  const width = Math.round((height * 7892) / 1164);
  return (
    <Image
      src={variant === "white" ? "/brand/logo-white.png" : "/brand/logo-color.png"}
      alt="Raya Information Technology"
      width={width}
      height={height}
      priority
      style={{ height, width: "auto" }}
    />
  );
}
