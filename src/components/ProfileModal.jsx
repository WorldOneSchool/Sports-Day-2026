import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./ProfileModal.css";

export default function ProfileModal({ open, profile, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    setTimeout(() => modalRef.current?.focus(), 40);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !profile) return null;

  const node = (
    <div
      className="profile-modal-overlay"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="profile-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        tabIndex={-1}
        ref={modalRef}
      >
        <div className="modal-header">
          <div>
            <h4 id="modal-title" className="modal-name">{profile.name}</h4>
            <div className="modal-role">{profile.title}</div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal-body">
          {profile.imgSrc ? (
            <div className="modal-media"><img src={profile.imgSrc} alt={profile.name} /></div>
          ) : null}
          <p id="modal-desc">
            {profile.bio || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae risus quis massa convallis facilisis. For now this is a placeholder biography — replace with a real bio when ready."}
          </p>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(node, document.body);
}