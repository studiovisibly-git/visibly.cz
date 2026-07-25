/**
 * Scroll-linked efekty (parallax nadpisů, zvětšení kruhu, zmenšování loga)
 * na mobilu vypínáme. Běží v rAF a při každém snímku čtou nebo mění layout
 * (getBoundingClientRect, padding, rozměry loga) — na dotykových zařízeních
 * se kvůli tomu scroll viditelně seká. Statické odsazení řádků i nájezdové
 * animace zůstávají, ty jsou čistě kompozitní.
 */
export const NO_SCROLL_FX = "(max-width: 760px)";
