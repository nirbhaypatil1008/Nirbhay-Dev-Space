import './BotanicalBackground.css';

/**
 * BotanicalBackground
 * Renders authentic botanical leaf illustrations matching the reference design:
 * - Upper-left corner: Large botanical eucalyptus branch arching downward
 * - Upper-right corner: Subtle foliage tips
 * - Lower-right side: Graceful leafy branch along the margin
 * - Bottom-left corner: Botanical foliage accent
 *
 * Crisp SVG vectors, semi-translucent, non-overlapping with text/buttons,
 * responsive across mobile and desktop.
 */
export default function BotanicalBackground() {
  return (
    <div className="botanical-bg" aria-hidden="true">
      {/* ── 1. Upper-Left Large Botanical Branch ── */}
      <svg
        className="botanical-leaf botanical-leaf--top-left"
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="botanical-branch">
          {/* Main stem curving down into the viewport */}
          <path
            d="M-20 -10 C40 30, 90 90, 160 170 C200 215, 230 250, 260 290"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="botanical-stem"
          />
          {/* Leaf 1 - top left tip */}
          <path
            d="M20 15 C45 -5, 85 5, 110 30 C90 45, 55 45, 20 15 Z"
            fill="currentColor"
            className="botanical-leaf-blade"
          />
          <path d="M22 16 C55 18, 85 24, 108 29" stroke="currentColor" strokeWidth="1" opacity="0.6" />

          {/* Leaf 2 - upper right slender blade */}
          <path
            d="M65 50 C105 25, 155 40, 180 75 C150 95, 100 90, 65 50 Z"
            fill="currentColor"
            className="botanical-leaf-blade"
          />
          <path d="M68 52 C115 54, 150 64, 178 74" stroke="currentColor" strokeWidth="1" opacity="0.6" />

          {/* Leaf 3 - left drooping leaf */}
          <path
            d="M50 75 C30 110, 35 155, 65 185 C85 155, 90 115, 50 75 Z"
            fill="currentColor"
            className="botanical-leaf-blade"
          />
          <path d="M52 78 C50 118, 56 150, 64 183" stroke="currentColor" strokeWidth="1" opacity="0.6" />

          {/* Leaf 4 - central prominent leaf */}
          <path
            d="M110 115 C160 85, 220 105, 250 145 C215 170, 155 165, 110 115 Z"
            fill="currentColor"
            className="botanical-leaf-blade"
          />
          <path d="M113 118 C170 120, 215 132, 248 144" stroke="currentColor" strokeWidth="1" opacity="0.6" />

          {/* Leaf 5 - inner accent leaf */}
          <path
            d="M100 140 C80 175, 90 225, 125 250 C140 220, 140 175, 100 140 Z"
            fill="currentColor"
            className="botanical-leaf-blade"
          />
          <path d="M102 143 C103 182, 112 218, 123 248" stroke="currentColor" strokeWidth="1" opacity="0.6" />

          {/* Leaf 6 - reaching downward right */}
          <path
            d="M165 180 C215 155, 275 180, 295 220 C260 245, 205 235, 165 180 Z"
            fill="currentColor"
            className="botanical-leaf-blade"
          />
          <path d="M168 183 C220 188, 265 204, 293 219" stroke="currentColor" strokeWidth="1" opacity="0.6" />

          {/* Leaf 7 - lower tip leaf */}
          <path
            d="M175 220 C160 255, 175 295, 210 315 C225 285, 220 245, 175 220 Z"
            fill="currentColor"
            className="botanical-leaf-blade"
          />
          <path d="M177 223 C180 258, 192 288, 208 313" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        </g>
      </svg>

      {/* ── 2. Upper-Right Foliage Accent (Visible in dark mode & large screens) ── */}
      <svg
        className="botanical-leaf botanical-leaf--top-right"
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="botanical-branch">
          <path
            d="M260 -20 C220 20, 180 70, 140 130 C110 175, 80 210, 40 240"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="botanical-stem"
          />
          <path
            d="M210 20 C175 10, 130 30, 115 65 C145 80, 185 70, 210 20 Z"
            fill="currentColor"
            className="botanical-leaf-blade"
          />
          <path
            d="M170 70 C130 55, 85 80, 75 120 C105 135, 150 120, 170 70 Z"
            fill="currentColor"
            className="botanical-leaf-blade"
          />
          <path
            d="M130 125 C95 115, 55 140, 45 180 C75 190, 115 175, 130 125 Z"
            fill="currentColor"
            className="botanical-leaf-blade"
          />
        </g>
      </svg>

      {/* ── 3. Lower-Right Botanical Branch (Around buttons / About section) ── */}
      <svg
        className="botanical-leaf botanical-leaf--lower-right"
        viewBox="0 0 340 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="botanical-branch">
          {/* Stem arching inward from bottom right */}
          <path
            d="M360 380 C310 320, 250 250, 190 170 C140 100, 90 50, 30 10"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="botanical-stem"
          />
          {/* Leaf 1 - upper tip */}
          <path
            d="M70 45 C45 20, 10 15, -10 35 C-5 65, 25 80, 70 45 Z"
            fill="currentColor"
            className="botanical-leaf-blade"
          />
          <path d="M68 46 C35 34, 10 32, -8 36" stroke="currentColor" strokeWidth="1" opacity="0.6" />

          {/* Leaf 2 - reaching inward left */}
          <path
            d="M110 95 C65 75, 15 95, 0 135 C35 155, 85 145, 110 95 Z"
            fill="currentColor"
            className="botanical-leaf-blade"
          />
          <path d="M108 97 C60 92, 22 108, 2 133" stroke="currentColor" strokeWidth="1" opacity="0.6" />

          {/* Leaf 3 - upper right side blade */}
          <path
            d="M150 120 C185 85, 235 95, 255 130 C225 155, 175 155, 150 120 Z"
            fill="currentColor"
            className="botanical-leaf-blade"
          />
          <path d="M152 122 C195 110, 230 115, 253 129" stroke="currentColor" strokeWidth="1" opacity="0.6" />

          {/* Leaf 4 - central large leaf */}
          <path
            d="M170 175 C120 155, 60 185, 45 235 C85 260, 145 245, 170 175 Z"
            fill="currentColor"
            className="botanical-leaf-blade"
          />
          <path d="M168 177 C115 178, 70 200, 48 233" stroke="currentColor" strokeWidth="1" opacity="0.6" />

          {/* Leaf 5 - right flourish */}
          <path
            d="M215 210 C260 180, 310 195, 330 235 C295 260, 245 255, 215 210 Z"
            fill="currentColor"
            className="botanical-leaf-blade"
          />
          <path d="M217 212 C265 204, 305 212, 328 233" stroke="currentColor" strokeWidth="1" opacity="0.6" />

          {/* Leaf 6 - lower blade */}
          <path
            d="M230 270 C180 260, 130 300, 120 345 C160 365, 215 345, 230 270 Z"
            fill="currentColor"
            className="botanical-leaf-blade"
          />
          <path d="M228 273 C180 282, 145 310, 123 343" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        </g>
      </svg>

      {/* ── 4. Bottom-Left Botanical Accent (Beside About section) ── */}
      <svg
        className="botanical-leaf botanical-leaf--bottom-left"
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="botanical-branch">
          <path
            d="M-30 290 C20 240, 70 180, 130 120 C180 70, 230 30, 270 -10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="botanical-stem"
          />
          <path
            d="M40 220 C20 180, 45 135, 85 125 C105 160, 90 205, 40 220 Z"
            fill="currentColor"
            className="botanical-leaf-blade"
          />
          <path
            d="M95 165 C75 125, 105 80, 145 70 C165 105, 145 150, 95 165 Z"
            fill="currentColor"
            className="botanical-leaf-blade"
          />
          <path
            d="M150 110 C130 70, 160 25, 200 15 C220 50, 200 95, 150 110 Z"
            fill="currentColor"
            className="botanical-leaf-blade"
          />
        </g>
      </svg>
    </div>
  );
}
