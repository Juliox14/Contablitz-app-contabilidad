import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const readPdfText = () => {
    const filePath = path.resolve(process.cwd(), "public", "NIF_Contablito.txt");
    return fs.readFileSync(filePath, "utf8");
};

const schema = {
    type: Type.OBJECT,
    properties: {
        respuesta: {
            type: Type.STRING,
            description: "Respuesta del asistente Contablito",
            nullable: false
        },
        sugerencias: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING
            },
            description: "Preguntas sugeridas relacionadas"
        }
    },
    required: ["respuesta", "sugerencias"],
    propertyOrdering: ["respuesta", "sugerencias"]
};

export async function POST(req: NextRequest) {
    const { userInput, chatHistory } = await req.json();
    const contenidoNIF = readPdfText();

    const esSaludoInicial = userInput.trim().toLowerCase() === "saludo_inicial";


    const prompt = esSaludoInicial
        ? `Genera un saludo breve, amable y entusiasta como asistente virtual experto en Normas de Información Financiera. Incluye una pequeña invitación a preguntar, y sugiere de forma natural 2 o 3 preguntas. Responde estrictamente en formato JSON así:

        {
            "respuesta": "Tu saludo personalizado aquí",
            "sugerencias": ["Pregunta 1", "Pregunta 2", "Pregunta 3"]
        }`
                : `Pregunta del usuario:
        ${userInput}

        Responde en formato JSON con:
        {
        "respuesta": "Tu respuesta aquí",
        "sugerencias": ["Pregunta 1", "Pregunta 2", "Pregunta 3"]
    }`;


    try {
        const result: any = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [{ parts: [{ text: prompt }] }],
            config: {
                systemInstruction: `
                    Eres Contablito, el asistente virtual oficial de la aplicación Contablitz.

                    Tu función es ayudar exclusivamente a resolver dudas relacionadas con las Normas de Información Financiera (NIF) en México. 
                    Eres amigable, claro, preciso, y profesional. Hablas con un lenguaje accesible para estudiantes y personas que están aprendiendo contabilidad.

                    **No saludes** a menos que sea la **primera vez en todo el historial** que el usuario te escribe, o **solo si el usuario dice explícitamente "hola" o "buenas" como mensaje completo**. Si ya has escrito alguna respuesta antes, **está estrictamente prohibido volver a saludar, aunque lo olvides**.

                    Usa este historial para saber si ya saludaste:
                    ${chatHistory.map((m: any) => `${m.emisor === "usuario" ? "Usuario" : "Contablito"}: ${m.texto}`).join("\n")}

                    Otras reglas:
                    - Solo debes responder preguntas relacionadas con las NIF.
                    - Si el usuario hace una pregunta fuera del tema o dice algo sin sentido lógico, responde educadamente que solo puedes responder sobre las NIF e invita a formular una nueva pregunta relacionada.
                    - Si la pregunta sobre las NIF o contabilidad puede responde únicamente con la siguiente información ${contenidoNIF}  hazlo, si no se puede pero es algo relacionado con la contabilidad o las NIF (en México) puedes usar alguna fuente de información de tu elección.
                    - Usa emojis para hacer la conversación más amena, pero no en exceso. Usa un emoji o dos (no es estrictamente necesario, a tu consideración) por respuesta.
                    - Puedes usar markdown menos para banderas o emojis
                    - Las preguntas sugeridas deben de ser cortas y relacionadas con el tema de las NIF. No uses preguntas que ya han sido respondidas en el historial de conversación.
                    
                    - Responde con el siguiente formato JSON:
                    {
                    "respuesta": "Tu respuesta aquí",
                    "sugerencias": ["Pregunta 1", "Pregunta 2", "Pregunta 3"]
                    }
                `,
                responseMimeType: "application/json",
                responseSchema: schema
            }
        });

        const json = JSON.parse(result.candidates[0].content.parts[0].text);

        return new Response(JSON.stringify(json), { status: 200 });
    } catch (error) {
        console.error("Error al generar contenido estructurado:", error);
        return new Response(JSON.stringify({ error: "Fallo al generar respuesta" }), { status: 500 });
    }
}
