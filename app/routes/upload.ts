import type { ActionFunction } from "@remix-run/node";
import * as fs from "fs/promises";
import { exec } from "child_process";
import { unstable_parseMultipartFormData } from "@remix-run/node";

import "dotenv/config";

export const action: ActionFunction = async ({ request }) => {
    await unstable_parseMultipartFormData(request, async (file) => {

        const inputFile = (process.env.TEMP_DIRECTORY ?? "./temp/") + file.filename;
        await fs.writeFile(inputFile, file.data);

        const outputFile = (process.env.PHOTOS_DIRECTORY ?? "./photos/") + file.filename!.replace(/\.[^/.]+$/, ".jpg");

        exec(`ffmpeg -i "${inputFile}" -vf "scale='if(gt(a,1024/600),1024,-1)':'if(gt(a,1024/600),-1,600)'" -q:v 2 -frames:v 1 "${outputFile}" && rm "${inputFile}"`, async (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });

        return null;
    });

    const response = new Response(null, {
        status: 303,
        headers: {
            Location: "/",
        },
    });
    
    return response;
}