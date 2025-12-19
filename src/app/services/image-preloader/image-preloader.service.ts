import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ImagePreloaderService {
    private imagesLoaded: number = 0;
    private totalImages: number = 0;

    constructor() { }

    preloadImages(urls: string[]): Promise<void> {
        this.totalImages = urls.length;
        this.imagesLoaded = 0;

        return new Promise<void>((resolve) => {
            if (this.totalImages === 0) {
                resolve();
                return;
            }

            urls.forEach(url => {
                const img = new Image();
                img.src = url;
                img.onload = () => {
                    this.imagesLoaded++;
                    if (this.imagesLoaded === this.totalImages) {
                        resolve();
                    }
                };
                img.onerror = () => {
                    // Si falla una imagen, continuamos para no bloquear la app
                    console.warn(`Failed to load image: ${url}`);
                    this.imagesLoaded++;
                    if (this.imagesLoaded === this.totalImages) {
                        resolve();
                    }
                };
            });
        });
    }
}
