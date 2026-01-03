import { useEffect, useRef, useState } from "react";
import { IvLookupAdapter } from "~/components/iv-lookup/iv-lookup.adapters";
import IvLookup from "~/components/iv-lookup/iv-lookup.component";
import { useIvLookupStore, type IvLookupRecord } from "~/components/iv-lookup/iv-lookup.funcs";
import { useQueryIvLookups } from "~/components/iv-lookup/iv-lookup.hooks";
import { SearchEventKind } from "~/components/search-bar/search-bar.enums";
import type { SearchEvent } from "~/components/search-bar/search-bar.types";
import { createSearchChain } from "~/core/data.funcs";
import type { SearchChain } from "~/core/data.types";

export default function IvLookupPage() {

    // Query
    const ivLookupCacheQuery = useQueryIvLookups();

    // State
    const [isLoadingRecords, setIsLoadingRecords] = useState<boolean>(true);
    
    const searchFilter = useIvLookupStore(state => state.searchFilter);
    const lookups = useIvLookupStore(state => state.lookups);
    const setSearchFilter = useIvLookupStore(state => state.setSearchFilter);
    const setLookups = useIvLookupStore(state => state.setLookups);
    const setLookupsView = useIvLookupStore(state => state.setLookupsView);

    // Local
    const searchChain = useRef<SearchChain<IvLookupRecord>>(createSearchChain<IvLookupRecord>());

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

    // Functions

    const getDefaultView = () => lookups.map(l => l);

    function resetChain(at?:number) {
        if(at !== undefined && at !== null) {
            at += 1;
        }
        searchChain.current.chainLinks.splice(at ?? 0);
    }

    function getChainSource(event:SearchEvent):IvLookupRecord[] {
        let chainSource:IvLookupRecord[] = [];
        const chain = searchChain.current;
        const oldValue = event.oldValue ?? "";
        const newValue = event.newValue ?? "";
        if(event.eventType == SearchEventKind.Add) {
            const trail = newValue.slice(0, newValue.length - 1);
            const lastLinkIdx = chain.chainLinks.findIndex(l => l.pattern === trail);
            if(lastLinkIdx === -1) {
                console.log(`Could not find link for '${trail}'. Using default.`);
                chainSource = getDefaultView();
                // If we can't find trailing history in the chain, assume it is a different value and reset the chain.
                // This ensures that we don't get weird filtering results from unrelated links.
                // E.g - Pasting
                resetChain();
            } else {
                chainSource = chain.chainLinks.at(lastLinkIdx)!.items;
                console.log(`Found link for '${trail}'.`);
                // Reset up to last trailing link
                resetChain(lastLinkIdx);
            }
        } else if (event.eventType == SearchEventKind.Delete) {
            const trail = newValue.slice(0, newValue.length - 1);
            const lastLinkIdx = chain.chainLinks.findIndex(l => l.pattern === trail);
            if(lastLinkIdx === -1) {
                console.log(`Could not find link for '${trail}'. Using default.`);
                chainSource = getDefaultView();
                // If we can't find trailing history in the chain, assume it is a different value and reset the chain.
                // This ensures that we don't get weird filtering results from unrelated links.
                // E.g - Pasting
                resetChain();
            } else {
                chainSource = chain.chainLinks.at(lastLinkIdx)!.items;
                console.log(`Found link for '${trail}'.`);
                // Reset up to last trailing link
                resetChain(lastLinkIdx);
            }
        } else {
            console.warn(`Text search event type was not recognized.`);
        }

        return chainSource;
    }

    function filterLookups(event:SearchEvent) {
        const searchCriteria = (event.newValue ?? "").toLocaleLowerCase();
        setSearchFilter(event.newValue);
        if(searchCriteria === "") {
            searchChain.current.chainLinks.length = 0; // Empty array
            searchChain.current.lastPattern = ""; // Empty search chain
            setLookupsView(getDefaultView());
        } else {
            let chainSource = getChainSource(event);
            const filtered = chainSource.filter(l => {
                const search = [l.itemCode, l.itemName, l.supplierItemCode].join("~").toLocaleLowerCase();
                return search.includes(searchCriteria);
            });
            searchChain.current.chainLinks.push({
                items: filtered,
                pattern: searchCriteria
            });
            searchChain.current.lastPattern = searchCriteria; // Store so we can determine whether the pattern incremented/decremented.

            console.log(searchChain.current);

            setLookupsView(filtered);
        }
    }

    return (
        <IvLookup isLoading={isLoadingRecords} onTextSearchEvent={(e) => filterLookups(e)}/>
    )

}