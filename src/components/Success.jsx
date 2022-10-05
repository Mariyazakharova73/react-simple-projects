import React from 'react';

export const Success = ({ count }) => {
  return (
    <div className="success-block">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt="Success." />
      <h3>Успешно!</h3>
      <p>Всем {count} пользователям отправлено приглашение.</p>
      <button onClick={() => window.location.reload()} className="send-invite-btn">
        Назад
      </button>
    </div>
  );
};
