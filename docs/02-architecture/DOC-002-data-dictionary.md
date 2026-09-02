# DOC-002: Data Dictionary

## 1. Database Overview
* **Provider:** Supabase (PostgreSQL)
* **Security Context:** Row Level Security (RLS) must be enabled on all tables. Since this is a client-side web game, anonymous public users will only have `SELECT` (read-only) permissions. 

## 2. Entities & Schema

### Table: `categories`
Stores the thematic categories for the spells (e.g., Mythological Creatures, Board Games).

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | Primary Key, Auto-gen | Unique identifier for the category. |
| `name` | String | Not Null, Unique | Display name of the category. |
| `description` | Text | Nullable | Flavor text or lore for the UI. |
| `created_at` | Timestamptz | Default: `now()` | Record creation timestamp. |

### Table: `spells`
Stores the actual words (spells) the player needs to decipher.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | Primary Key, Auto-gen | Unique identifier for the spell. |
| `category_id` | UUID | Foreign Key | Links the spell to `categories.id`. |
| `word` | String | Not Null | The target word to be guessed (stored in UPPERCASE). |
| `difficulty` | Integer | Default: 1 | Difficulty rating: 1 (Easy), 2 (Medium), 3 (Hard). |
| `created_at` | Timestamptz | Default: `now()` | Record creation timestamp. |

## 3. Relationships
* **One-to-Many:** One `category` can have multiple `spells`.
* **Referential Integrity:** `spells.category_id` references `categories.id` (ON DELETE CASCADE).