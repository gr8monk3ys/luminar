import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Luminar — Interactive STEM Learning",
    short_name: "Luminar",
    description:
      "Master math, physics, computer science, and machine learning through interactive problem-solving.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#6366f1",
  };
}
