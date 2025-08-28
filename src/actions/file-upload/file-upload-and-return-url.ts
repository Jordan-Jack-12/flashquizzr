"use server"

import { APIKEY, BUCKET_URL } from "@/lib/constants";

export async function uploadPdf(file: Blob) {
    const date = new Date().toISOString();

    try {
        const res = await fetch(`${BUCKET_URL}/temp-files/public/${date}.pdf`, {
            method: 'POST',
            headers: {
                'x-upsert': 'true',
                'apikey': APIKEY,
                'Authorization': `Bearer ${APIKEY}`
            },
            body: file
        })
        if (!res.ok) {
            console.log("something is wrong", (await res.text()))
            return null;
        }
        return {
            fileUri: `${BUCKET_URL}/object/public/temp-files/public/${date}.pdf`,
            mimeType: "application/pdf",
        }

    } catch (error) {
        console.log(error)
        return null;
    }
}

export async function uplaodImages(file:Blob) {
    const date = new Date().toISOString();
    const fileType = (file.type).split('/').at(1);

    try {
        const res = await fetch(`${BUCKET_URL}/temp-files/public/${date}.${fileType}`, {
            method: 'POST',
            headers: {
                'x-upsert': 'true',
                'apikey': APIKEY,
                'Authorization': `Bearer ${APIKEY}`
            },
            body: file
        })
        if (!res.ok) {
            console.log("something is wrong", (await res.text()))
            return null;
        }
        return {
            fileUri: `${BUCKET_URL}/object/public/temp-files/public/${date}.${fileType}`,
            mimeType: `image/${fileType}`,
        }

    } catch (error) {
        console.log(error)
        return null;
    }
}