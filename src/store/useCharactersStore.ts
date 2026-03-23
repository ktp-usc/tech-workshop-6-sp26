import { create } from "zustand";
import { persist } from "zustand/middleware";


export type Character = {
    id: string;
    name: string;
    image: string;
    dateJoined: string;
};

export type inputCharacter = {
    name: string;
    image: string;
    dateJoined: string;
}

type CharacterState ={
    characters: Character[];
    setCharacters: (m: Character[]) => void;
    addCharacter: (c:Character)=>void;
    getCharacterById: (id: string) => Character | undefined;
};

export const useCharactersStore = create<CharacterState>()(
    persist(
        (set, get) => ({
            characters: [],
            setCharacters: (m: Character[]) => set({ characters: m }),
            addCharacter: (c: Character) =>
                set((state) => ({ characters: [...state.characters, c] })),
            getCharacterById: (id: string) =>
                get().characters.find((x: Character) => x.id === id),
        }),
        {
            name: "characters-storage",
        }
    )
);

