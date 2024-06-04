import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import * as fs from "fs/promises";

import "dotenv/config";


export const meta: MetaFunction = () => {
    return [
        { title: "PhotoCrust" },
        { name: "description", content: "Raspberry Pi Digital Photo Frame" },
    ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const photos = await fs.readdir(process.env.PHOTOS_DIRECTORY ?? "./photos/");
    return { photos };
}

export default function Index() {
    const data = useLoaderData<typeof loader>();
    return (
        <main>
            <div className="navbar bg-base-100">
                <h1 className="btn btn-ghost text-xl">PhotoCrust</h1>
            </div>

            <Form method="post" action="upload" className="px-6" encType="multipart/form-data">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Upload Photos</span>
                    </div>
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs" multiple accept="image/*" name="photos" required />
                    <button type="submit" className="btn btn-primary mt-4"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M74.34 77.66a8 8 0 0 1 0-11.32l48-48a8 8 0 0 1 11.32 0l48 48a8 8 0 0 1-11.32 11.32L136 43.31V128a8 8 0 0 1-16 0V43.31L85.66 77.66a8 8 0 0 1-11.32 0M240 136v64a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h68a4 4 0 0 1 4 4v3.46c0 13.45 11 24.79 24.46 24.54A24 24 0 0 0 152 128v-4a4 4 0 0 1 4-4h68a16 16 0 0 1 16 16m-40 32a12 12 0 1 0-12 12a12 12 0 0 0 12-12" /></svg> Upload</button>
                </label>
            </Form>
            <div className="px-6">
                <h2 className="text-2xl font-bold mt-4 mb-4">Photos {`(${data.photos.length})`}</h2>
                <label htmlFor="confirmation" className="btn btn-error mb-4">Delete All Photos</label>
                <input type="checkbox" id="confirmation" className="modal-toggle" />
                <div className="modal" role="dialog">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Are you sure?</h3>
                        <p className="py-4">This option will delete all of your photos.</p>
                        <div className="modal-action">
                                <label htmlFor="confirmation" className="btn">Cancel</label>
                                <Form method="post" action="deleteAll">
                                    <button type="submit" className="btn btn-error">Delete All Photos</button>
                                </Form>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-4 mx-auto">
                    {data.photos.map((photo) => (
                        <Form method="post" action="delete" key={photo}>
                            <input type="hidden" name="photo" value={photo} />
                            <img src={`/photo/${photo}`} key={photo} className="w-24 rounded-md" alt={photo} />
                            <button type="submit" className="link link-error mx-auto mt-2 text-sm">Delete</button>

                        </Form>
                    ))}
                </div>
            </div>

        </main>
    );
}
