
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type SalaryBreakdownItem = {
  name: string;
  value: number;
  color: string;
};

interface SalaryChartProps {
  data: SalaryBreakdownItem[];
  total: number;
  currency?: string;
}

const SalaryChart = ({ data, total, currency = '$' }: SalaryChartProps) => {
  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="glassmorphism p-3 text-sm rounded-lg">
          <p className="font-medium">{item.name}</p>
          <p className="text-muted-foreground">
            {currency}{item.value.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">
            {((item.value / total) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salary Breakdown</CardTitle>
        <CardDescription>
          Your salary components visualized
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="h-[200px] w-full md:w-[50%]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 md:mt-0 w-full md:w-[50%]">
            <div className="space-y-4">
              {data.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <div className="text-sm font-medium">
                    {currency}{item.value.toLocaleString()}
                  </div>
                </div>
              ))}
              
              <div className="pt-2 mt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total</span>
                  <div className="text-sm font-bold">
                    {currency}{total.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalaryChart;
