import { JobApplication, JobStats } from "../../src/models/types";

const getWeekNumber = (date: Date): number => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export const calculateStats = (applications: JobApplication[]): JobStats => {

    const totalApplications = applications.length;  //totalApplications

    const statusCounts = applications.reduce((accumulator, app) => {
        accumulator[app.status] = (accumulator[app.status] || 0) + 1;
        return accumulator;
    }, {} as Record<string, number>);

    const sampleDate = new Date(applications[0]?.applicationDate);
    const year = sampleDate.getFullYear();
    
    const applicationsByWeek = applications.reduce((accumulator, app) => {
        const date = new Date(app.applicationDate);
        const weekKey = `KW${getWeekNumber(date)}`;
        accumulator[weekKey] = (accumulator[weekKey] || 0) + 1;
        return accumulator;
    }, {} as Record<string, number>);

    const respondedCount = applications.filter(app => app.status !== "pending" && app.status !== "no_response").length;
    const responseRate = applications.length > 0 ? respondedCount / totalApplications : 0;

    let averageResponseTime: number | undefined;
    const respondedApps = applications.filter(app => app.status === "interview" || app.status === "rejected" || app.status === "offer");
    if (respondedApps.length > 0) {
        const totalDays = respondedApps.reduce((total, app) => {
            if (app.applicationDate && app.followUpDate) {
                const applyDate = new Date(app.applicationDate).getTime();
                const updateDate = new Date(app.followUpDate).getTime();
                total + (updateDate - applyDate) / (1000 * 60 * 60 * 24);
            } return total;// change to Days
        }, 0);

        averageResponseTime = totalDays / respondedApps.length;
    }

    return {
        totalApplications,
        statusCounts,
        year,
        applicationsByWeek,
        responseRate,
        averageResponseTime
    };
};
