import { notFound, redirect } from "next/navigation";
import getCollection, { URL_COLLECTION } from "@/db";

export const instant = false;

export default async function AliasRedirect({params}: {
    params: Promise<{ alias: string }>;
}) {
    const { alias } = await params;

    const urlCollection = await getCollection(URL_COLLECTION);
    const doc = await urlCollection.findOne({ alias });

    if (!doc) notFound();

    redirect(doc.url);
}
