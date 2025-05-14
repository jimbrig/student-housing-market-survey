import React, { useMemo } from 'react';
import { LinePath } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleTime, scaleLinear } from '@visx/scale';
import { curveMonotoneX } from '@visx/curve';
import { extent, max } from 'd3-array';

interface OccupancyDataPoint {
  month: string;
  year: number;
  rate: number;
}

interface OccupancyChartProps {
  data: OccupancyDataPoint[];
  width?: number;
  height?: number;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const colors = ['#2563EB', '#0D9488', '#F97316', '#22C55E', '#F59E0B'];

export const OccupancyChart: React.FC<OccupancyChartProps> = ({ 
  data,
  width = 800,
  height = 400
}) => {
  // Convert string month to Date object
  const parseDate = (month: string, year: number) => {
    const monthIndex = months.indexOf(month);
    return new Date(year, monthIndex);
  };

  // Process data for visualization
  const processedData = useMemo(() => {
    return data.map(d => ({
      ...d,
      date: parseDate(d.month, d.year)
    }));
  }, [data]);

  // Group data by year
  const dataByYear = useMemo(() => {
    const grouped = new Map<number, typeof processedData>();
    processedData.forEach(d => {
      if (!grouped.has(d.year)) {
        grouped.set(d.year, []);
      }
      grouped.get(d.year)?.push(d);
    });
    return Array.from(grouped.entries()).map(([year, points]) => ({
      year,
      points: points.sort((a, b) => a.date.getTime() - b.date.getTime())
    }));
  }, [processedData]);

  // Create scales
  const xScale = useMemo(() => {
    const dates = processedData.map(d => d.date);
    return scaleTime({
      domain: extent(dates) as [Date, Date],
      range: [50, width - 20]
    });
  }, [processedData, width]);

  const yScale = useMemo(() => {
    return scaleLinear({
      domain: [0, max(processedData, d => d.rate) || 1],
      range: [height - 50, 20]
    });
  }, [processedData, height]);

  // Margins
  const margin = { top: 20, right: 20, bottom: 40, left: 50 };

  return (
    <div className="w-full overflow-x-auto">
      <svg width={width} height={height}>
        {/* Y-axis */}
        {yScale.ticks(5).map(tick => (
          <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
            <line
              x1={margin.left}
              x2={width - margin.right}
              stroke="#E5E7EB"
              strokeDasharray={tick === 0 ? '' : '3,3'}
            />
            <text
              x={margin.left - 10}
              y={0}
              textAnchor="end"
              alignmentBaseline="middle"
              fontSize={12}
              fill="#6B7280"
            >
              {`${(tick * 100).toFixed(0)}%`}
            </text>
          </g>
        ))}

        {/* X-axis */}
        {xScale.ticks(6).map(tick => (
          <g key={tick.getTime()} transform={`translate(${xScale(tick)}, ${height - margin.bottom})`}>
            <text
              textAnchor="middle"
              fontSize={12}
              fill="#6B7280"
            >
              {tick.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
            </text>
          </g>
        ))}

        {/* Data lines */}
        <Group>
          {dataByYear.map(({ year, points }, i) => (
            <LinePath
              key={year}
              data={points}
              x={d => xScale(d.date)}
              y={d => yScale(d.rate)}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              curve={curveMonotoneX}
            />
          ))}
        </Group>

        {/* Data points */}
        {dataByYear.map(({ year, points }, i) => (
          <Group key={`points-${year}`}>
            {points.map((point, j) => (
              <circle
                key={`point-${year}-${j}`}
                cx={xScale(point.date)}
                cy={yScale(point.rate)}
                r={4}
                fill="white"
                stroke={colors[i % colors.length]}
                strokeWidth={2}
                className="transition-transform duration-200 hover:scale-150"
              >
                <title>{`${point.month} ${year}: ${(point.rate * 100).toFixed(1)}%`}</title>
              </circle>
            ))}
          </Group>
        ))}

        {/* Legend */}
        {dataByYear.map(({ year }, i) => (
          <g key={`legend-${year}`} transform={`translate(${60 + i * 100}, ${margin.top})`}>
            <rect width={20} height={2} fill={colors[i % colors.length]} />
            <text x={25} y={0} fontSize={12} alignmentBaseline="middle" fill="#111827">
              {year}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};