
import Image from "next/image";
import type { Character } from "@/src/store/useCharactersStore.ts";
import edit from "@/public/square-pen.svg";
import trash from "@/public/trash-2.svg";
import { useDeleteCharacter } from "@/hooks/use-Characters";



export default function MemberCard({character}: {character: Character}) {
    const deleteMutation = useDeleteCharacter();

    return (
        <div className="bg-white border-2 rounded-2xl p-4">
            <div className="flex px-4 justify-between">

                <button></button>
                <button className="cursor-pointer" onClick={() => deleteMutation.mutate(character.id)}><Image src={trash} alt="delete"/></button>
            </div>
            <div>
                <Image src={character.image} alt={character.name} width={200} height={200} className="justify-self-center w-[200px] h-[200px] rounded-full object-cover"/>
                <h1 className={"justify-self-center font-bold"}>{character.name}</h1>
                <h1 className={"justify-self-center"}>Joined {character.dateJoined}</h1>
            </div>
        </div>
    );
}