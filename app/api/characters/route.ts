// app/api/characters/route.ts
import { NextResponse } from "next/server";
import path from "node:path";
import {readFile} from "node:fs/promises";
import type {Character} from "@/src/store/useCharactersStore";
import {writeFile} from "node:fs/promises";
import {randomUUID} from "node:crypto";
import { prisma } from "@/lib/prisma"; //


export async function GET() {
    try {
        // Example external API OR database call
        // const filePath = path.join(process.cwd(), "data", "characters.json");
        // const fileContents = await readFile(filePath, "utf8");
        const characters = await prisma.character.findMany({

        });
        return NextResponse.json(characters);
    } catch {
        return NextResponse.json(
            { error: "Unexpected error fetching characters" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, image, dateJoined } = body;

        if (!name || !image || !dateJoined) {
            return NextResponse.json(
                { error: "Missing required fields: name, image, dateJoined" },
                { status: 400 }
            );
        }

        const newCharacter = await prisma.character.create({
            data: {
                name,
                image,
                dateJoined,
            },
        });

        return NextResponse.json(newCharacter, { status: 201 });
    } catch (error) {
        console.error("Error creating character:", error);
        return NextResponse.json(
            { error: "Unexpected error creating character" },
            { status: 500 }
        );
    }
}


export async function PUT(request: Request) {
    try{
        const body = await request.json();
        const {id, name, image, dateJoined} = body;

        if(!id){
            return NextResponse.json(
                { error: "Missing required fields: id, name, image, dateJoined" },
                { status: 400 }
            );
        }
        const filePath = path.join(process.cwd(), "data", "characters.json");
        const fileContents = await readFile(filePath, "utf8");
        const characters: Character[] = JSON.parse(fileContents);

        const index = characters.findIndex((c: Character) => c.id === id);

        characters[index] = {
            id,
            name,
            image,
            dateJoined,
        };


        await writeFile(filePath, JSON.stringify(characters, null, 2), "utf8");

        return NextResponse.json(characters[index], { status: 201 });
    } catch (error) {
        console.error("Error creating character:", error);
        return NextResponse.json(
            { error: "Unexpected error creating character" },
            { status: 500 }
        );

    }
}


export async function DELETE(request: Request) {
    try{
        const body = await request.json();
        const {id} = body;

        if(!id){
            return NextResponse.json(
                { error: "Missing required fields: id" },
                { status: 400 }
            );
        }
        const existingCharacter = await prisma.character.findUnique({
            where: { id },
        });


        await prisma.character.delete({
            where: { id },
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error deleting character:", error);
        return NextResponse.json(
            { error: "Unexpected error deleting character" },
            { status: 500 }
        );

    }
}