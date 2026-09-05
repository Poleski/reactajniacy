import type { LoaderFunctionArgs } from "react-router";
import type { ILoaderParams} from "../../models/data.models";
import { getWords } from "../../utils/getWords";

export async function loader({
    request,
    params,
}: LoaderFunctionArgs<ILoaderParams>) {
    const {type, set, seed} = params;
    const coop = request.url.includes('/coop/') || request.url.includes('/bosscoop/');

    if (!type || !set || !seed) {
        return;
    }

    const data= await getWords(
        {
            type,
            set,
            seed,
            coop
        }
    );

    return await data;
}
