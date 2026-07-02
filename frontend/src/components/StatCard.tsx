type StatCardProps = {
  label: string;
  value: string;
  detail: string;
  tone?: 'teal' | 'orange' | 'violet' | 'blue';
};

export function StatCard({ label, value, detail, tone = 'teal' }: StatCardProps) {
  return (
    <article className={`stat-card tone-${tone}`}>
      <p className="eyebrow">{label}</p>
      <h3>{value}</h3>
      <span>{detail}</span>
    </article>
  );
}