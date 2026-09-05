import { type ActionFunctionArgs, redirect } from "react-router";

export async function action({request}: ActionFunctionArgs) {
    const formData = await request.formData();
    const type = formData.get("type");
    const setsRaw = formData.getAll("set") as string[];
    const seed = formData.get("seed");
    const isCoop = formData.get("coop") === "on";
    const sets = setsRaw.reduce((acc, cur) => acc + Number.parseInt(cur), 0);
    const gameUrlPart = isCoop ? "coop" : 'game';

    return !!sets && redirect(`/${gameUrlPart}/${type}/${sets}/${seed}`);
}
