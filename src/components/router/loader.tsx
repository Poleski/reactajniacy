import type { LoaderFunctionArgs } from "react-router";
import type { ILoaderParams, IReadyData } from "../../models/data.models";
import { getWords } from "../../utils/getWords";

export async function loader({
    params,
}: LoaderFunctionArgs<ILoaderParams>): Promise<{
    words: IReadyData[];
    schemaMap: string[]
} | undefined> {
    const {type, set, seed} = params;
    if (!type || !set || !seed) {
        return;
    }

    const data: { words: IReadyData[]; schemaMap: string[] } = await getWords(
        {type, set, seed},
    );

    return await data;
}
