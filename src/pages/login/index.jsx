import { useState } from "react";
import {
    FormSchemaLogin,
    getErrors,
    getFieldError,
} from "../../lib/validationForm";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabase-client";

export default function LoginPage() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        const { error, data } = FormSchemaLogin.safeParse(formState);
        if (error) {
        const errors = getErrors(error);
        setFormErrors(errors);
        console.log(errors);
        } else {
        let { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });

        if (error) {
            alert("Signing up error !");
        } else {
            alert("Signed up !");
            await new Promise((resolve) => setTimeout(resolve, 1000));
            navigate("/");
        }
        }
    };

    const onBlur = (property) => () => {
        const message = getFieldError(property, formState[property]);
        setFormErrors((prev) => ({ ...prev, [property]: message }));
        setTouchedFields((prev) => ({ ...prev, [property]: true }));
    };

    const isInvalid = (property) => {
        if (formSubmitted || touchedFields[property]) {
        return !!formErrors[property];
        }
        return undefined;
    };

    const setField = (property, valueSelector) => (e) => {
        setFormState((prev) => ({
        ...prev,
        [property]: valueSelector ? valueSelector(e) : e.target.value,
        }));
    };

    return (
            <div className="max-w-md mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">Accedi</h1>
                <form onSubmit={onSubmit} noValidate className="bg-gray-900 p-6 rounded-md shadow-md space-y-5">
                    <div>
                    <label htmlFor="email" className="block text-white font-medium mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={setField("email")}
                        onBlur={onBlur("email")}
                        aria-invalid={isInvalid("email")}
                        required
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formErrors.email && <small className="text-red-500">{formErrors.email}</small>}
                    </div>

                    <div>
                    <label htmlFor="password" className="block text-white font-medium mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formState.password}
                        onChange={setField("password")}
                        onBlur={onBlur("password")}
                        aria-invalid={isInvalid("password")}
                        required
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formErrors.password && <small className="text-red-500">{formErrors.password}</small>}
                    </div>

                    <div className="text-center">
                    <button
                        type="submit"
                        className="bg-gray-500 hover:bg-gray-700 transition text-white py-2 px-4 rounded mt-2 cursor-pointer text-base"
                    >
                        Accedi
                    </button>
                    </div>
                </form>
            </div>
    );
}
