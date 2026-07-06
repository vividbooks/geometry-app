import { useCallback, useEffect, useState, type RefObject } from 'react';

type FitPanelScaleOptions = {
  verticalPadding?: number;
  horizontalPadding?: number;
  minScale?: number;
  enabled?: boolean;
};

/** Zmenší panel (scale ≤ 1), aby se vešel do viewportu. Měří neškálovaný obsah přes ref. */
export function useFitPanelScale(
  ref: RefObject<HTMLElement | null>,
  deps: unknown[] = [],
  options: FitPanelScaleOptions = {}
) {
  const {
    verticalPadding = 16,
    horizontalPadding = 16,
    minScale = 0.5,
    enabled = true,
  } = options;

  const [scale, setScale] = useState(1);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el || !enabled) {
      setScale(1);
      return;
    }
    const naturalW = el.offsetWidth;
    const naturalH = el.offsetHeight;
    if (naturalW <= 0 || naturalH <= 0) return;

    const availH = window.innerHeight - verticalPadding * 2;
    const availW = window.innerWidth - horizontalPadding * 2;
    const scaleH = availH / naturalH;
    const scaleW = availW / naturalW;
    const next = Math.min(1, scaleH, scaleW);
    setScale(Math.max(minScale, next));
  }, [ref, enabled, verticalPadding, horizontalPadding, minScale]);

  useEffect(() => {
    if (!enabled) {
      setScale(1);
      return;
    }
    const el = ref.current;
    if (!el) return;

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [measure, enabled, ...deps]);

  return scale;
}
