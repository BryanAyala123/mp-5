import UrlForm from "@/app/components/urlForm";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-pink-50 p-4">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-center text-2xl font-semibold text-pink-600">URL Shortener</h1>
        <UrlForm />
      </div>
    </main>
  );
}
