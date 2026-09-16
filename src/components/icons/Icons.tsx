/**
 * Small inline SVG icon set for the login screen.
 * Hand-authored (Feather/Lucide-style) — Figma vector paths weren't
 * exported by the design tool, only fill colors, so these are close
 * visual equivalents rather than 1:1 traced paths.
 */
import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
};

export function LeafIcon({ size = 24, color = '#1A1C1C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 13c0-6 5-10 15-10 0 10-4 15-10 15-3 0-5-1-5-1z"
        fill={color}
      />
      <Path
        d="M4 20c3-5 7-8 15-9"
        stroke="#FFFFFF"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function MailIcon({ size = 17, color = '#46464B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 16" fill="none">
      <Rect
        x={1}
        y={1}
        width={18}
        height={14}
        rx={2}
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M1.5 2 10 9l8.5-7"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LockIcon({ size = 13, color = '#46464B' }: IconProps) {
  return (
    <Svg width={size} height={size * 1.35} viewBox="0 0 16 21" fill="none">
      <Rect
        x={1}
        y={9}
        width={14}
        height={11}
        rx={2.5}
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M4 9V6a4 4 0 0 1 8 0v3"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function EyeIcon({
  size = 18,
  color = '#46464B',
  open = true,
}: IconProps & { open?: boolean }) {
  if (!open) {
    return (
      <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <Path
          d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z"
          stroke={color}
          strokeWidth={1.5}
        />
        <Path d="M2 2l16 16" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      </Svg>
    );
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z"
        stroke={color}
        strokeWidth={1.5}
      />
      <Circle cx={10} cy={10} r={2.5} stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

export function ArrowRightIcon({ size = 12, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M2 8h12M9 3l5 5-5 5"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function FaceIdIcon({ size = 15, color = '#1A1C1C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 8V6a2 2 0 0 1 2-2h2M18 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M6 20H4a2 2 0 0 1-2-2v-2"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <Circle cx={9} cy={10} r={1} fill={color} />
      <Circle cx={15} cy={10} r={1} fill={color} />
      <Path
        d="M9 15c1 1 5 1 6 0"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function AppleIcon({ size = 20, color = '#1A1C1C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.7 12.7c0-2.6 2.1-3.9 2.2-4-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.3 2.6 1.3-.1 1.8-.9 3.4-.9s2 .9 3.3.8c1.4 0 2.3-1.2 3.1-2.5.7-1 1-2 1.5-3.2-3-.9-3-4.5-2.9-3.5z"
        fill={color}
      />
      <Path
        d="M13.9 4.5c.6-.8 1-1.9.9-3-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.8-1 2.9 1.1.1 2.1-.5 2.7-1.3z"
        fill={color}
      />
    </Svg>
  );
}

export function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M19.8 10.2c0-.7-.1-1.4-.2-2H10v3.8h5.5c-.2 1.3-1 2.4-2.1 3.1v2.6h3.4c2-1.8 3-4.5 3-7.5z"
        fill="#4285F4"
      />
      <Path
        d="M10 20c2.7 0 5-.9 6.7-2.4l-3.4-2.6c-.9.6-2 1-3.3 1-2.6 0-4.7-1.7-5.5-4.1H1v2.7C2.7 17.8 6.1 20 10 20z"
        fill="#34A853"
      />
      <Path
        d="M4.5 12c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V5.3H1a10 10 0 0 0 0 9.4l3.5-2.7z"
        fill="#FBBC05"
      />
      <Path
        d="M10 3.9c1.5 0 2.8.5 3.8 1.5l2.9-2.8C15 .9 12.7 0 10 0 6.1 0 2.7 2.2 1 5.3l3.5 2.7C5.3 5.6 7.4 3.9 10 3.9z"
        fill="#EA4335"
      />
    </Svg>
  );
}

export function PasskeyIcon({ size = 16, color = '#1A1C1C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle cx={8} cy={6} r={3.2} stroke={color} strokeWidth={1.5} />
      <Path
        d="M8 9.2v9.3M5.5 15h5M5.5 17h5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * Home screen icon set — traced 1:1 from the Figma vector exports
 * (get_screenshot SVG), not hand-approximated.
 */

export function SearchIcon({ size = 17, color = '#1A1C1C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 17 17" fill="none">
      <Path
        d="M15.2167 16.5L9.44167 10.725C8.98333 11.0917 8.45625 11.3819 7.86042 11.5958C7.26458 11.8097 6.63056 11.9167 5.95833 11.9167C4.29306 11.9167 2.88368 11.3399 1.73021 10.1865C0.576736 9.03299 0 7.62361 0 5.95833C0 4.29306 0.576736 2.88368 1.73021 1.73021C2.88368 0.576736 4.29306 0 5.95833 0C7.62361 0 9.03299 0.576736 10.1865 1.73021C11.3399 2.88368 11.9167 4.29306 11.9167 5.95833C11.9167 6.63056 11.8097 7.26458 11.5958 7.86042C11.3819 8.45625 11.0917 8.98333 10.725 9.44167L16.5 15.2167L15.2167 16.5ZM5.95833 10.0833C7.10417 10.0833 8.07812 9.68229 8.88021 8.88021C9.68229 8.07812 10.0833 7.10417 10.0833 5.95833C10.0833 4.8125 9.68229 3.83854 8.88021 3.03646C8.07812 2.23438 7.10417 1.83333 5.95833 1.83333C4.8125 1.83333 3.83854 2.23438 3.03646 3.03646C2.23438 3.83854 1.83333 4.8125 1.83333 5.95833C1.83333 7.10417 2.23438 8.07812 3.03646 8.88021C3.83854 9.68229 4.8125 10.0833 5.95833 10.0833Z"
        fill={color}
      />
    </Svg>
  );
}

export function CloseIcon({ size = 10, color = '#46464B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <Path
        d="M0.933333 9.33333L0 8.4L3.73333 4.66667L0 0.933333L0.933333 0L4.66667 3.73333L8.4 0L9.33333 0.933333L5.6 4.66667L9.33333 8.4L8.4 9.33333L4.66667 5.6L0.933333 9.33333Z"
        fill={color}
      />
    </Svg>
  );
}

export function MicIcon({ size = 12, color = '#1A1C1C' }: IconProps) {
  return (
    <Svg width={size} height={size * 1.6} viewBox="0 0 12 16" fill="none">
      <Path
        d="M5.83333 10C5.13889 10 4.54861 9.75694 4.0625 9.27083C3.57639 8.78472 3.33333 8.19444 3.33333 7.5V2.5C3.33333 1.80556 3.57639 1.21528 4.0625 0.729167C4.54861 0.243056 5.13889 0 5.83333 0C6.52778 0 7.11806 0.243056 7.60417 0.729167C8.09028 1.21528 8.33333 1.80556 8.33333 2.5V7.5C8.33333 8.19444 8.09028 8.78472 7.60417 9.27083C7.11806 9.75694 6.52778 10 5.83333 10ZM5 15.8333V13.2708C3.55556 13.0764 2.36111 12.4306 1.41667 11.3333C0.472222 10.2361 0 8.95833 0 7.5H1.66667C1.66667 8.65278 2.07292 9.63542 2.88542 10.4479C3.69792 11.2604 4.68056 11.6667 5.83333 11.6667C6.98611 11.6667 7.96875 11.2604 8.78125 10.4479C9.59375 9.63542 10 8.65278 10 7.5H11.6667C11.6667 8.95833 11.1944 10.2361 10.25 11.3333C9.30556 12.4306 8.11111 13.0764 6.66667 13.2708V15.8333H5ZM5.83333 8.33333C6.06944 8.33333 6.26736 8.25347 6.42708 8.09375C6.58681 7.93403 6.66667 7.73611 6.66667 7.5V2.5C6.66667 2.26389 6.58681 2.06597 6.42708 1.90625C6.26736 1.74653 6.06944 1.66667 5.83333 1.66667C5.59722 1.66667 5.39931 1.74653 5.23958 1.90625C5.07986 2.06597 5 2.26389 5 2.5V7.5C5 7.73611 5.07986 7.93403 5.23958 8.09375C5.39931 8.25347 5.59722 8.33333 5.83333 8.33333Z"
        fill={color}
      />
    </Svg>
  );
}

export function HeartIcon({ size = 15, color = '#46464B' }: IconProps) {
  return (
    <Svg width={size} height={size * 0.933} viewBox="0 0 15 14" fill="none">
      <Path
        d="M7.5 13.7625L6.4125 12.7875C5.15 11.65 4.10625 10.6687 3.28125 9.84375C2.45625 9.01875 1.8 8.27812 1.3125 7.62187C0.825 6.96562 0.484375 6.3625 0.290625 5.8125C0.096875 5.2625 0 4.7 0 4.125C0 2.95 0.39375 1.96875 1.18125 1.18125C1.96875 0.39375 2.95 0 4.125 0C4.775 0 5.39375 0.1375 5.98125 0.4125C6.56875 0.6875 7.075 1.075 7.5 1.575C7.925 1.075 8.43125 0.6875 9.01875 0.4125C9.60625 0.1375 10.225 0 10.875 0C12.05 0 13.0312 0.39375 13.8188 1.18125C14.6063 1.96875 15 2.95 15 4.125C15 4.7 14.9031 5.2625 14.7094 5.8125C14.5156 6.3625 14.175 6.96562 13.6875 7.62187C13.2 8.27812 12.5437 9.01875 11.7188 9.84375C10.8938 10.6687 9.85 11.65 8.5875 12.7875L7.5 13.7625Z"
        fill={color}
      />
    </Svg>
  );
}

export function WishlistIcon({ size = 19, color = '#1A1C1C' }: IconProps) {
  return (
    <Svg width={size} height={size * 0.895} viewBox="0 0 19 17" fill="none">
      <Path
        d="M9.16667 16.8208L7.8375 15.6292C6.29444 14.2389 5.01875 13.0396 4.01042 12.0312C3.00208 11.0229 2.2 10.1177 1.60417 9.31563C1.00833 8.51354 0.592014 7.77639 0.355208 7.10417C0.118403 6.43194 0 5.74444 0 5.04167C0 3.60556 0.48125 2.40625 1.44375 1.44375C2.40625 0.48125 3.60556 0 5.04167 0C5.83611 0 6.59236 0.168056 7.31042 0.504167C8.02847 0.840278 8.64722 1.31389 9.16667 1.925C9.68611 1.31389 10.3049 0.840278 11.0229 0.504167C11.741 0.168056 12.4972 0 13.2917 0C14.7278 0 15.9271 0.48125 16.8896 1.44375C17.8521 2.40625 18.3333 3.60556 18.3333 5.04167C18.3333 5.74444 18.2149 6.43194 17.9781 7.10417C17.7413 7.77639 17.325 8.51354 16.7292 9.31563C16.1333 10.1177 15.3313 11.0229 14.3229 12.0312C13.3146 13.0396 12.0389 14.2389 10.4958 15.6292L9.16667 16.8208Z"
        fill={color}
      />
    </Svg>
  );
}

export function BagIcon({ size = 15, color = '#1A1C1C' }: IconProps) {
  return (
    <Svg width={size} height={size * 1.267} viewBox="0 0 15 19" fill="none">
      <Path
        d="M1.83333 18.3333C1.32917 18.3333 0.897569 18.1538 0.538542 17.7948C0.179514 17.4358 0 17.0042 0 16.5V5.5C0 4.99583 0.179514 4.56424 0.538542 4.20521C0.897569 3.84618 1.32917 3.66667 1.83333 3.66667H3.66667C3.66667 2.65833 4.02569 1.79514 4.74375 1.07708C5.46181 0.359028 6.325 0 7.33333 0C8.34167 0 9.20486 0.359028 9.92292 1.07708C10.641 1.79514 11 2.65833 11 3.66667H12.8333C13.3375 3.66667 13.7691 3.84618 14.1281 4.20521C14.4872 4.56424 14.6667 4.99583 14.6667 5.5V16.5C14.6667 17.0042 14.4872 17.4358 14.1281 17.7948C13.7691 18.1538 13.3375 18.3333 12.8333 18.3333H1.83333ZM1.83333 16.5H12.8333V5.5H11V7.33333C11 7.59306 10.9122 7.81076 10.7365 7.98646C10.5608 8.16215 10.3431 8.25 10.0833 8.25C9.82361 8.25 9.6059 8.16215 9.43021 7.98646C9.25451 7.81076 9.16667 7.59306 9.16667 7.33333V5.5H5.5V7.33333C5.5 7.59306 5.41215 7.81076 5.23646 7.98646C5.06076 8.16215 4.84306 8.25 4.58333 8.25C4.32361 8.25 4.1059 8.16215 3.93021 7.98646C3.75451 7.81076 3.66667 7.59306 3.66667 7.33333V5.5H1.83333V16.5ZM5.5 3.66667H9.16667C9.16667 3.1625 8.98715 2.7309 8.62813 2.37188C8.2691 2.01285 7.8375 1.83333 7.33333 1.83333C6.82917 1.83333 6.39757 2.01285 6.03854 2.37188C5.67951 2.7309 5.5 3.1625 5.5 3.66667Z"
        fill={color}
      />
    </Svg>
  );
}

export function CartIcon({ size = 16, color = '#46464B' }: IconProps) {
  return (
    <Svg width={size} height={size * 1.25} viewBox="0 0 16 20" fill="none">
      <Path
        d="M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V6C0 5.45 0.195833 4.97917 0.5875 4.5875C0.979167 4.19583 1.45 4 2 4H4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4H14C14.55 4 15.0208 4.19583 15.4125 4.5875C15.8042 4.97917 16 5.45 16 6V18C16 18.55 15.8042 19.0208 15.4125 19.4125C15.0208 19.8042 14.55 20 14 20H2ZM2 18H14V6H12V8C12 8.28333 11.9042 8.52083 11.7125 8.7125C11.5208 8.90417 11.2833 9 11 9C10.7167 9 10.4792 8.90417 10.2875 8.7125C10.0958 8.52083 10 8.28333 10 8V6H6V8C6 8.28333 5.90417 8.52083 5.7125 8.7125C5.52083 8.90417 5.28333 9 5 9C4.71667 9 4.47917 8.90417 4.2875 8.7125C4.09583 8.52083 4 8.28333 4 8V6H2V18ZM6 4H10C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4Z"
        fill={color}
      />
    </Svg>
  );
}

export function ShopIcon({ size = 20, color = '#46464B' }: IconProps) {
  return (
    <Svg width={size} height={size * 0.857} viewBox="0 0 21 18" fill="none">
      <Path
        d="M19.0469 8.05V16C19.0469 16.55 18.8511 17.0208 18.4594 17.4125C18.0678 17.8042 17.5969 18 17.0469 18H3.04694C2.49694 18 2.02611 17.8042 1.63444 17.4125C1.24277 17.0208 1.04694 16.55 1.04694 16V8.05C0.663605 7.7 0.367772 7.25 0.159439 6.7C-0.0488946 6.15 -0.0530612 5.55 0.146939 4.9L1.19694 1.5C1.33027 1.06667 1.56777 0.708333 1.90944 0.425C2.25111 0.141667 2.64694 0 3.09694 0H16.9969C17.4469 0 17.8386 0.1375 18.1719 0.4125C18.5053 0.6875 18.7469 1.05 18.8969 1.5L19.9469 4.9C20.1469 5.55 20.1428 6.14167 19.9344 6.675C19.7261 7.20833 19.4303 7.66667 19.0469 8.05ZM12.2469 7C12.6969 7 13.0386 6.84583 13.2719 6.5375C13.5053 6.22917 13.5969 5.88333 13.5469 5.5L12.9969 2H11.0469V5.7C11.0469 6.05 11.1636 6.35417 11.3969 6.6125C11.6303 6.87083 11.9136 7 12.2469 7ZM7.74694 7C8.13027 7 8.44277 6.87083 8.68444 6.6125C8.92611 6.35417 9.04694 6.05 9.04694 5.7V2H7.09694L6.54694 5.5C6.48027 5.9 6.56777 6.25 6.80944 6.55C7.05111 6.85 7.36361 7 7.74694 7ZM3.29694 7C3.59694 7 3.85944 6.89167 4.08444 6.675C4.30944 6.45833 4.44694 6.18333 4.49694 5.85L5.04694 2H3.09694L2.09694 5.35C1.99694 5.68333 2.05111 6.04167 2.25944 6.425C2.46777 6.80833 2.81361 7 3.29694 7ZM16.7969 7C17.2803 7 17.6303 6.80833 17.8469 6.425C18.0636 6.04167 18.1136 5.68333 17.9969 5.35L16.9469 2H15.0469L15.5969 5.85C15.6469 6.18333 15.7844 6.45833 16.0094 6.675C16.2344 6.89167 16.4969 7 16.7969 7ZM3.04694 16H17.0469V8.95C16.9636 8.98333 16.9094 9 16.8844 9C16.8594 9 16.8303 9 16.7969 9C16.3469 9 15.9511 8.925 15.6094 8.775C15.2678 8.625 14.9303 8.38333 14.5969 8.05C14.2969 8.35 13.9553 8.58333 13.5719 8.75C13.1886 8.91667 12.7803 9 12.3469 9C11.8969 9 11.4761 8.91667 11.0844 8.75C10.6928 8.58333 10.3469 8.35 10.0469 8.05C9.76361 8.35 9.43444 8.58333 9.05944 8.75C8.68444 8.91667 8.28027 9 7.84694 9C7.36361 9 6.92611 8.91667 6.53444 8.75C6.14277 8.58333 5.79694 8.35 5.49694 8.05C5.14694 8.4 4.80111 8.64583 4.45944 8.7875C4.11777 8.92917 3.73027 9 3.29694 9C3.26361 9 3.22611 9 3.18444 9C3.14277 9 3.09694 8.98333 3.04694 8.95V16Z"
        fill={color}
      />
    </Svg>
  );
}

export function ExploreIcon({ size = 20, color = '#46464B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M5.5 14.5L12.5 12.5L14.5 5.5L7.5 7.5L5.5 14.5ZM10 11.5C9.58333 11.5 9.22917 11.3542 8.9375 11.0625C8.64583 10.7708 8.5 10.4167 8.5 10C8.5 9.58333 8.64583 9.22917 8.9375 8.9375C9.22917 8.64583 9.58333 8.5 10 8.5C10.4167 8.5 10.7708 8.64583 11.0625 8.9375C11.3542 9.22917 11.5 9.58333 11.5 10C11.5 10.4167 11.3542 10.7708 11.0625 11.0625C10.7708 11.3542 10.4167 11.5 10 11.5ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2167 18 14.1042 17.2208 15.6625 15.6625C17.2208 14.1042 18 12.2167 18 10C18 7.78333 17.2208 5.89583 15.6625 4.3375C14.1042 2.77917 12.2167 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 12.2167 2.77917 14.1042 4.3375 15.6625C5.89583 17.2208 7.78333 18 10 18Z"
        fill={color}
      />
    </Svg>
  );
}

export function BookmarkIcon({ size = 14, color = '#46464B' }: IconProps) {
  return (
    <Svg width={size} height={size * 1.286} viewBox="0 0 14 18" fill="none">
      <Path
        d="M0 18V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H12C12.55 0 13.0208 0.195833 13.4125 0.5875C13.8042 0.979167 14 1.45 14 2V18L7 15L0 18ZM2 14.95L7 12.8L12 14.95V2H2V14.95Z"
        fill={color}
      />
    </Svg>
  );
}

export function UserIcon({ size = 16, color = '#46464B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0Z"
        fill={color}
      />
    </Svg>
  );
}

export function FilterIcon({ size = 14, color = '#AB3425' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path
        d="M6 13.5V9H7.5V10.5H13.5V12H7.5V13.5H6ZM0 12V10.5H4.5V12H0ZM3 9V7.5H0V6H3V4.5H4.5V9H3ZM6 7.5V6H13.5V7.5H6ZM9 4.5V0H10.5V1.5H13.5V3H10.5V4.5H9ZM0 3V1.5H7.5V3H0Z"
        fill={color}
      />
    </Svg>
  );
}

export function ChevronDownIcon({ size = 9, color = '#46464B' }: IconProps) {
  return (
    <Svg width={size} height={size * 0.667} viewBox="0 0 9 6" fill="none">
      <Path d="M4.5 5.55L0 1.05L1.05 0L4.5 3.45L7.95 0L9 1.05L4.5 5.55Z" fill={color} />
    </Svg>
  );
}

export function ChevronRightIcon({ size = 11, color = '#1A1C1C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 11 11" fill="none">
      <Path
        d="M8.11667 6H0V4.66667H8.11667L4.38333 0.933333L5.33333 0L10.6667 5.33333L5.33333 10.6667L4.38333 9.73333L8.11667 6Z"
        fill={color}
      />
    </Svg>
  );
}

export function GridIcon({ size = 14, color = '#1A1C1C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path
        d="M0 6V0H6V6H0ZM0 13.5V7.5H6V13.5H0ZM7.5 6V0H13.5V6H7.5ZM7.5 13.5V7.5H13.5V13.5H7.5ZM1.5 4.5H4.5V1.5H1.5V4.5ZM9 4.5H12V1.5H9V4.5ZM9 12H12V9H9V12ZM1.5 12H4.5V9H1.5V12Z"
        fill={color}
      />
    </Svg>
  );
}

export function ListIcon({ size = 14, color = '#46464B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path
        d="M1.5 6C1.0875 6 0.734375 5.85312 0.440625 5.55937C0.146875 5.26562 0 4.9125 0 4.5V1.5C0 1.0875 0.146875 0.734375 0.440625 0.440625C0.734375 0.146875 1.0875 0 1.5 0H12C12.4125 0 12.7656 0.146875 13.0594 0.440625C13.3531 0.734375 13.5 1.0875 13.5 1.5V4.5C13.5 4.9125 13.3531 5.26562 13.0594 5.55937C12.7656 5.85312 12.4125 6 12 6H1.5ZM1.5 4.5H12V1.5H1.5V4.5ZM1.5 13.5C1.0875 13.5 0.734375 13.3531 0.440625 13.0594C0.146875 12.7656 0 12.4125 0 12V9C0 8.5875 0.146875 8.23438 0.440625 7.94063C0.734375 7.64688 1.0875 7.5 1.5 7.5H12C12.4125 7.5 12.7656 7.64688 13.0594 7.94063C13.3531 8.23438 13.5 8.5875 13.5 9V12C13.5 12.4125 13.3531 12.7656 13.0594 13.0594C12.7656 13.3531 12.4125 13.5 12 13.5H1.5ZM1.5 12H12V9H1.5V12Z"
        fill={color}
      />
    </Svg>
  );
}

export function StarIcon({ size = 12, color = '#AB3425' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <Path
        d="M2.23125 11.0833L3.17917 6.98542L0 4.22917L4.2 3.86458L5.83333 0L7.46667 3.86458L11.6667 4.22917L8.4875 6.98542L9.43542 11.0833L5.83333 8.91042L2.23125 11.0833Z"
        fill={color}
      />
    </Svg>
  );
}

export function PlusIcon({ size = 11, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 11 11" fill="none">
      <Path d="M4.5 6H0V4.5H4.5V0H6V4.5H10.5V6H6V10.5H4.5V6Z" fill={color} />
    </Svg>
  );
}

/**
 * Product detail screen icon set — hand-approximated (Feather-style),
 * same rationale as the login set: Figma vector paths aren't exported,
 * only fill colors and bounding boxes.
 */

export function ArrowLeftIcon({ size = 16, color = '#1A1C1C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M14 8H2M7 3L2 8l5 5"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function HeartOutlineIcon({ size = 17, color = '#1A1C1C' }: IconProps) {
  return (
    <Svg width={size} height={size * 0.933} viewBox="0 0 15 14" fill="none">
      <Path
        d="M7.5 13.2L6.5 12.3C3 9.1 0.7 7 0.7 4.4 0.7 2.3 2.3 0.7 4.4 0.7 5.6 0.7 6.7 1.3 7.5 2.2 8.3 1.3 9.4 0.7 10.6 0.7 12.7 0.7 14.3 2.3 14.3 4.4 14.3 7 12 9.1 8.5 12.3L7.5 13.2Z"
        stroke={color}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ShareIcon({ size = 16, color = '#1A1C1C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Circle cx={12.5} cy={3.5} r={1.8} stroke={color} strokeWidth={1.3} />
      <Circle cx={12.5} cy={12.5} r={1.8} stroke={color} strokeWidth={1.3} />
      <Circle cx={3.5} cy={8} r={1.8} stroke={color} strokeWidth={1.3} />
      <Path
        d="M5.1 7.1L10.9 4.4M5.1 8.9L10.9 11.6"
        stroke={color}
        strokeWidth={1.3}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function ArCameraIcon({ size = 16, color = '#AB3425' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M1 4.5V2.5A1.5 1.5 0 0 1 2.5 1h2M15 4.5V2.5A1.5 1.5 0 0 0 13.5 1h-2M1 11.5V13.5A1.5 1.5 0 0 0 2.5 15h2M15 11.5V13.5A1.5 1.5 0 0 1 13.5 15h-2"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <Circle cx={8} cy={8} r={2.6} stroke={color} strokeWidth={1.4} />
    </Svg>
  );
}

export function ShieldCheckIcon({ size = 12, color = '#AB3425' }: IconProps) {
  return (
    <Svg width={size} height={size * 1.25} viewBox="0 0 12 15" fill="none">
      <Path
        d="M6 0.7 11.3 2.6V7C11.3 10.3 9.1 12.9 6 14.3 2.9 12.9 0.7 10.3 0.7 7V2.6L6 0.7Z"
        stroke={color}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      <Path
        d="M3.8 7.2L5.3 8.7L8.3 5.5"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CheckCircleIcon({ size = 15, color = '#AB3425' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 15 15" fill="none">
      <Circle cx={7.5} cy={7.5} r={6.8} stroke={color} strokeWidth={1.3} />
      <Path
        d="M4.7 7.6L6.5 9.4L10.3 5.6"
        stroke={color}
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function VerifiedIcon({ size = 13, color = '#34A853' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 13 13" fill="none">
      <Circle cx={6.5} cy={6.5} r={5.8} stroke={color} strokeWidth={1.2} />
      <Path
        d="M4 6.6L5.7 8.3L9 4.7"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PurchaseTagIcon({ size = 10, color = '#76777B' }: IconProps) {
  return (
    <Svg width={size} height={size * 1.15} viewBox="0 0 10 11.5" fill="none">
      <Path
        d="M2.2 3.2H7.8L8.5 10.5H1.5L2.2 3.2Z"
        stroke={color}
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
      <Path d="M3.4 3V2A1.6 1.6 0 0 1 6.6 2V3" stroke={color} strokeWidth={1.1} />
    </Svg>
  );
}

export function MinusIcon({ size = 11, color = '#1A1C1C' }: IconProps) {
  return (
    <Svg width={size} height={size * 0.13} viewBox="0 0 11 1.4" fill="none">
      <Path d="M0 0.7H11" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    </Svg>
  );
}

export function InfoIcon({ size = 15, color = '#8A1C10' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 15 15" fill="none">
      <Circle cx={7.5} cy={7.5} r={6.8} stroke={color} strokeWidth={1.3} />
      <Circle cx={7.5} cy={4.7} r={0.9} fill={color} />
      <Path d="M7.5 7V11" stroke={color} strokeWidth={1.3} strokeLinecap="round" />
    </Svg>
  );
}

/**
 * Cart screen icon set — hand-approximated (Feather-style), same rationale
 * as the other sets: Figma vector paths aren't exported, only fill colors.
 */

export function TruckIcon({ size = 18, color = '#AB3425' }: IconProps) {
  return (
    <Svg width={size} height={size * 0.727} viewBox="0 0 22 16" fill="none">
      <Path
        d="M1 2h11v9H1V2ZM12 6h4l4 3.5V11h-8V6Z"
        stroke={color}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <Circle cx={5.5} cy={13.5} r={1.8} stroke={color} strokeWidth={1.3} />
      <Circle cx={16.5} cy={13.5} r={1.8} stroke={color} strokeWidth={1.3} />
    </Svg>
  );
}

export function TrashIcon({ size = 12, color = '#76777B' }: IconProps) {
  return (
    <Svg width={size} height={size * 1.15} viewBox="0 0 12 13.8" fill="none">
      <Path
        d="M0.75 3.15H11.25M4.5 0.75H7.5M4.75 6.15V10.35M7.25 6.15V10.35M1.5 3.15L2.1 12C2.13 12.62 2.65 13.05 3.3 13.05H8.7C9.35 13.05 9.87 12.62 9.9 12L10.5 3.15"
        stroke={color}
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function TagIcon({ size = 15, color = '#AB3425' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 15 15" fill="none">
      <Path
        d="M7.1 1H2.5C1.7 1 1 1.7 1 2.5V7.1C1 7.5 1.15 7.85 1.4 8.1L7 13.7C7.3 13.95 7.65 14.1 8 14.1C8.35 14.1 8.7 13.95 9 13.7L13.7 9C13.95 8.7 14.1 8.35 14.1 8V2.5"
        stroke={color}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      <Circle cx={4} cy={4} r={1.1} fill={color} />
    </Svg>
  );
}

export function BoxIcon({ size = 12, color = '#AB3425' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path
        d="M1 4L7 1L13 4V10L7 13L1 10V4Z"
        stroke={color}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      <Path d="M1 4L7 7M7 7L13 4M7 7V13" stroke={color} strokeWidth={1.2} strokeLinejoin="round" />
    </Svg>
  );
}

export function CardIcon({ size = 14, color = '#1A1C1C' }: IconProps) {
  return (
    <Svg width={size} height={size * 0.75} viewBox="0 0 16 12" fill="none">
      <Rect x={0.75} y={0.75} width={14.5} height={10.5} rx={1.5} stroke={color} strokeWidth={1.3} />
      <Path d="M0.75 4.25H15.25" stroke={color} strokeWidth={1.3} />
      <Path d="M2.5 7.5H6" stroke={color} strokeWidth={1.3} strokeLinecap="round" />
    </Svg>
  );
}

export function ReloadIcon({ size = 19, color = '#46464B' }: IconProps) {
  return (
    <Svg width={size} height={size * 0.737} viewBox="0 0 19 14" fill="none">
      <Path
        d="M9.20833 13.3333C7.34722 13.3333 5.76389 12.6875 4.45833 11.3958C3.15278 10.1042 2.5 8.52778 2.5 6.66667V6.52083L1.16667 7.85417L0 6.6875L3.33333 3.35417L6.66667 6.6875L5.5 7.85417L4.16667 6.52083V6.66667C4.16667 8.05556 4.65625 9.23611 5.63542 10.2083C6.61458 11.1806 7.80556 11.6667 9.20833 11.6667C9.56944 11.6667 9.92361 11.625 10.2708 11.5417C10.6181 11.4583 10.9583 11.3333 11.2917 11.1667L12.5417 12.4167C12.0139 12.7222 11.4722 12.9514 10.9167 13.1042C10.3611 13.2569 9.79167 13.3333 9.20833 13.3333ZM15 9.97917L11.6667 6.64583L12.8333 5.47917L14.1667 6.8125V6.66667C14.1667 5.27778 13.6771 4.09722 12.6979 3.125C11.7188 2.15278 10.5278 1.66667 9.125 1.66667C8.76389 1.66667 8.40972 1.70833 8.0625 1.79167C7.71528 1.875 7.375 2 7.04167 2.16667L5.79167 0.916667C6.31944 0.611111 6.86111 0.381944 7.41667 0.229167C7.97222 0.0763889 8.54167 0 9.125 0C10.9861 0 12.5694 0.645833 13.875 1.9375C15.1806 3.22917 15.8333 4.80556 15.8333 6.66667V6.8125L17.1667 5.47917L18.3333 6.64583L15 9.97917Z"
        fill={color}
      />
    </Svg>
  );
}
