import React from 'react';

function TopicCard({ topic, onVote }) {
  const { id, title, forVotes, againstVotes } = topic;
  const total = forVotes + againstVotes;
  const forPercent = total ? Math.round((forVotes / total) * 100) : 0;
  const againstPercent = total ? 100 - forPercent : 0;

  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="vote-buttons">
        <div className="vote flip-card" onClick={() => onVote(id, 'for')}>
          <div className="flip-card-inner">
            <div className="flip-card-front">👍 Vote For</div>
            <div className="flip-card-back">+1 For</div>
          </div>
        </div>
        <div className="vote flip-card" onClick={() => onVote(id, 'against')}>
          <div className="flip-card-inner">
            <div className="flip-card-front">👎 Vote Against</div>
            <div className="flip-card-back">+1 Against</div>
          </div>
        </div>
      </div>
      <div className="progress">
        <div className="progress-bar" style={{ width: `${forPercent}%` }} />
      </div>
      <div className="progress-labels">
        <span>{forPercent}% For</span>
        <span>{againstPercent}% Against</span>
      </div>
    </div>
  );
}

export default React.memo(TopicCard);