import styles from './CategoryFilter.module.css'

interface CategoryFilterProps {
  categories: string[]
  active: string
  onSelect: (category: string) => void
}

export function CategoryFilter({ categories, active, onSelect }: CategoryFilterProps) {
  return (
    <div className={styles.filterRow} role="group" aria-label="Filter by category">
      <button
        type="button"
        className={`${styles.chip} ${active === 'all' ? styles.chipActive : ''}`}
        onClick={() => onSelect('all')}
        aria-pressed={active === 'all'}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          className={`${styles.chip} ${active === cat ? styles.chipActive : ''}`}
          onClick={() => onSelect(cat)}
          aria-pressed={active === cat}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
