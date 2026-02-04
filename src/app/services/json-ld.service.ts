import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class JsonLdService {

    constructor(@Inject(DOCUMENT) private document: Document) { }

    insertSchema(schema: any) {
        let script = this.document.querySelector('script[type="application/ld+json"]');
        if (!script) {
            script = this.document.createElement('script');
            script.setAttribute('type', 'application/ld+json');
            this.document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(schema, null, 2);
    }
}
