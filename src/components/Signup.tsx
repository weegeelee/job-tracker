import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../models/types";
import api from "../api";

const Signup: React.FC = () => {
    const [formData, setFormData] = useState<User>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event?.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
       
        try {
            const response = await api.post("/signup", formData);
            localStorage.setItem("token", response.data.token);
            navigate("/");
        } catch (error) {
            console.error("Bitte versuchen Sie es erneut");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <main className="h-scree pt-20">
            <form onSubmit={handleSubmit} className="w-4/5 max-w-lg bg-stone-50  rounded-2xl px-8 pt-6 pb-8  mx-auto">
                <h2 className="font-nunito text-center text-2xl font-bold text-stone-600 pt-2 pb-8">Registieren</h2>
                <div className="flex justify-between gap-2">
                    <div className="w-full py-2 text-center">
                        <label htmlFor="firstname" className="block text-stone-700 text-base mb-2">Vorname</label>
                        <input type="text" name="firstname" id="firstname" value={formData.firstname}
                            onChange={handleChange} required className="font-nunito border rounded-lg w-full py-2 px-3 text-stone-700 focus:outline-none focus:border-stone-400" />
                    </div>
                    <div className="w-full py-2 text-center">
                        <label htmlFor="lastname" className="block text-stone-700 text-base mb-2">Nachname</label>
                        <input type="text" name="lastname" id="lastname" value={formData.lastname}
                            onChange={handleChange} required className="font-nunito border rounded-lg w-full py-2 px-3 text-stone-700 focus:outline-none focus:border-stone-400" />
                    </div>
                </div>
                <div className="py-2 text-center">
                    <label htmlFor="email" className="block text-stone-700 text-base mb-2">E-Mail</label>
                    <input type="email" name="email" id="email" value={formData.email}
                        onChange={handleChange} required className="font-nunito border rounded-lg w-full py-2 px-3 text-stone-700 focus:outline-none focus:border-stone-400" />
                </div>
                <div className="py-2 text-center">
                    <label htmlFor="password" className="block text-stone-700 text-base mb-2">Password</label>
                    <input type="password" name="password" id="password" value={formData.password}
                        onChange={handleChange} minLength={6} required className="font-nunito border rounded-lg w-full py-2 px-3 text-stone-700 focus:outline-none focus:border-stone-400" />
                </div>
                <div className="flex justify-center">
                    <button className="text-stone-700 bg-stone-200 hover:bg-stone-300 font-bold rounded-lg border py-2 px-4 mt-4 mx-auto">Registieren</button>
                </div>
            </form>
        </main>
    );
}

export default Signup;