"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { devRoutes } from "@/lib/devtools/routes";

/**
 * Floating, draggable dev tool for traversing pages.
 *
 * - Renders only in development (gated by the caller).
 * - Drag the header to move; position snaps to a grid on release.
 * - Click a route to navigate; current page is highlighted.
 * - Position + open state persist in localStorage.
 * - Toggle with the ⌘/Ctrl + ` shortcut or the floating button.
 */

const GRID = 24; // px — snap step
const STORAGE_KEY = "asteria.devnav";

interface Persisted {
  x: number;
  y: number;
  open: boolean;
}

function snap(value: number) {
  return Math.round(value / GRID) * GRID;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function PageNavigator() {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 24, y: 24 });
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const dragRef = useRef<{ dx: number; dy: number } | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Live viewport (vw/vh) readout — updates on resize.
  useEffect(() => {
    function measure() {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Restore persisted state.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Persisted;
        setPos({ x: saved.x, y: saved.y });
        setOpen(saved.open);
      }
    } catch {
      /* ignore corrupt state */
    }
  }, []);

  const persist = useCallback((next: Persisted) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  // Keyboard toggle: Cmd/Ctrl + `
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "`") {
        e.preventDefault();
        setOpen((o) => {
          persist({ ...pos, open: !o });
          return !o;
        });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pos, persist]);

  // Drag handling.
  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (!dragRef.current) return;
      const w = panelRef.current?.offsetWidth ?? 0;
      const h = panelRef.current?.offsetHeight ?? 0;
      setPos({
        x: clamp(e.clientX - dragRef.current.dx, 0, window.innerWidth - w),
        y: clamp(e.clientY - dragRef.current.dy, 0, window.innerHeight - h),
      });
    }
    function onUp() {
      if (!dragRef.current) return;
      dragRef.current = null;
      setPos((p) => {
        const snapped = { x: snap(p.x), y: snap(p.y) };
        persist({ ...snapped, open });
        return snapped;
      });
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [open, persist]);

  function startDrag(e: React.PointerEvent) {
    dragRef.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
  }

  function toggle() {
    setOpen((o) => {
      persist({ ...pos, open: !o });
      return !o;
    });
  }

  if (!open) {
    return (
      <button
        onClick={toggle}
        title="Open page navigator (⌘/Ctrl + `)"
        style={{ ...buttonStyle, left: pos.x, top: pos.y }}
      >
        VH
      </button>
    );
  }

  return (
    <div ref={panelRef} style={{ ...panelStyle, left: pos.x, top: pos.y }}>
      <div onPointerDown={startDrag} style={headerStyle}>
        <span style={{ fontWeight: 600 }}>Pages</span>
        <button onClick={toggle} style={closeStyle} title="Close (⌘/Ctrl + `)">
          ×
        </button>
      </div>
      <div style={viewportStyle}>
        <span>viewport</span>
        <span style={{ fontVariantNumeric: "tabular-nums" }}>
          {viewport.w} × {viewport.h}px · 100vh = {viewport.h}px
        </span>
      </div>
      <ul style={listStyle}>
        {devRoutes.map((r) => {
          const active = r.path === pathname;
          return (
            <li key={r.path}>
              <button
                onClick={() => router.push(r.path)}
                style={{
                  ...itemStyle,
                  background: active ? "var(--accent)" : "transparent",
                  color: active ? "#fff" : "var(--foreground)",
                }}
              >
                <span>{r.label}</span>
                {r.group && <span style={groupStyle}>{r.group}</span>}
              </button>
            </li>
          );
        })}
      </ul>
      <div style={footerStyle}>snap {GRID}px · drag header</div>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  position: "fixed",
  zIndex: 99999,
  width: 44,
  height: 44,
  borderRadius: 10,
  border: "1px solid var(--border)",
  background: "var(--panel)",
  color: "var(--foreground)",
  cursor: "pointer",
  fontSize: 11,
  boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
};

const panelStyle: React.CSSProperties = {
  position: "fixed",
  zIndex: 99999,
  width: 240,
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "var(--panel)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
  overflow: "hidden",
  fontSize: 13,
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 12px",
  cursor: "grab",
  borderBottom: "1px solid var(--border)",
  userSelect: "none",
  touchAction: "none",
};

const closeStyle: React.CSSProperties = {
  border: "none",
  background: "transparent",
  color: "var(--foreground)",
  cursor: "pointer",
  fontSize: 18,
  lineHeight: 1,
};

const listStyle: React.CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 6,
  maxHeight: 320,
  overflowY: "auto",
};

const itemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  padding: "8px 10px",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  textAlign: "left",
};

const groupStyle: React.CSSProperties = {
  fontSize: 10,
  opacity: 0.5,
  textTransform: "uppercase",
};

const viewportStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "6px 12px",
  fontSize: 10,
  opacity: 0.6,
  borderBottom: "1px solid var(--border)",
  textTransform: "uppercase",
};

const footerStyle: React.CSSProperties = {
  padding: "6px 12px",
  fontSize: 10,
  opacity: 0.4,
  borderTop: "1px solid var(--border)",
};
