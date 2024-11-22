import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface WeatherDetailsModalProps {
    isModalOpen: boolean;
    selectedData: any;
    onClose: () => void;
}

const WeatherDetailsModal: React.FC<WeatherDetailsModalProps> = ({ isModalOpen, selectedData, onClose }) => {
    const weather = useSelector((state: RootState) => state.weather);

    return (
        <Modal show={isModalOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Weather Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedData && (
                    <>
                        {/* Thông tin địa điểm */}
                        <div className="location-info text-center mb-4">
                            <h5 className="fw-bold">
                                {weather.data?.location.name}, {weather.data?.location.country}
                            </h5>
                            <p className="text-muted">Date: {selectedData.date}</p>
                        </div>

                        {/* Trạng thái thời tiết */}
                        <div className="weather-condition text-center mb-4">
                            <img
                                src={selectedData.day.condition.icon}
                                alt={selectedData.day.condition.text}
                                style={{ width: '80px', height: '80px' }}
                            />
                            <p className="fw-bold">{selectedData.day.condition.text}</p>
                        </div>

                        {/* Thông tin chi tiết chia 2 cột */}
                        <div className="details-info mb-4">
                            <div className="row">
                                {/* Cột 1 */}
                                <div className="col-md-6">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <th>Max Temp (°C)</th>
                                                <td>{selectedData.day.maxtemp_c}</td>
                                            </tr>
                                            <tr>
                                                <th>Max Temp (°F)</th>
                                                <td>{selectedData.day.maxtemp_f}</td>
                                            </tr>
                                            <tr>
                                                <th>Min Temp (°C)</th>
                                                <td>{selectedData.day.mintemp_c}</td>
                                            </tr>
                                            <tr>
                                                <th>Min Temp (°F)</th>
                                                <td>{selectedData.day.mintemp_f}</td>
                                            </tr>
                                            <tr>
                                                <th>Avg Temp (°C)</th>
                                                <td>{selectedData.day.avgtemp_c}</td>
                                            </tr>
                                            <tr>
                                                <th>Avg Temp (°F)</th>
                                                <td>{selectedData.day.avgtemp_f}</td>
                                            </tr>
                                            <tr>
                                                <th>Max Wind (MPH)</th>
                                                <td>{selectedData.day.maxwind_mph}</td>
                                            </tr>
                                            <tr>
                                                <th>Max Wind (KPH)</th>
                                                <td>{selectedData.day.maxwind_kph}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Cột 2 */}
                                <div className="col-md-6">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <th>Total Precip (mm)</th>
                                                <td>{selectedData.day.totalprecip_mm}</td>
                                            </tr>
                                            <tr>
                                                <th>Total Precip (in)</th>
                                                <td>{selectedData.day.totalprecip_in}</td>
                                            </tr>
                                            <tr>
                                                <th>Total Snow (cm)</th>
                                                <td>{selectedData.day.totalsnow_cm}</td>
                                            </tr>
                                            <tr>
                                                <th>Avg Visibility (km)</th>
                                                <td>{selectedData.day.avgvis_km}</td>
                                            </tr>
                                            <tr>
                                                <th>Avg Visibility (miles)</th>
                                                <td>{selectedData.day.avgvis_miles}</td>
                                            </tr>
                                            <tr>
                                                <th>Avg Humidity (%)</th>
                                                <td>{selectedData.day.avghumidity}</td>
                                            </tr>
                                            <tr>
                                                <th>Chance of Rain (%)</th>
                                                <td>{selectedData.day.daily_chance_of_rain}</td>
                                            </tr>
                                            <tr>
                                                <th>Chance of Snow (%)</th>
                                                <td>{selectedData.day.daily_chance_of_snow}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Thông tin mặt trời và mặt trăng */}
                        <div className="astro-info">
                            <h6 className="fw-bold text-center mb-3">Astro Details</h6>
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th>Sunrise</th>
                                        <td>{selectedData.astro.sunrise}</td>
                                    </tr>
                                    <tr>
                                        <th>Sunset</th>
                                        <td>{selectedData.astro.sunset}</td>
                                    </tr>
                                    <tr>
                                        <th>Moonrise</th>
                                        <td>{selectedData.astro.moonrise}</td>
                                    </tr>
                                    <tr>
                                        <th>Moonset</th>
                                        <td>{selectedData.astro.moonset}</td>
                                    </tr>
                                    <tr>
                                        <th>Moon Phase</th>
                                        <td>{selectedData.astro.moon_phase}</td>
                                    </tr>
                                    <tr>
                                        <th>Moon Illumination</th>
                                        <td>{selectedData.astro.moon_illumination}%</td>
                                    </tr>
                                    <tr>
                                        <th>Is Moon Up?</th>
                                        <td>{selectedData.astro.is_moon_up ? 'Yes' : 'No'}</td>
                                    </tr>
                                    <tr>
                                        <th>Is Sun Up?</th>
                                        <td>{selectedData.astro.is_sun_up ? 'Yes' : 'No'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default WeatherDetailsModal;
