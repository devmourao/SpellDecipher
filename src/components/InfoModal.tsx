import { X } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfoModal({ isOpen, onClose }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
    
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <h2>About Spell Decipher</h2>
        
        <div className="modal-section">
          <h3>🎮 How to Play</h3>
          <p>Decipher the secret spell by guessing letters. Every wrong guess extinguishes a magical flame. If all flames go out, the spell consumes you!</p>
        </div>

        <div className="modal-section">
          <h3>⚙️ Under the Hood</h3>
          <p>The core game logic runs in pure OOP TypeScript, completely decoupled from the React UI.</p>
          <p>Data is dynamically fetched via API from a <strong>Supabase (PostgreSQL)</strong> cloud database, featuring an offline fallback mechanism.</p>
        </div>

        <div className="modal-footer">
          <p>Engineered by Marcos Mourão</p>
        </div>
      </div>
    </div>
  );
}