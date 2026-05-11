"use client";

import React, { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Publication {
  type: string;
  topics?: string[];
  [key: string]: any;
}

interface PublicationsChartProps {
  publications: Publication[];
}

const COLORS = ['#0F172A', '#475569', '#94A3B8', '#CBD5E1'];
const ACCENT = '#B45309';

export default function PublicationsChart({ publications }: PublicationsChartProps) {
  const { typeData, topicData } = useMemo(() => {
    const typeCount: Record<string, number> = {};
    const topicCount: Record<string, number> = {};

    publications.forEach((pub) => {
      // Type
      const type = pub.type || 'Other';
      typeCount[type] = (typeCount[type] || 0) + 1;

      // Topics
      if (pub.topics && Array.isArray(pub.topics)) {
        pub.topics.forEach((topic) => {
          topicCount[topic] = (topicCount[topic] || 0) + 1;
        });
      }
    });

    const typeData = Object.entries(typeCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // For horizontal bar chart, sort ascending so the largest bar is at the top
    const topicData = Object.entries(topicCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => a.value - b.value);

    return { typeData, topicData };
  }, [publications]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'white',
          border: '1px solid var(--border)',
          padding: '0.75rem',
          borderRadius: '6px',
          boxShadow: 'var(--shadow-sm)',
          fontSize: '0.9rem',
          color: 'var(--text-main)',
          zIndex: 1000
        }}>
          <p style={{ fontWeight: 600, margin: '0 0 0.25rem 0' }}>{payload[0].payload.name}</p>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>
            Count: <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label for Pie to avoid overlapping long text
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
    
    // Simplify long names for the pie chart label
    let shortName = name;
    if (name.includes('Working Papers')) shortName = 'Working Papers';
    if (name.includes('Books')) shortName = 'Books';

    return (
      <text x={x} y={y} fill="var(--text-main)" fontSize="0.75rem" fontWeight="500" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${shortName} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
      {/* Donut Chart: By Type */}
      <div className="card" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', textAlign: 'center', fontFamily: 'Inter, sans-serif', color: 'var(--text-main)' }}>By Publication Type</h3>
        <div style={{ width: '100%', height: 350 }} aria-label="Donut chart showing publications by type">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={typeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
                label={renderCustomizedLabel}
                labelLine={{ stroke: 'var(--border)', strokeWidth: 1 }}
              >
                {typeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart: By Topic */}
      <div className="card" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', textAlign: 'center', fontFamily: 'Inter, sans-serif', color: 'var(--text-main)' }}>By Research Topic</h3>
        <div style={{ width: '100%', height: 350, flexGrow: 1 }} aria-label="Horizontal bar chart showing publications by topic">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topicData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={160} 
                tick={{ fontSize: '0.75rem', fill: 'var(--text-muted)' }} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip cursor={{ fill: '#F8FAFC' }} content={<CustomTooltip />} />
              <Bar dataKey="value" fill={ACCENT} radius={[0, 4, 4, 0]} barSize={16}>
                {topicData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[0]} /> // Using slate for bars to keep it academic
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
