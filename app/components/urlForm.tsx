"use client";
import { useState } from "react";
import createNewAlias from "@/lib/createShortUrl";

export default function UrlForm(){
    const [url, setUrl] = useState('');
    const [alias, setAlias] = useState('');
    const [error, setError] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [copy, setCopy] = useState(false);

    async function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        setError('');
        setShortUrl('');
        setCopy(false);

        const result = await createNewAlias(alias, url);

        if (result.success) {
            setShortUrl(`${window.location.origin}/${alias.trim()}`);
        } else {
            setError(result.message);
        }
    }

    async function handleCopy() {
        await navigator.clipboard.writeText(shortUrl);
        setCopy(true);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label htmlFor="url" className="mb-1 text-sm text-pink-700">URL</label>
                <input
                    id="url"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/SUPERLONGURL"
                    className="mb-4 border border-pink-200 bg-white px-3 py-2 placeholder:text-pink-300 focus:border-pink-400 focus:outline-none"
                />

                <label htmlFor="alias" className="mb-1 text-sm text-pink-700">Alias</label>
                <input
                    id="alias"
                    type="text"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    placeholder="your-custom-alias"
                    className="mb-6 border border-pink-200 bg-white px-3 py-2 placeholder:text-pink-300 focus:border-pink-400 focus:outline-none"
                />

                <button
                    type="submit"
                    disabled={!url.trim() || !alias.trim()}
                    className="bg-pink-500 py-2 text-white hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-pink-200"
                >
                    Shorten
                </button>
            </form>

            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

            {shortUrl && (
                <div className="mt-4 flex items-center justify-between gap-2 border border-pink-200 bg-white px-3 py-2">
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="truncate text-pink-600 hover:underline">
                        {shortUrl}
                    </a>
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="shrink-0 border border-pink-300 px-3 py-1 text-sm text-pink-600 hover:bg-pink-100"
                    >
                        {copy ? "Copied!" : "Copy"}
                    </button>
                </div>
            )}
        </div>
    );
}
