import { useEffect, useState } from 'react';
import {
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { EmptyState } from '@/components/EmptyState';
import { StatCard } from '@/components/StatCard';
import { useAuth } from '@/context/AuthContext';
import { formatMonth } from '@/lib/months';
import { getCategoryAnalytics, getMonthlyAnalytics } from '@/services/analyticsApi';
import { getCategories } from '@/services/categoryApi';
import { getExpenses } from '@/services/expenseApi';
import type { CategoryExpense, ExpenseItem, MonthlyExpense } from '@/types';

const PIE_COLORS = ['#44d7b6', '#6ea8fe', '#ff8a5b', '#f5c35b', '#a98bff', '#ff6b81'];

function normalizeMonthlyData(monthly: MonthlyExpense[]) {
  return Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const entry = monthly.find((item) => item.month === month);

    return {
      month: formatMonth(month),
      total: entry?.total ?? 0,
    };
  });
}

function currency(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function DashboardPage() {
  const { displayName, email } = useAuth();
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [monthly, setMonthly] = useState<MonthlyExpense[]>([]);
  const [categoryAnalytics, setCategoryAnalytics] = useState<CategoryExpense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [nextExpenses, nextCategories, nextMonthly, nextCategoryAnalytics] = await Promise.all([
          getExpenses(),
          getCategories(),
          getMonthlyAnalytics(),
          getCategoryAnalytics(),
        ]);

        setExpenses(nextExpenses);
        setCategories(nextCategories);
        setMonthly(nextMonthly);
        setCategoryAnalytics(nextCategoryAnalytics);
      } catch {
        setError('Unable to load dashboard data right now.');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageExpense = expenses.length ? totalSpent / expenses.length : 0;
  const topCategory = categoryAnalytics.slice().sort((left, right) => right.total - left.total)[0];
  const recentExpense = expenses.slice().sort((left, right) => right.date.localeCompare(left.date))[0];
  const monthlyChartData = normalizeMonthlyData(monthly);

  return (
    <div className="page-stack">
      <section className="hero-banner">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Financial clarity for {displayName ?? email ?? 'your account'}.</h1>
          <p>
            Track the pulse of your spending with live monthly analytics, category concentration, and recent
            expense activity.
          </p>
        </div>
        <div className="hero-orbital">
          <div className="orbital-ring orbital-ring-one" />
          <div className="orbital-ring orbital-ring-two" />
          <div className="orbital-core" />
        </div>
      </section>

      {loading ? <div className="loading-card">Loading analytics...</div> : null}
      {error ? <div className="form-message error">{error}</div> : null}

      <section className="stat-grid">
        <StatCard label="Total spent" value={currency(totalSpent)} detail="Current loaded expenses" tone="teal" />
        <StatCard label="Average expense" value={currency(averageExpense)} detail="Per expense transaction" tone="blue" />
        <StatCard
          label="Top category"
          value={topCategory?.category ?? 'None'}
          detail={topCategory ? currency(topCategory.total) : 'No category data yet'}
          tone="orange"
        />
        <StatCard label="Tracked categories" value={`${categories.length}`} detail="User-owned categories" tone="violet" />
      </section>

      <section className="chart-grid-main">
        <article className="panel chart-panel chart-panel-wide">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Monthly trend</p>
              <h2>Spending over the year</h2>
            </div>
          </div>
          {monthlyChartData.some((item) => item.total > 0) ? (
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={monthlyChartData}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={80} />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#44d7b6" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState title="No monthly data yet" message="Add expenses to populate the trend line." />
          )}
        </article>

        <article className="panel chart-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Categories</p>
              <h2>Spend split</h2>
            </div>
          </div>
          {categoryAnalytics.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={categoryAnalytics}
                  dataKey="total"
                  nameKey="category"
                  innerRadius={72}
                  outerRadius={112}
                  paddingAngle={2}
                >
                  {categoryAnalytics.map((entry, index) => (
                    <Cell key={entry.category} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState title="No category data yet" message="Create expenses to generate a category chart." />
          )}
        </article>
      </section>

      <section className="panel recent-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Recent activity</p>
            <h2>Latest expense</h2>
          </div>
        </div>
        {recentExpense ? (
          <div className="recent-row">
            <div>
              <strong>{recentExpense.title}</strong>
              <p>{recentExpense.category}</p>
            </div>
            <div>
              <strong>{currency(recentExpense.amount)}</strong>
              <p>{recentExpense.date}</p>
            </div>
          </div>
        ) : (
          <EmptyState title="No recent expense" message="Create your first transaction to populate this card." />
        )}
      </section>
    </div>
  );
}