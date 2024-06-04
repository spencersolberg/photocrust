import type { ActionFunction } from "@remix-run/node";
import * as fs from "fs/promises";

import "dotenv/config";

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const photo = form.get("photo")! as string;

    await fs.unlink((process.env.PHOTOS_DIRECTORY ?? "./photos/") + photo);

    const response = new Response(null, {
        status: 303,
        headers: {
            Location: "/",
        },
    });

    return response;
}