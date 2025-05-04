import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { JobApplication, JobFormProps } from "../models/types";
import Sidebar from "./Sidebar";
import api from "../api";

const NewApp: React.FC<JobFormProps> = ({ isEditing = false }) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState<Omit<JobApplication, "_id">>({
        company: "",
        position: "",
        applicationDate: "",
        status: "pending",
        followUpDate: "",
        notes: "",
    });
    const [loading, setLoading] = useState(isEditing);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isEditing && id) {
            const fetchApplications = async () => {
                try {
                    const applications = await api.get<JobApplication[]>("/applications");
                    const application = applications.data.find(app => app._id === id);
                    if (application) {
                        setFormData({
                            company: application.company,
                            position: application.position,
                            applicationDate: application.applicationDate,
                            status: application.status,
                            followUpDate: application.followUpDate,
                            notes: application.notes || "",
                        });
                    } else {
                        setError("The application was not found");
                    }
                } catch (error) {
                    console.error('Failed to fetch application:', error);
                    setError("Failed to load data");
                } finally {
                    setLoading(false);
                }
            };
            fetchApplications();
        }

    }, [id, isEditing]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event?.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            if (isEditing && id) {
                const response = await api.put(`/application/${id}`, { ...formData });
                console.log(response.data);
            } else {
                const response = await api.post("/application", formData);
                console.log(response.data);
            }
            navigate("/list");
        } catch (error) {
            console.error("Error saving application:", error);
            setError("Failed to save, please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen m-auto ">
            <div className="w-full flex items-stretch">
                <Sidebar />
                <div className="w-full">
                    <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded px-8 pt-6 pb-8 my-8 mx-auto">
                        <div className="mb-4">
                            <label className="block text-stone-700 text-sm font-bold mb-2" htmlFor="text">Firma</label>
                            <input
                                id="company"
                                name="company"
                                type="text"
                                value={formData.company}
                                onChange={handleChange}
                                required
                                className="font-nunito border rounded-lg w-full py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-stone-700 text-sm font-bold mb-2" htmlFor="text">Position</label>
                            <input
                                id="position"
                                name="position"
                                type="text"
                                value={formData.position}
                                onChange={handleChange}
                                required
                                className="font-nunito border rounded-lg w-full py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-stone-700 text-sm font-bold mb-2" htmlFor="applicationDate">
                                Bewerbungsdatum
                            </label>
                            <input
                                id="applicationDate"
                                name="applicationDate"
                                type="date"
                                value={formData.applicationDate}
                                onChange={handleChange}
                                required
                                className="font-nunito uppercase border rounded-lg w-full py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="TT.MM.JJJJ" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-stone-700 text-sm font-bold mb-2" htmlFor="applicationDate">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                                className="font-nunito border rounded-lg w-full py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="pending">ausstehend</option>
                                <option value="interview">Interview</option>
                                <option value="rejected">Absage</option>
                                <option value="no_response">keine Rückmeldung</option>
                                <option value="offer">Zusage</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-stone-700 text-sm font-bold mb-2" htmlFor="followUpDate">
                                Nachverfolgen
                            </label>
                            <input
                                id="followUpDate"
                                name="followUpDate"
                                type="date"
                                value={formData.followUpDate}
                                onChange={handleChange}
                                className="font-nunito uppercase border rounded-lg w-full py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="TT.MM.JJJJ" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-stone-700 text-sm font-bold mb-2" htmlFor="text">Bemerkung</label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows={4}
                                className="font-nunito border rounded-lg w-full py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" disabled={loading} className="font-nunito bg-blue-500 hover:bg-blue-700 text-white border border-blue-500 border-solid font-bold py-2 px-4 mr-4 rounded-lg focus:outline-none focus:shadow-outline">
                                {loading ? "speichern..." : isEditing ? "Änderung speichern" : "Speichern"}
                            </button>
                            <button type="button" onClick={() => navigate("/list")} className="font-nunito bg-white text-blue-500 hover:text-blue-700 border border-blue-500 border-solid font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">Abbrechen</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
export default NewApp;