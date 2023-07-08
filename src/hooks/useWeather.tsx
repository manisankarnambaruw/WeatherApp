import { FAKERES } from "./useLocalStorageState";
import { useState } from "react";

interface fetchProps {
	latitude: string;
	longitude: string;
}

const QUERY =
	"https://api.open-meteo.com/v1/forecast?hourly=relativehumidity_2m,temperature_2m,apparent_temperature,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,sunrise,sunset&current_weather=true&timeformat=unixtime&timezone=auto";

const AIR_QUALITY_QUERY =
	"https://air-quality-api.open-meteo.com/v1/air-quality?hourly=pm10";
const useWeather = () => {
	const [apiRes, setApiRes] = useState(FAKERES);
	const [currentWeather, setCurrentWeather] = useState(
		apiRes["current_weather"]
	);
	async function handleFetch({ latitude, longitude }: fetchProps) {
		const response = await fetch(
			QUERY + `&latitude=${latitude || 13.09}&longitude=${longitude || 80.28}`
		).then((res) => res.json());
		const airQualityResponse = await fetch(
			AIR_QUALITY_QUERY +
				`&latitude=${latitude || 13.09}&longitude=${longitude || 80.28}`
		).then((res) => res.json());
		response["hourly"]["pm10"] = airQualityResponse["hourly"]["pm10"];
		setApiRes(response);
		setCurrentWeather(response["current_weather"]);
	}
	return { apiRes, currentWeather, handleFetch };
};

export default useWeather;
