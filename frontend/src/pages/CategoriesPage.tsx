import { FormEvent, useEffect, useState } from 'react';
import { EmptyState } from '@/components/EmptyState';
import { createCategory, deleteCategory, getCategories } from '@/services/categoryApi';
import type { Category } from '@/types';

export function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const refresh = async () => {
    const nextCategories = await getCategories();
    setCategories(nextCategories);
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        await refresh();
      } catch {
        setError('Unable to load categories right now.');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await createCategory(name);
      setName('');
      await refresh();
    } catch {
      setError('Unable to create category.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Delete this category?');
    if (!confirmed) {
      return;
    }

    try {
      await deleteCategory(id);
      await refresh();
    } catch {
      setError('Unable to delete category.');
    }
  };

  return (
    <div className="page-stack">
      <section className="section-heading">
        <div>
          <p className="eyebrow">Categories</p>
          <h1>Shape your budget buckets</h1>
        </div>
      </section>

      {error ? <div className="form-message error">{error}</div> : null}
      {loading ? <div className="loading-card">Loading categories...</div> : null}

      <section className="expenses-layout categories-layout">
        <article className="panel form-panel-inline">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Create category</p>
              <h2>Add a new bucket</h2>
            </div>
          </div>

          <form className="stack-form" onSubmit={handleSubmit}>
            <label>
              <span>Name</span>
              <input value={name} onChange={(event) => setName(event.target.value)} required />
            </label>
            <button className="button button-primary" type="submit" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create category'}
            </button>
          </form>
        </article>

        <article className="panel table-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Library</p>
              <h2>Existing categories</h2>
            </div>
            <span className="pill">{categories.length} total</span>
          </div>

          {categories.length > 0 ? (
            <div className="category-grid">
              {categories.map((category) => (
                <div className="category-card" key={category.id}>
                  <div>
                    <strong>{category.name}</strong>
                    <p>ID {category.id}</p>
                  </div>
                  <button className="button button-danger" type="button" onClick={() => handleDelete(category.id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="No categories yet" message="Create your first category to start tracking spending." />
          )}
        </article>
      </section>
    </div>
  );
}