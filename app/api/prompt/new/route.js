import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";


export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();
    console.log("userId : ", userId);
    console.log("prompt : ", prompt);
    console.log("tag : ", tag);

    try {
        await connectToDB();
        const newPrompt = new Prompt({
            prompt,
            creator: userId,
            tag
        });
        await newPrompt.save();
        console.log("New Prompt : ", newPrompt);
        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        return new Response("Failed to create a new prompt.", { status: 500 })
    }
}