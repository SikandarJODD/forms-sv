import type { DocsType } from "$lib/examples/all-merge/type";
import { snap_crud } from "../crud/docs";
import { snap_debounce_username } from "../debounce-username/docs";
import { snap_imagevalidations } from "../image-validation/docs";
import { snap_multipleforms } from "../multiple-forms/docs";
import { snap_simpleform } from "../simple/docs";



export let all_formsnap_examples: DocsType[] = [
    snap_simpleform,
    snap_multipleforms,
    snap_imagevalidations,
    snap_debounce_username,
    snap_crud
]