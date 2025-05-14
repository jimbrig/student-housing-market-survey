import React, { useMemo } from 'react';
import { BarGroup } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { max } from 'd3-array';

interface RentDataPoint {
  year: number;
  studio: number;
  oneBed: number;
  twoBed: number;
  threeBed: number;
  fourBed: number;
}

interface RentTrendsChartProps {
  data: RentDataPoint[];
  width?: number;
  height?: number;
}

const keys = ['studio', 'oneBed', 'twoBed', 'threeBed', 'fourBed'];
const colors = ['#2563EB', '#0D9488', '#F97316', '#22C55E', '#F59E0B'];

export const RentTrendsChart: React.FC<RentTrendsChartProps> = ({
  data,
  width = 800,
  height = 400
}) => {
  // Margins
  const margin = { top: 40, right: 20, bottom: 40, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Scales
  const years = useMemo(() => data.map(d => d.year), [data]);
  
  const xScale = useMemo(() => 
    scaleBand<number>({
      domain: years,
      range: [0, innerWidth],
      padding: 0.2
    }),
    [years, innerWidth]
  );

  const unitTypes = useMemo(() =>
    scaleBand<string>({
      domain: keys,
      range: [0, xScale.bandwidth()],
      padding: 0.1
    }),
    [xScale.bandwidth()]
  );

  const yScale = useMemo(() => {
    const maxRent = max(data, d => Math.max(...keys.map(key => d[key as keyof RentDataPoint]))) || 0;
    return scaleLinear<number>({
      domain: [0, maxRent * 1.1],
      range: [innerHeight, 0],
      nice: true
    });
  }, [data, innerHeight]);

  const colorScale = scaleOrdinal<string, string>({
    domain: keys,
    range: colors
  });

  const unitLabels = {
    studio: 'Studio',
    oneBed: '1 Bed',
    twoBed: '2 Bed',
    threeBed: '3 Bed',
    fourBed: '4 Bed'
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg width={width} height={height}>
        <Group top={margin.top} left={margin.left}>
          {/* Y-axis */}
          {yScale.ticks(5).map(tick => (
            <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
              <line
                x1={0}
                x2={innerWidth}
                stroke="#E5E7EB"
                strokeDasharray={tick === 0 ? '' : '3,3'}
              />
              <text
                x={-10}
                y={0}
                textAnchor="end"
                alignmentBaseline="middle"
                fontSize={12}
                fill="#6B7280"
              >
                ${tick.toLocaleString()}
              </text>
            </g>
          ))}

          {/* X-axis */}
          {years.map(year => (
            <text
              key={year}
              x={xScale(year)! + xScale.bandwidth() / 2}
              y={innerHeight + 25}
              textAnchor="middle"
              fontSize={12}
              fill="#6B7280"
            >
              {year}
            </text>
          ))}

          {/* Bars */}
          <BarGroup
            data={data}
            keys={keys}
            height={innerHeight}
            x0={d => d.year}
            x0Scale={xScale}
            x1Scale={unitTypes}
            yScale={yScale}
            color={colorScale}
          >
            {(barGroups) =>
              barGroups.map(barGroup => (
                <Group key={`bar-group-${barGroup.index}`} left={barGroup.x0}>
                  {barGroup.bars.map(bar => (
                    <rect
                      key={`bar-${barGroup.index}-${bar.index}`}
                      x={bar.x}
                      y={bar.y}
                      width={bar.width}
                      height={bar.height}
                      fill={bar.color}
                      rx={2}
                      className="transition-opacity duration-200 hover:opacity-80"
                    >
                      <title>
                        {`${barGroup.key} - ${unitLabels[bar.key as keyof typeof unitLabels]}: $${bar.value.toLocaleString()}`}
                      </title>
                    </rect>
                  ))}
                </Group>
              ))
            }
          </BarGroup>

          {/* Legend */}
          {keys.map((key, i) => (
            <g key={`legend-${key}`} transform={`translate(${i * 100}, ${-margin.top + 15})`}>
              <rect width={12} height={12} fill={colors[i]} rx={2} />
              <text x={16} y={9} fontSize={12} fill="#111827">
                {unitLabels[key as keyof typeof unitLabels]}
              </text>
            </g>
          ))}
        </Group>
      </svg>
    </div>
  );
};