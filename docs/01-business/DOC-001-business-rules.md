# DOC-001: Business Rules & Game Design

## 1. Project Overview
* **Name:** Spell Decipher
* **Genre:** Word Guessing / Puzzle RPG
* **Platform:** Web (Mobile-First)

## 2. Lore & Thematic Context
The player assumes the role of a Warlock, such as "Ignis", bound to a powerful fire-based patron. The objective is to decipher ancient spells hidden within the forbidden grimoires of the House of Obsidian.

## 3. Core Mechanics (Business Rules)
* **BR-001 (Winning Condition):** The player wins the round when all letters of the secret spell are correctly guessed.
* **BR-002 (Losing Condition):** The player loses the round when the "Magical Flames" (HP) drop to zero.
* **BR-003 (Flame Deduction):** The player starts with exactly 5 Magical Flames. Every incorrect letter guess extinguishes 1 flame.
* **BR-004 (Duplicate Guesses):** Guessing the same letter twice (whether correct or incorrect) does not deduct a flame and must be ignored by the engine.
* **BR-005 (Categories):** Spells are grouped by thematic categories (e.g., Mythological Creatures, Magical Artifacts, Board Game Terminology).

* **BR-006 (UX Feedback):** The interface must provide immediate visual feedback on the virtual keyboard. Correctly guessed letters will be highlighted. Incorrectly guessed letters will be visually faded and physically disabled to enforce BR-004 (preventing accidental duplicate inputs).