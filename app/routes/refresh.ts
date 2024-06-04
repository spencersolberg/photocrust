import type { ActionFunction } from "@remix-run/node";
import { exec } from "child_process";

export const action: ActionFunction = async ( {} ) => {
    exec("loginctl list-sessions --no-legend | awk '/tty1/ {print $1}' | xargs -r loginctl terminate-session");

    const response = new Response(null, {
        status: 303,
        headers: {
            Location: "/",
        },
    });

    return response;
}