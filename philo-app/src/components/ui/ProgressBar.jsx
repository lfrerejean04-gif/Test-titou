import { COLORS } from "../../styles/theme";

export default function ProgressBar({ value, max, height = 4, width = 160 }) {
  return (
    <div style={{ width, height, background: COLORS.border, borderRadius: height / 2 }}>
      <div
        style={{ width: `${(value / max) * 100}%`, height: "100%", background: COLORS.gradientPrimary, borderRadius: height / 2, transition: "width 0.3s" }}
        aria-hidden="true"
      />
    </div>
  );
}
