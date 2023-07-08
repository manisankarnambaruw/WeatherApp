type TempProps = {
	temp: number;
	color?: string;
	high?: boolean;
};

const Temp = ({ temp, high, color }: TempProps) => {
	return (
		<span
			className={
				"after:content-['°C'] " +
				(high ? "font-medium " : "") +
				(color ? `text-${color}` : "")
			}
		>
			{temp}
		</span>
	);
};

export default Temp;
