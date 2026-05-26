"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const revenueData = [
  { day: "Mon", revenue: 12400 },
  { day: "Tue", revenue: 18200 },
  { day: "Wed", revenue: 15800 },
  { day: "Thu", revenue: 22100 },
  { day: "Fri", revenue: 19500 },
  { day: "Sat", revenue: 28900 },
  { day: "Sun", revenue: 24600 },
]

export function RevenueChart() {
  return (
    <div className="bg-background border border-border p-6 h-full">
      <h3 className="font-serif text-lg text-foreground mb-6">Revenue (Last 7 Days)</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenueData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E0DB" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B6B6B", fontSize: 12, fontFamily: "Inter" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B6B6B", fontSize: 12, fontFamily: "Inter" }}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FAF9F6",
                border: "1px solid #E5E0DB",
                borderRadius: "2px",
                fontFamily: "Inter",
                fontSize: "13px",
              }}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, "Revenue"]}
              labelStyle={{ color: "#1A1A1A", fontWeight: 500 }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#1A1A1A"
              strokeWidth={2}
              dot={{ fill: "#1A1A1A", strokeWidth: 0, r: 4 }}
              activeDot={{ fill: "#C9A96E", strokeWidth: 0, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
