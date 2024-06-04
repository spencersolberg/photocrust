import type { ActionFunction } from "@remix-run/node";
import { exec } from "child_process";

export const action: ActionFunction = async ( {} ) => {
    exec("loginctl terminate-session 1");

    const response = new Response(null, {
        status: 303,
        headers: {
            Location: "/",
        },
    });

    return response;
}