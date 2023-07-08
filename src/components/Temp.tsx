type TempProps = {
	temp: number;
	color?: string;
	high?: boolean;
	className?: string;
};

const Temp = ({ temp, high, color, className }: TempProps) => {
	return (
		<span
			className={
				"after:content-['°C'] " +
				(high ? "font-medium " : "") +
				(color ? `text-${color}` : "") +
				" " +
				(className || "")
			}
		>
			{temp}
		</span>
	);
};

export default Temp;
