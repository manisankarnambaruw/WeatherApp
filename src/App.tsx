import { useEffect, useState } from "react";
import Temp from "./components/Temp";
import Carousel from "./components/Carousel";
import DailyCarousel from "./components/DailyCarousel";
import { GoLocation } from "react-icons/go";

import useWeather from "./hooks/useWeather";
import useNight from "./hooks/useNight";
import getCords from "./helpers/getCords";
import getCurrentTime from "./helpers/getCurrentTime";
import getADaysData from "./helpers/getADaysData";
import getIcon from "./helpers/getIcon";

import { VscRefresh } from "react-icons/vsc";
import { WiSunrise, WiSunset } from "react-icons/wi";
import { getTime } from "./helpers/getTime";
import { isNight } from "./helpers/isNight";
import useTheme from "./hooks/useTheme";

const App = () => {
	const { apiRes, currentWeather, handleFetch } = useWeather();
	const night = useNight();
	const [coOrds, setCoOrds] = useState({
		lat: "1",
		long: "1",
	});
	const { theme, toggleTheme } = useTheme();
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(findCords, error, {
			timeout: 100000,
		});
		function findCords(position: any) {
			setCoOrds({
				lat: position.coords.latitude,
				long: position.coords.longitude,
			});
		}
		function error() {
			console.log("error");
		}
		const id = navigator.geolocation.watchPosition(findCords, error);
		navigator.geolocation.clearWatch(id);
		toggleTheme();
	}, []);

	useEffect(() => {
		handleFetch({ latitude: coOrds.lat, longitude: coOrds.long });
	}, [coOrds]);
	const CURRENT_TIME = getCurrentTime(apiRes);
	const CURRENT_TEMPERATURE = currentWeather["temperature"];
	const TODAYS_DATA = getADaysData(apiRes, 0);
	return (
		<main className="min-h-screen w-full sm:w-3/4 sm:mx-auto text-neutral-700 dark:text-neutral-200 overflow-hidden">
			<div className="absolute w-60 bg-cyan-700 h-60 top-[-80px] left-[-90px] rounded-full -z-50 opacity-50 blur-md" />{" "}
			<div className="absolute w-40 bg-cyan-700 h-60 top-20 right-0 rounded-l-[150px] -z-50 opacity-50 blur-md" />
			<div className="flex items-center px-6 py-3">
				<div className="flex flex-col justify-center text-2xl text-neutral-900 dark:text-neutral-50 z-1">
					Hello!!
				</div>
			</div>
			<div className="bg-slate-800 mx-6 z-1 relative px-6 overflow-hidden rounded-lg">
				<div className="absolute w-60 bg-cyan-800 h-60 top-[-80px] left-[-90px] rounded-full z-0 opacity-50 blur-md" />{" "}
				<div className="absolute w-40 bg-cyan-800 h-60 top-10 right-0 rounded-l-[150px] z-0 opacity-50 blur-md" />
				<div className="flex items-center py-3">
					<div className="flex flex-col justify-center w-1/2 text-4xl text-neutral-900 dark:text-neutral-50 z-10">
						<Temp temp={CURRENT_TEMPERATURE} high color=" md:text-9xl" />
						<span className="inline-flex text-base md:text-base font-medium">
							{CURRENT_TIME}
						</span>
					</div>
					<div className="w-1/2 h-1/2 pl-18 pb-18 pr-0 text-neutral-900 dark:text-neutral-50 z-10">
						{getIcon({ weatherCode: currentWeather.weathercode, night: night })}
					</div>
				</div>
				<div className="pb-3 md:ml-4 md:text-lg text-neutral-800 dark:text-neutral-200 z-10 relative">
					<div className="flex justify-between">
						<div>
							<p>Indoor temp</p>
							<Temp temp={TODAYS_DATA.apparentMaxTemperature} />
						</div>
						<div>
							<p>Humidity</p>
							{TODAYS_DATA.humidity}%
						</div>
						<div>
							<p>Air Quality</p>
							<p>{TODAYS_DATA.airQuality}</p>
						</div>
					</div>
				</div>
			</div>
			<div className="flex h-28 md:h-40 my-8 md:max-w-lg mx-6 md:mx-auto gap-4 md:gap-10">
				<div className="flex-1 text-center bg-white rounded-lg shadow-lg bg-slate-800">
					<WiSunrise className="w-full h-2/3 md:h-4/5 text-amber-600" />
					<p className="font-title">{getTime(apiRes["daily"]["sunrise"][0])}</p>
				</div>
				<div className="flex-1 text-center bg-white rounded-lg shadow-lg bg-slate-800">
					<WiSunset className="w-full h-2/3 md:h-4/5 text-amber-400" />
					<p className=" font-title">{getTime(apiRes["daily"]["sunset"][0])}</p>
				</div>
			</div>
		</main>
	);
};

export default App;
