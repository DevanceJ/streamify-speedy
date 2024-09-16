import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardProps {
  title?: string;
  amount?: number | string;
  change?: number;
  icon?: React.ReactNode;
}
export const CardComponent = ({ title, amount, change, icon }: CardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{amount}</div>
        {change !== undefined && change !== 0 && (
          <div
            className={`text-sm ${
              change > 0 ? "text-green-500" : "text-red-500"
            }`}>
            {change > 0 ? "+" : ""}
            {change} from last month
          </div>
        )}
      </CardContent>
    </Card>
  );
};
