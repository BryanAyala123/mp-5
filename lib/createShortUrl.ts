"use server"
import { Result } from "@/type";
import getCollection, { URL_COLLECTION } from "@/db";

const URL_REGEX = /^https?:\/\/[\w-]+(\.[\w-]+)+(:\d+)?([/?#]\S*)?$/i;

export default async function createNewAlias(
    rawAlias: string,
    rawUrl: string,
) : Promise<Result> {
    const alias = rawAlias?.trim() ?? "";
    const url = rawUrl?.trim() ?? "";

    //Validation check
    if (!alias || !url) return { success: false, message: "Alias and URL are both required." };
    if (!URL_REGEX.test(url)) return { success: false, message: "Invalid URL. Make sure it starts with http:// or https://." };

    const urlCollection = await getCollection(URL_COLLECTION);
    const duplicate = await urlCollection.findOne({ alias });
    if (duplicate) return { success: false, message: "That alias already exists." };

    //insert
    const res = await urlCollection.insertOne({ alias, url });
    if (!res.acknowledged) return { success: false, message: "Please try again." };

    return { success: true, message: "Short URL created!" };
}
