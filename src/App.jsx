import { useEffect, useState } from 'react';
import tachyons from 'tachyons';
import Sidebar from './components/Sidebar';
import Forecast from './components/Forecast';
import Highlights from './components/Highlights';
import utils from './utils';
// import all_the_cities from 'all-the-cities';
import styles from './App.module.css';

const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=34.05&longitude=-118.24&hourly=temperature_2m,relativehumidity_2m,surface_pressure,weathercode,cloudcover,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles&start_date=2022-07-28&end_date=2022-07-28';

function App() {
	const [data, setData] = useState('');
	const [userParams, setUserParams] = useState({
		tempUnit: 'fahrenheit',
		timezone: 'America%Los_Angeles',
		date: '2022-07-28'
	})
	const [weatherCond, setWeather] = useState('');
	const [breakpoint, setBreakpoint] = useState('');
	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	});

	const handleResize = () => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);
    handleResize();
		if (0 < windowSize.width < 1024) {
			setBreakpoint('notLg');
		}
		if (1024 <= windowSize.width) {
			setBreakpoint('lg');
		}
		return () => window.removeEventListener('resize', handleResize);
	}, [windowSize.width]);

	useEffect(() => {
		fetch('./placeholder.json')
		.then(resp => resp.json())
		.then(res => {
			setData(res);
			setWeather(utils({ops: 'weatherCode', data: res.current_weather.weathercode}))
		})
		.then(console.log(weatherCond, data))

	}, [])

	return (
		<div className={styles.App}>
			<Sidebar data={data} weatherCond={weatherCond.result}	source={weatherCond.source}></Sidebar>
			{breakpoint === 'lg' ? (
				<div className={styles.lgContainer}>
					<Forecast data={data}></Forecast>
					<Highlights data={data} breakpoint={breakpoint}></Highlights>
					<footer className="tc pv3 ma0">
						<p>
							created by <span>@al doub</span> - devchallenges.io
						</p>
					</footer>
				</div>
			) : (
				<>
					<Forecast data={data}></Forecast>
					<Highlights data={data}></Highlights>
					<footer className="tc pv3 ma0">
						<p>
							created by <span>@al doub</span> - devchallenges.io
						</p>
					</footer>
				</>
			)}
		</div>
	);
}

export default App;
