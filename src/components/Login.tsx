import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Open from "../assets/icon/open.png";
import Close from "../assets/icon/close.png";

const Login: React.FC<{ setIsAuth: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setIsAuth }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event?.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await api.post("/login", formData);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            setIsAuth(true);
            navigate("/list");
        } catch (error) {
            console.error("Bitte versuchen Sie es erneut");
        } finally {
            setLoading(false);
        }
    }
    const handleVisitorLogin = async () => {
        const visitorEmail = "besucher@gmail.com";
        const visitorPassword = "123456";
        setFormData({ email: visitorEmail, password: visitorPassword });
        setLoading(true);
        try {
            const response = await api.post("/login", formData);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            setIsAuth(true);
            navigate("/list");
        } catch (error) {
            console.error("Bitte versuchen Sie es erneut");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="h-scree pt-20">
            <form onSubmit={handleSubmit} className="w-4/5 max-w-lg bg-stone-50 border rounded-2xl px-8 pt-6 pb-8  mx-auto">
                <h2 className="font-nunito text-center text-2xl font-bold text-stone-600 pt-2 pb-8">Login</h2>
                <div className="py-2 text-center">
                    <label htmlFor="email" className="block text-stone-700 text-base mb-2">E-Mail</label>
                    <input type="email" name="email" id="email" value={formData.email}
                        onChange={handleChange} required className="font-nunito border rounded-lg w-full py-2 px-3 text-stone-700 focus:outline-none focus:border-stone-400" />
                </div>
                <div className="py-2 text-center">
                    <label htmlFor="password" className="block text-stone-700 text-base mb-2">Password</label>
                    <div className="font-nunito border bg-white rounded-lg w-full py-2 px-3 text-stone-700 flex justify-between items-center focus-within:border-stone-400">
                        <input type={visible ? "text" : "password"} name="password" id="password" minLength={6} value={formData.password}
                            onChange={handleChange} required className="w-full focus:outline-none" />
                        <div onClick={() => { setVisible(!visible) }}>{visible ? <img src={Open} alt="eyes opened" className="w-6" /> : <img src={Close} alt="eyes closed" className="w-6" />}</div>
                    </div>
                </div>
                <div className="text-center">
                    <p>
                        <button disabled={loading} className="text-stone-700 bg-stone-200 hover:bg-stone-300 font-bold rounded-lg border py-2 px-4 mt-4">Login</button>
                    </p>
                    <p>
                        <button type="button" onClick={handleVisitorLogin} disabled={loading} className="text-stone-700  hover:bg-stone-300 font-bold rounded-lg border py-2 px-4 mt-4">Gast Login</button>
                    </p>
                </div>
            </form>
        </main>
    );
}

export default Login;