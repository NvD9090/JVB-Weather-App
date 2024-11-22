import { useEffect, useState } from 'react';
import './Card.scss';


interface CardProps {
  isActive: boolean;
  date: string;
  humidity: number;
  icon: string;
  onClick: () => void;
  onDoubleClick: () => void
}

const Card: React.FC<CardProps> = ({ isActive, date, humidity, icon, onClick, onDoubleClick }) => {
  const [displayDate, setDisplayDate] = useState<string>(date);

  useEffect(() => {
    const todayDate = new Date().toISOString().split('T')[0];
    if (date === todayDate) {
      setDisplayDate('Today');
    } else {
      setDisplayDate(date);
    }
  }, [date]);
  return (
    <div className={`card-module ${isActive ? 'active' : ''}`} onClick={onClick} onDoubleClick={onDoubleClick}>
      <div className="date-time">{displayDate}</div>
      <img src={icon} alt="Weather icon" />
      <div className="humidity-title">Humidity</div>
      <div className="humidity-value">{humidity}%</div>
    </div>
  );
};

export default Card;
