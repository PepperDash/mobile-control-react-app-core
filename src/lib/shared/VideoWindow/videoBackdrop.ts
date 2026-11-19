/**
 * Page background handling for {@link VideoWindow}.
 *
 * On a Crestron panel the video is drawn on a surface *underneath* the web
 * view, so it only shows where the page is see-through. CH5 solves this with
 * `<ch5-background>`, which paints the page background on a canvas and erases
 * a rectangle for each running video. This module does the same job without a
 * canvas:
 *
 *   1. the background of `<html>` and `<body>` is copied onto a fixed,
 *      full-viewport backdrop element that sits behind all page content
 *   2. `<html>` and `<body>` are made transparent
 *   3. the backdrop is clipped so that it has a hole over each running video
 *
 * Everything is undone when the last video stops.
 */

export interface VideoRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const BACKGROUND_PROPERTIES = [
  'background-color',
  'background-image',
  'background-size',
  'background-position',
  'background-repeat',
  'background-attachment',
] as const;

const holes = new Map<number, VideoRect>();
let backdrop: HTMLDivElement | null = null;
let restorePage: (() => void) | null = null;

const hasBackground = (style: CSSStyleDeclaration) =>
  style.backgroundImage !== 'none' ||
  !['transparent', 'rgba(0, 0, 0, 0)'].includes(style.backgroundColor);

const SEE_THROUGH_ATTRIBUTE = 'data-video-see-through';

/**
 * Makes the element's background transparent and returns a function that
 * undoes it. Done with an attribute and a style rule, so that whatever
 * background the app has set on the element itself is left as it was.
 */
const makeTransparent = (element: HTMLElement) => {
  if (!document.getElementById(SEE_THROUGH_ATTRIBUTE)) {
    const rule = document.createElement('style');
    rule.id = SEE_THROUGH_ATTRIBUTE;
    rule.textContent = `[${SEE_THROUGH_ATTRIBUTE}]{background:transparent !important}`;
    document.head.appendChild(rule);
  }
  element.setAttribute(SEE_THROUGH_ATTRIBUTE, '');

  return () => element.removeAttribute(SEE_THROUGH_ATTRIBUTE);
};

const createBackdrop = () => {
  const html = document.documentElement;
  const body = document.body;

  backdrop = document.createElement('div');
  backdrop.setAttribute('data-video-backdrop', '');
  backdrop.style.cssText =
    'position:fixed;top:0;right:0;bottom:0;left:0;z-index:-1;pointer-events:none;';

  // When both are set, the body background is the one copied: it is the one
  // drawn on top, behind the app's content.
  const pageStyle = [body, html]
    .map((element) => window.getComputedStyle(element))
    .find(hasBackground);

  if (pageStyle) {
    BACKGROUND_PROPERTIES.forEach((property) =>
      backdrop?.style.setProperty(property, pageStyle.getPropertyValue(property))
    );
  }

  const restoreHtml = makeTransparent(html);
  const restoreBody = makeTransparent(body);
  restorePage = () => {
    restoreBody();
    restoreHtml();
  };

  body.insertBefore(backdrop, body.firstChild);
};

const removeBackdrop = () => {
  restorePage?.();
  restorePage = null;
  backdrop?.remove();
  backdrop = null;
};

/**
 * Clips the backdrop to "the whole viewport minus every hole". Each hole is
 * joined to the outer rectangle by a zero-width seam back to the origin, and
 * the even-odd fill rule leaves the inside of each hole unpainted.
 */
const applyHoles = () => {
  if (!backdrop) {
    return;
  }

  const points = ['0 0', '100% 0', '100% 100%', '0 100%', '0 0'];
  holes.forEach(({ top, left, width, height }) => {
    const right = left + width;
    const bottom = top + height;
    points.push(
      `${left}px ${top}px`,
      `${left}px ${bottom}px`,
      `${right}px ${bottom}px`,
      `${right}px ${top}px`,
      `${left}px ${top}px`,
      '0 0'
    );
  });

  const clipPath = `polygon(evenodd, ${points.join(', ')})`;
  backdrop.style.setProperty('-webkit-clip-path', clipPath);
  backdrop.style.setProperty('clip-path', clipPath);
};

/**
 * Opens (or moves) the see-through hole for a video. `rect` is in viewport
 * coordinates, as returned by `getBoundingClientRect()`.
 */
export const setVideoHole = (id: number, rect: VideoRect) => {
  if (!backdrop) {
    createBackdrop();
  }
  holes.set(id, rect);
  applyHoles();
};

/**
 * Closes the hole for a video. The page background is restored when no holes
 * are left.
 */
export const clearVideoHole = (id: number) => {
  if (!holes.delete(id)) {
    return;
  }

  if (holes.size === 0) {
    removeBackdrop();
    return;
  }
  applyHoles();
};
