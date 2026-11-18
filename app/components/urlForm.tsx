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
            <form onSubmit={handleSubmit}>
                <label htmlFor="url">URL</label>
                <input
                    id="url"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/SUPERLONGURL"
                />

                <label htmlFor="alias">Alias</label>
                <input
                    id="alias"
                    type="text"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    placeholder="my-link"
                />

                <button
                    type="submit"
                    disabled={!url.trim() || !alias.trim()}
                >
                    Shorten
                </button>
            </form>

            {error && <p>{error}</p>}

            {shortUrl && (
                <div>
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                        {shortUrl}
                    </a>
                    <button
                        type="button"
                        onClick={handleCopy}
                    >
                        {copy ? "Copied!" : "Copy"}
                    </button>
                </div>
            )}
        </div>
    );
}
