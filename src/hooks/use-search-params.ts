import {useQueryState} from 'nuqs'


export default function useSearchParams(key: string) {
    return useQueryState(key,{defaultValue:'',clearOnDefault:true})
 
}