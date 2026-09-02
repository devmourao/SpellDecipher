# DOC-003: System Architecture

## 1. Tech Stack
* **Frontend Interface:** React
* **Core Game Engine:** Vanilla TypeScript (Object-Oriented, Platform Agnostic)
* **Backend & Database:** Supabase (PostgreSQL-based BaaS for real-time data and static spell dictionaries)

## 2. Architectural Patterns
* **Clean Architecture:** The core logic (`SpellDecipherGame` class) is strictly isolated from the React DOM. This encapsulation ensures the logic can be easily ported to other scripting environments (like C# or C++) in future game engine projects.
* **Repository Pattern (Resilience):** The word-fetching logic is handled by a dedicated service layer.
    * **Primary Source:** Supabase database fetch (via Supabase JS SDK).
    * **Fallback Source:** Local static dictionary (triggered automatically upon network failure or timeout).

## 3. Testing Strategy (TDD)
* **Testing Framework:** Vitest (or Jest).
* **Coverage Goal:** The Core Engine and Repository Fallback mechanism must have comprehensive unit tests proving their reliability before UI implementation.