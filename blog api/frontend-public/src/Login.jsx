import { Form, useActionData, useNavigation } from "react-router";
import { redirect } from "react-router";

export async function action({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include"
    });

    if (!res.ok) {
        const errorData = await res.json();
        return { error: errorData.error || "Login failed." };
    }

    return redirect("/posts");
}

export default function Login() {
    const actionData = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="login-container">
            <Form className="login-form" method="post">
                <h1>Login</h1>
                <label>
                    Username:
                    <input type="text" name="username" required />
                </label>
                <label>
                    Password: 
                    <input type="password" name="password" required />
                </label>
                <button type="submit" disabled={isSubmitting}>Submit</button>
                {actionData ? <p>{actionData.error}</p> : null}
            </Form>
        </div>


    );
}