import { client_server_docs } from "../client-server/docs";
import { crud_form } from "../crud/docs";
import { debounce_username_docs } from "../debounce-username/docs";
import { image_validation } from "../image-validation/docs";
import { multi_step_client } from "../multi-step-client/docs";
import { multi_step_server } from "../multi-step-server/docs";
import { multiple_forms } from "../multiple-forms/docs";
import { superforms_docs } from "../superforms/docs";
import { svelteZod } from "../zod-validation/docs";

import type { DocsType } from "./type";

export let allExamples: DocsType[] = [
    svelteZod,
    multiple_forms,
    image_validation,
    debounce_username_docs,
    client_server_docs,
    superforms_docs,
    crud_form,
    multi_step_server,
    multi_step_client
]