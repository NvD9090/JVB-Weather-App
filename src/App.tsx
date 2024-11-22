import React, { useState } from 'react';
import Card from './component/card/Card';
import TemperatureChart from './component/chart/Chart';
import CurrentInfo from './component/currentInfo/CurrentInfo';
import Search from './component/search/Search';
import './styles.scss';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import WeatherDetailsModal from './component/modal/Modal';
const App: React.FC = () => {
  const weather = useSelector((state: RootState) => state.weather);
  const today = new Date().toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState<string | null>(today);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<any>(null);


  const weatherData = weather.data?.forecast.forecastday.map((day) => ({
    date: day.date,
    hours: day.hour.map((hour) => ({
      temperature: hour.temp_f,
      humidity: hour.humidity,
      uv: hour.uv,
      time: hour.time,
    })),
  })) || [];

  const filteredData = selectedDate
    ? weatherData.filter((data) => data.date === selectedDate)
    : [];

  const handleDoubleClick = (date: string) => {
    const dayData = weather.data?.forecast.forecastday.find((check) => check.date === date);
    if (dayData) {
      setSelectedData(dayData);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="background">
      <div className="box">
        <div className="left-section">
          <Search />
          <CurrentInfo />
        </div>
        <div className="right-section">
          <TemperatureChart weatherData={filteredData} selectedDate={selectedDate} />
          <div className="under-section">
            {weather.data?.forecast.forecastday.map((day, index) => (
              <Card
                key={index}
                isActive={selectedDate === day.date || (!selectedDate && day.date === today)}
                date={day.date}
                icon={day.day.condition.icon}
                humidity={day.day.avghumidity}
                onClick={() => setSelectedDate(day.date)}
                onDoubleClick={() => handleDoubleClick(day.date)} // Double-click mở modal
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal hiển thị chi tiết */}
      <WeatherDetailsModal
        isModalOpen={isModalOpen}
        selectedData={selectedData}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default App;
