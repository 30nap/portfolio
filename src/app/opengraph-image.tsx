import { ImageResponse } from "next/og";
import { getContent } from "@/lib/content";

const { profile } = getContent();

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview image, generated at build time from the profile data. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#09090b",
          color: "#f4f4f5",
          backgroundImage:
            "linear-gradient(to right, #1a1a1e 1px, transparent 1px), linear-gradient(to bottom, #1a1a1e 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, color: "#a1a1aa" }}>{profile.name}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05 }}>
            {profile.role}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#a1a1aa", maxWidth: 900, lineHeight: 1.4 }}>
            {profile.tagline}
          </div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {profile.coreStack.slice(0, 6).map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                padding: "8px 16px",
                border: "1px solid #34343a",
                borderRadius: 10,
                fontSize: 22,
                color: "#d4d4d8",
                background: "#111114",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
