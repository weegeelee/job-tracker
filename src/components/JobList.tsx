import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { JobApplication } from "../models/types";
import Sidebar from "./Sidebar";
import Modal from "../UI/Modal";
import Delete from "../assets/icon/delete.png";
import Edit from "../assets/icon/bearbeitung.png";
import ArrowLeft from "../assets/icon/pfeil-left.png";
import ArrowRight from "../assets/icon/pfeil-right.png";
import api from "../api";

const JobList: React.FC = () => {
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
    const [searchFilter, setSearchFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState({
        startDate: "", endDate: ""
    });
    const [showConfirm, setShowConfirm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 15;

    const statusLabels: Record<string, string> = {
        pending: "ausstehend",
        interview: "Interview",
        rejected: "Absage",
        no_response: "keine Rückmeldung",
        offer: "Zusage"
    };

    const statusColors: Record<string, string> = {
        pending: "bg-yellow-100 text-yellow-800",
        interview: "bg-blue-100 text-blue-800",
        rejected: "bg-red-100 text-red-800",
        no_response: "bg-gray-100 text-gray-800",
        offer: "bg-green-100 text-green-800"
    };

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await api.get<JobApplication[]>("/applications");
                setApplications(response.data);
            } catch (error) {
                console.error('Failed to fetch application:', error);
            }
        };
        fetchApplications();
    }, []);

    const deleteApplication = async (id: string) => {
        if (!id) return;
        try {
            await api.delete(`/application/${id}`)
            setApplications(applications.filter(app => app._id !== id));
        } catch (error) {
            console.error('Failed to delete application:', error);
        } finally {
            setShowConfirm(false);
        }
    };

    const handleDeleteClick = (id: string) => {
        setSelectedAppId(id);
        setShowConfirm(true);
    };
    const handleResetFilter = () => {
        setSearchFilter("");
        setStatusFilter("all");
        setDateFilter({
            startDate: "", endDate: ""
        })
    };
    const filteredApps = applications.filter(app => {
        if (statusFilter !== "all" && app.status !== statusFilter) {
            return false;
        }
        if (searchFilter && !(app.company.toLowerCase().includes(searchFilter.toLowerCase()) ||
            app.position.toLowerCase().includes(searchFilter.toLowerCase()) ||
            (app.notes && app.notes.toLowerCase().includes(searchFilter.toLowerCase())))) {
            return false;

        }
        if (dateFilter.startDate && new Date(app.applicationDate) < new Date(dateFilter.startDate)) {
            return false;
        }
        if (dateFilter.endDate && new Date(app.applicationDate) < new Date(dateFilter.endDate)) {
            return false;
        }
        return true;
    });

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedApps = filteredApps.slice(startIndex, startIndex + pageSize);
    const totalPages = Math.ceil(filteredApps.length / pageSize);

    return (
        <main className="min-h-screen m-auto ">
            <div className="w-full flex justify-between items-stretch">
                <Sidebar />
                <div className="w-9/10 mx-auto">
                    <div className="w-full flex justify-start gap-2 mt-3">
                        <div>
                            <input
                                type="text"
                                value={searchFilter}
                                onChange={(event) => setSearchFilter(event.target.value)}
                                className="font-nunito border rounded-lg w-60 py-2 px-3 text-stone-700  focus:outline-none focus:shadow-outline"
                                placeholder="suchen nach Firma/Position"
                            />

                        </div>
                        <div>
                            <select value={statusFilter}
                                onChange={(event) => setStatusFilter(event.target.value)}
                                className="font-nunito border rounded-lg w-48 py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="all">alle Bewerbungen</option>
                                <option value="pending">ausstehend</option>
                                <option value="interview">Interview</option>
                                <option value="rejected">Absage</option>
                                <option value="no_response">keine Rückmeldung</option>
                                <option value="offer">Zusage</option>
                            </select>
                        </div>
                        <div className="w-full flex justify-start">
                            <input
                                type="date"
                                value={dateFilter.startDate}
                                onChange={(event) => setDateFilter({ ...dateFilter, startDate: event.target.value })}
                                required
                                className="font-nunito uppercase border rounded-lg w-48 py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="TT.MM.JJJJ" />
                            <span className="self-center px-2">bis</span>
                            <input
                                type="date"
                                value={dateFilter.endDate}
                                onChange={(event) => setDateFilter({ ...dateFilter, endDate: event.target.value })}
                                required
                                className="font-nunito uppercase border rounded-lg w-48 py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="TT.MM.JJJJ" />
                        </div>
                        <button onClick={handleResetFilter} className="font-nunito bg-blue-500 hover:bg-blue-700 text-white border border-blue-500 font-bold rounded-lg border py-2 px-3">Reset</button>
                    </div>
                    <div className="w-full mx-auto">
                        <table className="w-9/10 bg-white rounded-t-lg my-6 mx-auto">
                            <thead>
                                <tr className="bg-stone-50">
                                    <th className="font-nunito text-stone-600 text-left py-2 px-4 border-b">Firma</th>
                                    <th className="font-nunito text-stone-600 text-left py-2 px-4 border-b">Position</th>
                                    <th className="font-nunito text-stone-600 text-left py-2 px-4 border-b">Datum</th>
                                    <th className="font-nunito text-stone-600 text-left py-2 px-4 border-b">Status</th>
                                    <th className="font-nunito text-stone-600 text-left py-2 px-4 border-b">Verfolgung</th>
                                    <th className="font-nunito text-stone-600 text-left py-2 px-4 border-b">Bemerkung</th>
                                    <th className="font-nunito text-stone-600 text-left py-2 px-4 border-b">Bearbeiten</th>

                                </tr>
                            </thead>
                            <tbody>
                                {paginatedApps.map((app) => (
                                    <tr key={app._id} className="hover:bg-stone-50">
                                        <td className="font-nunito text-stone-600 p-4 border-b">{app.company}</td>
                                        <td className="font-nunito text-stone-600 p-4 border-b">{app.position}</td>
                                        <td className="font-nunito text-stone-600 p-4 border-b">{app.applicationDate}</td>
                                        <td className="font-nunito text-stone-600 p-4 border-b">
                                            <span className={`px-2 py-1 rounded-full text-xs ${statusColors[app.status]}`}>
                                                {statusLabels[app.status]}
                                            </span>
                                        </td>
                                        <td className="font-nunito text-stone-600 p-4 border-b">{app.followUpDate}</td>
                                        <td className="font-nunito text-stone-600 p-4 border-b">{app.notes}</td>
                                        <td className="font-nunito text-stone-600 p-4 border-b">
                                            <div className="h-full flex items-center">
                                                <Link to={`/edit/${app._id}`} ><img src={Edit} alt="edit icon" className="w-4 mx-2" /></Link>
                                                <button onClick={() => handleDeleteClick(app._id)}><img src={Delete} alt="delete icon" className="w-6 mx-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-center items-center py-4">
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}><img src={ArrowLeft} alt="arrowleft icon" className="w-6 mx-2" /></button>
                            <span>Seite <strong>{currentPage}</strong> von {totalPages}</span>
                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}><img src={ArrowRight} alt="arrowright icon" className="w-6 mx-2" /></button>
                        </div>

                        {showConfirm && (
                            <Modal open={showConfirm}>
                                <div className="py-2 px-4 border-solid rounded-lg">
                                    <h3 className="font-bold pb-2">Daten löschen</h3>
                                    <p>Diese Daten werden dauerhaft aus deiner Liste gelöscht.</p>
                                    <div className="mt-4">
                                        <button onClick={() => selectedAppId && deleteApplication(selectedAppId)} className="bg-blue-500 hover:bg-blue-700 text-white border border-blue-500 border-solid font-bold py-2 px-4 mr-4 rounded focus:outline-none focus:shadow-outline">Löschen</button>
                                        <button onClick={() => setShowConfirm(false)} className="bg-white text-blue-500 hover:text-blue-700 border border-blue-500 border-solid font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Abrechen</button>
                                    </div>
                                </div>
                            </Modal>
                        )}
                    </div>
                </div>
            </div>
        </main >
    );
}

export default JobList;