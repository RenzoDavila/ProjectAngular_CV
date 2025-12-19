import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ImagePreloaderService } from './services/image-preloader/image-preloader.service';
import { DataTechnologies } from './consts/DataTechnologies.const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  isLoading = true;
  title = 'CV2022';

  constructor(
    public translate: TranslateService,
    private imagePreloader: ImagePreloaderService
  ) {
    translate.addLangs(['es', 'en']);
    const lang = translate.getBrowserLang();
    if (lang !== 'es' && lang !== 'en') {
      translate.setDefaultLang('en');
      translate.use('en');
    } else {
      translate.setDefaultLang(lang);
      translate.use(lang);
    }
  }

  ngOnInit(): void {
    this.loadAssets();
  }

  loadAssets() {
    const assetsToLoad = [
      // General UI
      'assets/icon/general/arrow-left.svg',
      'assets/icon/general/arrow-right.svg',
      'assets/icon/general/desk.svg',
      'assets/icon/general/chair.svg',
      'assets/icon/general/me.svg',
      'assets/icon/general/arrow-back.svg',
      'assets/icon/texts-balloons/text-box.svg',
      'assets/icon/texts-balloons/text-balloon.svg',
      // Screens (Initial)
      'assets/icon/screens/screen-main-main.svg',
      'assets/icon/screens/sub-screen-main-main.svg'
    ];

    // Add Technologies
    DataTechnologies.forEach(tech => {
      assetsToLoad.push(`assets/icon/technologies/${tech.tag}.svg`);
    });

    this.imagePreloader.preloadImages(assetsToLoad).then(() => {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    });
  }
}
