import { redirect } from "react-router"

export async function action() {
    await fetch('http://localhost:5000/api/auth/logout', {
        method: "POST",
        credentials: "include"
    })

    return redirect("/posts");
}