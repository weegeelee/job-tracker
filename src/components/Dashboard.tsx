import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ApplicationStatusChart from "./ApplicationPieChart";
import WeeklyApplicationChart from "./WeeklyApplicationChart";
import ResponseRateChart from "./ResponseRateChart";
import api from "../api";
import { JobStats } from "../models/types";

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<JobStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStats = async () => {
            console.log("fetchStats");
            try {
                const response = await api.get("/stats");
                setStats(response.data);
            } catch (error) {
                console.error("Failed to fetch stats", error);
                setError("Statistiken konnten nicht geladen werden");
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (loading) return <p>loading...</p>;
    if (error) return <p>{error}</p>;
    if (!stats) return null;

    return (
        <main className="min-h-screen m-auto">
            <div className="w-full flex items-stretch">
                <Sidebar />
                <div className="w-full text-center">
                    <h2 className="text-2xl font-bold text-stone-600 py-8">Analyse von Bewerbungsdaten</h2>
                    <div className="flex justify-center py-8">
                        <div className="w-full">
                        <p className="w-2/3 text-lg font-bold text-stone-600 bg-stone-50 rounded-2xl py-4 mx-auto">Gesamt Bewerbung:<span className="px-4">{stats.totalApplications}</span></p>
                        </div>
                        <div className="w-full"></div>
                    </div>
                    <div className="flex justify-center py-8">
                    <div className="w-full mx-auto">
                        <ApplicationStatusChart statusCounts={stats.statusCounts}/>
                    </div>
                    <div className="w-full">
                        <ResponseRateChart responseRate={stats.responseRate}/>
                    </div>
                    </div>
                    <div className="py-8">
                        <WeeklyApplicationChart applicationsByWeek={stats.applicationsByWeek}/>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;