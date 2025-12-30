import { useEffect, useState } from "react";
import { IvLookupAdapter } from "~/components/iv-lookup/iv-lookup.adapters";
import IvLookup from "~/components/iv-lookup/iv-lookup.component";
import { useIvLookupStore } from "~/components/iv-lookup/iv-lookup.funcs";
import { useQueryIvLookups } from "~/components/iv-lookup/iv-lookup.hooks";

export default function IvLookupPage() {

    // Query
    const ivLookupCacheQuery = useQueryIvLookups();
    const setLookups = useIvLookupStore(state => state.setLookups);

    // State
    const [isLoadingRecords, setIsLoadingRecords] = useState<boolean>(true);

    useEffect(() => {
        
        if(ivLookupCacheQuery.isPending) {
            if(!isLoadingRecords) {
                setIsLoadingRecords(true);
            }
        } else {
            setIsLoadingRecords(false);
            if(ivLookupCacheQuery.isError) {
                // TODO: Do something
            } else {
                const queryResult = ivLookupCacheQuery.data;
                const records = queryResult?.data?.records.map(r => IvLookupAdapter.fromJson(r)) ?? [];
                setLookups(records);
            }
        }

    }, [ivLookupCacheQuery.status]);

    return (
        <IvLookup isLoading={isLoadingRecords}/>
    )

}