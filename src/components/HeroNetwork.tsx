"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; soft: boolean };

const LINK_DIST = 170; // max distance (px) at which two nodes are joined by a line

// Thin connected network of nodes. Nodes drift slowly and ease toward the cursor.
// Static when motion is reduced.
export default function HeroNetwork() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let nodes: Node[] = [];
    // Pointer position (smoothed) and how strongly it is pulling the nodes (0-1).
    const ptr = { x: 0, y: 0, tx: 0, ty: 0, s: 0, ts: 0 };

    const seed = () => {
      const count = Math.min(Math.round((w * h) / 9000), 150);
      nodes = Array.from({ length: count }, () => {
        const soft = Math.random() < 0.25; // out-of-focus nodes, as in the reference
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: soft ? 3 + Math.random() * 3 : 1 + Math.random() * 0.9,
          soft,
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw(false);
    };

    const draw = (step: boolean) => {
      ptr.x += (ptr.tx - ptr.x) * 0.12;
      ptr.y += (ptr.ty - ptr.y) * 0.12;
      ptr.s += (ptr.ts - ptr.s) * 0.08;
      const radius = Math.max(200, w * 0.16);

      // Positions this frame: slow drift plus a pull toward the cursor.
      const pos = nodes.map((n) => {
        if (step) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = w + 20;
          else if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          else if (n.y > h + 20) n.y = -20;
        }
        const dx = (n.x - ptr.x) / radius;
        const dy = (n.y - ptr.y) / radius;
        const pull = ptr.s * Math.exp(-(dx * dx + dy * dy)) * 0.55;
        return { x: n.x + (ptr.x - n.x) * pull, y: n.y + (ptr.y - n.y) * pull };
      });

      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      for (let i = 0; i < pos.length; i++) {
        if (nodes[i].soft) continue;
        for (let j = i + 1; j < pos.length; j++) {
          if (nodes[j].soft) continue;
          const dx = pos[i].x - pos[j].x;
          const dy = pos[i].y - pos[j].y;
          const d = Math.hypot(dx, dy);
          if (d > LINK_DIST) continue;
          ctx.strokeStyle = `rgba(255,255,255,${(1 - d / LINK_DIST) * 0.42})`;
          ctx.beginPath();
          ctx.moveTo(pos[i].x, pos[i].y);
          ctx.lineTo(pos[j].x, pos[j].y);
          ctx.stroke();
        }
      }
      for (let i = 0; i < pos.length; i++) {
        const n = nodes[i];
        if (n.soft) {
          const g = ctx.createRadialGradient(pos[i].x, pos[i].y, 0, pos[i].x, pos[i].y, n.r);
          g.addColorStop(0, "rgba(255,255,255,0.16)");
          g.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = g;
        } else {
          ctx.fillStyle = "rgba(255,255,255,0.9)";
        }
        ctx.beginPath();
        ctx.arc(pos[i].x, pos[i].y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // The canvas sits behind the page content, so track the pointer on the window.
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const inside = e.clientY >= r.top && e.clientY <= r.bottom;
      ptr.tx = e.clientX - r.left;
      ptr.ty = e.clientY - r.top;
      if (ptr.ts === 0 && inside) {
        ptr.x = ptr.tx;
        ptr.y = ptr.ty;
      }
      ptr.ts = inside ? 1 : 0;
    };
    const onLeave = () => (ptr.ts = 0);
    if (!reduced) {
      window.addEventListener("pointermove", onMove);
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    const loop = () => {
      if (visible) draw(true);
      raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    resize();
    if (!reduced) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
