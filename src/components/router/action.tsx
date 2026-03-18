import { type ActionFunctionArgs, redirect } from "react-router";

export async function action({request}: ActionFunctionArgs) {
    const formData = await request.formData();
    const type = formData.get("type") as string;
    const setsRaw = formData.getAll("set") as string[];
    const seed = formData.get("seed") as string;
    const sets = setsRaw.reduce((acc, cur) => acc + Number.parseInt(cur), 0);

    return !!sets && redirect(`/game/${type}/${sets}/${seed}`);
}
