import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// PB
import { IvLookupConst } from "./iv-lookup.constants";
import { useIvLookupStore } from "./iv-lookup.funcs";
import { parseAsResult } from "~/core/services/api/api.funcs";

const getIvLookupsCache = async () => {

    // TODO: Add env for host
    const url = "https://localhost:7255/api/";

    const result = await axios.post(url + IvLookupConst.queries.getLookups.api, {
        "parent_path": "/"
    });

    const apiResult = parseAsResult(result.data);

    return result.status === 200 ? apiResult : Promise.reject(result);
}

export const useQueryIvLookups = () => useQuery({
    queryKey: [IvLookupConst.queries.getLookups.key],
    queryFn: getIvLookupsCache
});