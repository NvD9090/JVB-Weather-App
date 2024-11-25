import { useSelector } from 'react-redux'
import './CurrentInfo.scss'
import { RootState } from '../../store'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'
import convertTime from '../../helper/convertTime.ts'
const CurrentInfo = () => {

    const weather = useSelector((state: RootState) => state.weather)

    if (weather.status === 'loading') {
        return (
            <div className="current-info">
                <LoadingSpinner isLoading={true} />
            </div>
        );
    }
    if (weather.status === 'failed') {
        return (
            <div className="current-info">
            </div>
        );
    }


    if (weather.status === 'succeeded' && weather.data) {
        const data = weather.data;

        return (
            <div className="current-info">
                <p className="date-time">{convertTime(data.location.localtime)}</p>
                <div className="temparature">
                    <img src={data.current.condition.icon} alt={data.current.condition.text} />
                    <h1 className="temparature-F">
                        <span className="temparature-value">
                            {data.current.temp_f} <sup><sup>o</sup> F</sup>
                        </span>
                    </h1>
                </div>
                <h2 className="temparature-status">{data.current.condition.text}</h2>
                <div className="temparature-description">
                    <div className="humidity">
                        <p>Humidity</p>
                        <div className="value-humidity">
                            {data.current.humidity} <span>%</span>
                        </div>
                    </div>
                    <div className="wind-speed">
                        <p>Wind speed</p>
                        <div className="value-wind-speed">
                            {data.current.wind_kph} km/j
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null; // Nếu không có dữ liệu, không hiển thị gì
};


export default CurrentInfo
