import { useMemo } from "react";
import { PX } from "./theme";

export type Paint = (x: number, y: number) => string | null;

// Pixel grid rendered as one <rect> per horizontal run of equal color; 1 cell = PX. `paint` must be a stable reference.
export const Sprite: React.FC<{ w: number; h: number; paint: Paint; children?: React.ReactNode }> = ({
  w,
  h,
  paint,
  children,
}) => {
  const runs = useMemo(() => {
    const out: React.ReactElement[] = [];
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; ) {
        const c = paint(x, y);
        let end = x + 1;
        while (end < w && paint(end, y) === c) end++;
        if (c) out.push(<rect key={`${x},${y}`} x={x} y={y} width={end - x} height={1} fill={c} />);
        x = end;
      }
    }
    return out;
  }, [w, h, paint]);

  return (
    <svg
      width={w * PX}
      height={h * PX}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      style={{ display: "block", overflow: "visible" }}
    >
      {runs}
      {children}
    </svg>
  );
};

// Fills a mask with `fill` and draws `outline` on every cell that touches the outside.
export const outlined =
  (inside: (x: number, y: number) => boolean, fill: Paint, outline: string): Paint =>
  (x, y) => {
    if (!inside(x, y)) return null;
    const edge = !inside(x - 1, y) || !inside(x + 1, y) || !inside(x, y - 1) || !inside(x, y + 1);
    return edge ? outline : fill(x, y);
  };
