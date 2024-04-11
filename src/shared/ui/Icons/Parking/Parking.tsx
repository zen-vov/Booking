import { SVGI } from "../Wifi/Wifi";

export default function Parking({ className }: SVGI) {
  return (
    <svg
      width="17"
      className={className}
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="17" height="17" fill="url(#pattern0_2134_872)" />
      <defs>
        <pattern
          id="pattern0_2134_872"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#image0_2134_872" transform="scale(0.01)" />
        </pattern>
        <image
          id="image0_2134_872"
          width="100"
          height="100"
          href="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
