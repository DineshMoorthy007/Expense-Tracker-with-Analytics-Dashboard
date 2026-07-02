import { FormEvent, useDeferredValue, useEffect, useState } from 'react';
import { EmptyState } from '@/components/EmptyState';
import { createExpense, deleteExpense, getExpenses, updateExpense } from '@/services/expenseApi';
import { getCategories } from '@/services/categoryApi';
import type { Category, ExpenseItem } from '@/types';

type ExpenseFormState = {
  title: string;
  amount: string;
  categoryId: string;
};

const EMPTY_FORM = {
  title: '',
  amount: '',
  categoryId: '',
};

function currency(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function ExpensesPage() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [formState, setFormState] = useState<ExpenseFormState>(EMPTY_FORM);
  const [selectedExpenseId, setSelectedExpenseId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const deferredSearch = useDeferredValue(search);

  const refresh = async () => {
    const [nextExpenses, nextCategories] = await Promise.all([getExpenses(), getCategories()]);
    setExpenses(nextExpenses);
    setCategories(nextCategories);
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        await refresh();
      } catch {
        setError('Unable to load expenses right now.');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const visibleExpenses = expenses.filter((expense) => {
    const query = deferredSearch.trim().toLowerCase();
    const matchesSearch = query ? expense.title.toLowerCase().includes(query) : true;
    const matchesCategory = categoryFilter === 'all' ? true : expense.category === categoryFilter;
    const matchesFrom = dateFrom ? expense.date >= dateFrom : true;
    const matchesTo = dateTo ? expense.date <= dateTo : true;

    return matchesSearch && matchesCategory && matchesFrom && matchesTo;
  });

  const resetForm = () => {
    setFormState(EMPTY_FORM);
    setSelectedExpenseId(null);
  };

  const beginEdit = (expense: ExpenseItem) => {
    setSelectedExpenseId(expense.id);
    setFormState({
      title: expense.title,
      amount: expense.amount.toString(),
      categoryId: '',
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (selectedExpenseId) {
        await updateExpense({
          id: selectedExpenseId,
          title: formState.title,
          amount: Number(formState.amount),
        });
      } else {
        await createExpense({
          title: formState.title,
          amount: Number(formState.amount),
          categoryId: Number(formState.categoryId),
        });
      }

      await refresh();
      resetForm();
    } catch {
      setError('Unable to save expense. Verify the details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Delete this expense?');
    if (!confirmed) {
      return;
    }

    try {
      await deleteExpense(id);
      await refresh();
    } catch {
      setError('Unable to delete expense.');
    }
  };

  return (
    <div className="page-stack">
      <section className="section-heading">
        <div>
          <p className="eyebrow">Expenses</p>
          <h1>Manage every transaction</h1>
        </div>
        <button className="button button-secondary" type="button" onClick={resetForm}>
          New expense
        </button>
      </section>

      {error ? <div className="form-message error">{error}</div> : null}
      {loading ? <div className="loading-card">Loading expenses...</div> : null}

      <section className="panel filter-panel">
        <label>
          <span>Search</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search titles" />
        </label>
        <label>
          <span>Category</span>
          <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>From</span>
          <input value={dateFrom} onChange={(event) => setDateFrom(event.target.value)} type="date" />
        </label>
        <label>
          <span>To</span>
          <input value={dateTo} onChange={(event) => setDateTo(event.target.value)} type="date" />
        </label>
      </section>

      <section className="expenses-layout">
        <article className="panel table-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">List</p>
              <h2>All expenses</h2>
            </div>
            <span className="pill">{visibleExpenses.length} items</span>
          </div>

          {visibleExpenses.length > 0 ? (
            <div className="expense-list">
              {visibleExpenses.map((expense) => (
                <div className="expense-row" key={expense.id}>
                  <div>
                    <strong>{expense.title}</strong>
                    <p>{expense.category}</p>
                  </div>
                  <div>
                    <strong>{currency(expense.amount)}</strong>
                    <p>{expense.date}</p>
                  </div>
                  <div className="expense-actions">
                    <button className="button button-secondary" type="button" onClick={() => beginEdit(expense)}>
                      Edit
                    </button>
                    <button className="button button-danger" type="button" onClick={() => handleDelete(expense.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="No expenses found" message="Adjust the filters or add a new expense." />
          )}
        </article>

        <article className="panel form-panel-inline">
          <div className="panel-header">
            <div>
              <p className="eyebrow">{selectedExpenseId ? 'Edit expense' : 'Create expense'}</p>
              <h2>{selectedExpenseId ? 'Update transaction' : 'Add transaction'}</h2>
            </div>
          </div>

          <form className="stack-form" onSubmit={handleSubmit}>
            <label>
              <span>Title</span>
              <input
                value={formState.title}
                onChange={(event) => setFormState({ ...formState, title: event.target.value })}
                required
              />
            </label>
            <label>
              <span>Amount</span>
              <input
                value={formState.amount}
                onChange={(event) => setFormState({ ...formState, amount: event.target.value })}
                type="number"
                min="0"
                step="0.01"
                required
              />
            </label>

            {selectedExpenseId ? null : (
              <label>
                <span>Category</span>
                <select
                  value={formState.categoryId}
                  onChange={(event) => setFormState({ ...formState, categoryId: event.target.value })}
                  required
                >
                  <option value="">Choose a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <div className="button-row">
              <button className="button button-primary" type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : selectedExpenseId ? 'Update expense' : 'Create expense'}
              </button>
              <button className="button button-secondary" type="button" onClick={resetForm}>
                Clear
              </button>
            </div>
          </form>

          <p className="helper-copy">
            Edit mode only changes title and amount because the backend update contract is param-based.
          </p>
        </article>
      </section>
    </div>
  );
}