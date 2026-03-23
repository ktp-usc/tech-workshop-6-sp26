"use client";
import Image from "next/image";
import MemberCard from "../components/shared/memberCard";
import NewCharacter from "../components/shared/newCharacter";
import { useCharacters } from "@/hooks/use-Characters";
import plus from "@/public/plus.svg";
import { useState } from "react";
import {Character, inputCharacter} from "@/src/store/useCharactersStore";
import {useMutation, useQueryClient} from "@tanstack/react-query";


export default function Home() {
  const[isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error } = useCharacters();
  const queryClient = useQueryClient();
    const createCharacterMutation = useMutation({
        mutationFn: async (newCharacter: inputCharacter) => {
            const res = await fetch("/api/characters", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCharacter),
            });

            if (!res.ok) {
                throw new Error("Failed to create character");
            }

            return res.json();
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["characters"] });
            setIsOpen(false);
        },
    });
  if(isLoading) return <div>Loading</div>;

  if(error) return <div>Error: {error.message}</div>;
    data?.map((character) => {
        console.log(character.image);
    })
  return (
      <div>
        <div className="bg-white width-full height-full pd-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {data?.map(characterObj => (
                <MemberCard key={characterObj.id} character={characterObj}></MemberCard>
            ))}
        </div>

          <button onClick={()=>setIsOpen(true)}
              className="border-2 px-4 p-2 rounded-full text-3xl flex space-between justify-self-center cursor-pointer">Add New
            <Image src={plus} alt="Add new image" width={30} height={30} />
          </button>

          <NewCharacter
              isOpen={ isOpen }
              onClose={() => setIsOpen(false)}
              onCreate={(character: inputCharacter) => {
                  console.log(character);
                  createCharacterMutation.mutate(character)
              }}
          />
      </div>
  );
}
