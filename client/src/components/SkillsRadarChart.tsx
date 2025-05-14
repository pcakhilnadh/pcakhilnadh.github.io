import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

interface SkillsRadarChartProps {
  skills: Array<{
    name: string;
    value: number;
    fullMark: number;
  }>;
}

export default function SkillsRadarChart({ skills }: SkillsRadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skills}>
        <PolarGrid strokeDasharray="3 3" />
        <PolarAngleAxis dataKey="name" tick={{ fill: 'var(--foreground)', fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0, 5]} />
        <Radar
          name="Skill Level"
          dataKey="value"
          stroke="var(--primary)"
          fill="var(--primary)"
          fillOpacity={0.5}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
          formatter={(value) => [`${value}/5`, 'Skill Level']}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}