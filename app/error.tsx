"use client";

export default function Error({ error }: { error: Error }) {
    return (
        <div className="p-8">
            <p className="text-red-500">Something went wrong: {error.message}</p>
        </div>
    );
}
