import { faCircleUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IStatistic {
  label: string;
  value: number;
  growth?: 'up' | 'down';
  growthPercentages?: number;
};
export default function Statistic({ label, value, growth, growthPercentages }: IStatistic) {
  return (
    <div className="statistic p-2">
      <p className="pb-2 text-[24px]">{label}</p>
      <p className="pb-2 text-[24px] font-bold">{value}</p>
      <div className={`text-[16px] text-white ${growth && (growthPercentages === 0 || growthPercentages) ? 'block' : 'hidden'}`}>
        <FontAwesomeIcon icon={faCircleUp} className={`mr-1 ${growth === 'down' && 'rotate-180 text-red-600'}`}/>
        <span className={`pb-2`}>{growthPercentages}%</span>
        <span className="block mt-2 text-white-400">Since last month</span>
      </div>
    </div>
  )
}
