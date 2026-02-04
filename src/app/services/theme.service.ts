import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private _darkMode = new BehaviorSubject<boolean>(false);
    darkMode$ = this._darkMode.asObservable();

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            const savedTheme = localStorage.getItem('theme');

            // Priority: Saved > Default (Obsidian/Dark)
            if (savedTheme === 'light') {
                this.setDark(false);
            } else {
                // Default to Dark ("Obsidian") if no preference or explicitly dark
                this.setDark(true);
            }
        }
    }

    toggle() {
        this.setDark(!this._darkMode.value);
    }

    private setDark(isDark: boolean) {
        this._darkMode.next(isDark);
        if (isPlatformBrowser(this.platformId)) {
            if (isDark) {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
        }
    }
}
