import type { LoaderFunctionArgs } from "@remix-run/node";
import * as fs from "fs/promises";

import "dotenv/config";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const photo = await fs.readFile((process.env.PHOTOS_DIRECTORY ?? "./photos/") + params.filename);
    return new Response(photo, {
        headers: {
            "Content-Type": "image/jpeg",
        },
    });
}