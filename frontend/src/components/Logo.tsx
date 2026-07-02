type LogoProps = {
  size?: number;
  className?: string;
};

export function Logo({ size = 52, className = '' }: LogoProps) {
  return (
    <img
      className={`app-logo ${className}`.trim()}
      src="/favicon.svg"
      alt="Expense Tracker logo"
      width={size}
      height={size}
      loading="eager"
      decoding="async"
    />
  );
}