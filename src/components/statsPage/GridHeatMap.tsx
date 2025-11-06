"use client";
import { getStudySessionsWithDate } from "@/actions/stats/grid-heatmap-data";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function getDaysInYear(year: number) {
    const start = new Date(year, 0, 1); // Jan 1
    const end = new Date(year, 11, 31); // Dec 31
    const today = new Date();

    const days: Date[] = [];
    const current = new Date(start);

    while (current <= end && current <= today) {
        days.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }

    return days;
}

function formatDate(date: Date) {
    return date.toISOString().split("T")[0];
}

function getColor(count: number) {
    if (!count) return "bg-stone-800";
    if (count < 2) return "bg-green-200";
    if (count < 4) return "bg-green-400";
    if (count < 6) return "bg-green-600";
    return "bg-green-800";
}

// Example dataset


export default function GitHubStyleHeatmap() {
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);
    const [days, setDays] = useState<Date[]>([]);
    const [data, setData] = useState<{ [key: string]: { count: number } }>({})

    async function getDatas() {
        try {
            const data = await getStudySessionsWithDate()
            if (data.data) {
                console.log(data.data)
                setData(data.data)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong!')
            return;
        }
    }

    useEffect(() => {
        getDatas();
    }, [])

    useEffect(() => {
        setDays(getDaysInYear(year));
    }, [year]);

    // Arrange into weeks (each week is an array of 7 slots)
    const weeks: (Date | null)[][] = [];
    let week: (Date | null)[] = [];

    const firstDayOfYear = new Date(year, 0, 1).getDay(); // Sunday=0
    // Pad start of first column
    for (let i = 0; i < firstDayOfYear; i++) {
        week.push(null);
    }

    days.forEach((day) => {
        week.push(day);
        if (week.length === 7) {
            weeks.push(week);
            week = [];
        }
    });

    // Pad last week if needed
    if (week.length > 0) {
        while (week.length < 7) week.push(null);
        weeks.push(week);
    }

    // Transpose: rows = days of week, cols = weeks
    const rows: (Date | null)[][] = Array.from({ length: 7 }, (_, rowIdx) =>
        weeks.map((week) => week[rowIdx] || null)
    );

    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between mb-2">
                <h2>Study Heatmap</h2>
                <div>
                    <span
                        className="cursor-pointer px-2"
                        onClick={() => setYear((y) => y - 1)}
                    >
                        &lt;
                    </span>
                    <span>{year}</span>
                    {year < currentYear && (
                        <span
                            className="cursor-pointer px-2"
                            onClick={() => setYear((y) => y + 1)}
                        >
                            &gt;
                        </span>
                    )}
                </div>
            </div>

            {/* Rows: days of week */}
            <div className="flex flex-col gap-2">
                {rows.map((row, rowIdx) => (
                    <div key={rowIdx} className="flex items-center gap-2">
                        <div className="w-8 text-xs">{dayLabels[rowIdx]}</div>
                        <div className="flex gap-2">
                            {row.map((day, colIdx) => {
                                if (!day) return <div key={colIdx} className="w-4 h-4" />;
                                const key = formatDate(day);
                                const count = data[key]?.count || 0;
                                return (
                                    <div
                                        key={key}
                                        className={`w-4 h-4 rounded ${getColor(count)}`}
                                        title={`${key}: ${count} contributions`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
