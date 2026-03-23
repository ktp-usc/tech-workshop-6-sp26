"use client";

import { useState } from "react";
import { inputCharacter } from "@/src/store/useCharactersStore";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (character: inputCharacter) => void;
};

export default function NewCharacter({ isOpen, onClose, onCreate }: Props) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [dateJoined, setDateJoined] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newCharacter: inputCharacter = {
            name,
            image,
            dateJoined,
        };

        onCreate(newCharacter);

        setName("");
        setImage("");
        setDateJoined("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Add New Character</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                            placeholder="Character name"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">Image URL</label>
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                            placeholder="https://..."
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">Date Joined</label>
                        <input
                            type="date"
                            value={dateJoined}
                            onChange={(e) => setDateJoined(e.target.value)}
                            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-lg border px-4 py-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 rounded-lg bg-black px-4 py-2 text-white"
                        >
                            Add Character
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}