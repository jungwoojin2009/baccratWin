
import React, { useState } from 'react';

export default function App() {
  const [balance, setBalance] = useState(1000);
  const [betAmount, setBetAmount] = useState('');
  const [betTarget, setBetTarget] = useState('');
  const [playerCards, setPlayerCards] = useState([]);
  const [bankerCards, setBankerCards] = useState([]);
  const [result, setResult] = useState('');

  const drawCard = () => {
    const deck = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    return deck[Math.floor(Math.random() * deck.length)];
  };

  const getCardValue = (card) => {
    if (['10', 'J', 'Q', 'K'].includes(card)) return 0;
    if (card === 'A') return 1;
    return parseInt(card);
  };

  const handleBet = (target) => {
    const bet = parseInt(betAmount);
    if (isNaN(bet) || bet <= 0 || bet > balance) {
      alert('올바른 배팅 금액을 입력하세요');
      return;
    }
    setBetTarget(target);
    simulateGame(target, bet);
  };

  const simulateGame = (target, bet) => {
    const pCards = [drawCard(), drawCard()];
    const bCards = [drawCard(), drawCard()];
    const pScore = (getCardValue(pCards[0]) + getCardValue(pCards[1])) % 10;
    const bScore = (getCardValue(bCards[0]) + getCardValue(bCards[1])) % 10;

    setPlayerCards(pCards);
    setBankerCards(bCards);

    let winner = '';
    if (pScore > bScore) winner = 'player';
    else if (bScore > pScore) winner = 'banker';
    else winner = 'tie';

    let updatedBalance = balance;
    if (target === winner) {
      updatedBalance += winner === 'tie' ? bet * 8 - bet : bet;
      setResult(`✅ 승리! ${winner.toUpperCase()} 승`);
    } else {
      updatedBalance -= bet;
      setResult(`❌ 패배... ${winner.toUpperCase()} 승`);
    }
    setBalance(updatedBalance);
  };

  return (
    <div style={{ maxWidth: 600, margin: '20px auto', fontFamily: 'Arial, sans-serif', padding: 20 }}>
      <h1>🎰 BaccaratWin</h1>
      <p>잔액: 💰 {balance} 칩</p>

      <div style={{ marginBottom: 10 }}>
        <input
          type="number"
          placeholder="배팅 칩 수"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          style={{ padding: 8, fontSize: 16, width: 150, marginRight: 10 }}
        />
        <button onClick={() => handleBet('player')} style={{ marginRight: 5 }}>👤 플레이어</button>
        <button onClick={() => handleBet('banker')} style={{ marginRight: 5 }}>🏦 뱅커</button>
        <button onClick={() => handleBet('tie')}>🤝 무승부</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h3>👤 플레이어 카드</h3>
          <div style={{ fontSize: 30 }}>{playerCards.join(' ')}</div>
        </div>
        <div>
          <h3>🏦 뱅커 카드</h3>
          <div style={{ fontSize: 30 }}>{bankerCards.join(' ')}</div>
        </div>
      </div>

      <p style={{ marginTop: 20, fontSize: 18 }}>{result}</p>
    </div>
  );
}
