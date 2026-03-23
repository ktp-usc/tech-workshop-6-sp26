// hooks/useCharacters.ts
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type { Character } from "@/src/store/useCharactersStore";

async function fetchCharacters(): Promise<Character[]> {
    const res = await fetch("/api/characters");
    if (!res.ok) throw new Error("Failed to fetch characters");
    return res.json();
}

export function useCharacters() {
    return useQuery({
        queryKey: ["characters"],
        queryFn: fetchCharacters,
    });
}



export function useDeleteCharacter() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/characters`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) {
                throw new Error("Failed to delete character");
            }

            return res.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["characters"] });
        },
    });
}