import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, FilesystemDirectory } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
const { Filesystem , Camera} = Plugins;

@Injectable({
    providedIn: 'root'
})
export class CameraService {
    photo: SafeResourceUrl;
    constructor(private sanitizer: DomSanitizer) {}

    async getPhoto() {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
        });
        this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
        return image.dataUrl;
      }

      async getFromPhotos() {
        const image = await Plugins.Camera.getPhoto({
          quality: 100,
          width: 400,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Prompt
        });
        console.log('Got image back', image.path, image.webPath, image.format, image.exif);
        return this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
      }

      async takePicture() {
        const image = await Plugins.Camera.getPhoto({
          quality: 100,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Camera
        });

        return this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
      }

      async takePictureFile() {
        const image = await Plugins.Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Uri
        })
        console.log('Got image back', image.path, image.webPath, image.format, image.exif);

        const imageData = await Filesystem.readFile({
          path: image.path
        });

        await Filesystem.writeFile({
          path: 'cool-photo.jpg',
          directory: FilesystemDirectory.Data,
          data: imageData.data
        });

        let stat = await Plugins.Filesystem.stat({
          path: 'cool-photo.jpg',
          directory: FilesystemDirectory.Data
        });

        console.log(stat);
        const imageUrl = image.webPath;
        return this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
      }

      async testAndroidBreak() {
        const image = await Plugins.Camera.getPhoto({
          allowEditing: false,
          correctOrientation: true, // <------------ oups
          height: 1080,
          width: 1080,
          quality: 90,
          resultType: CameraResultType.DataUrl,
          saveToGallery: false, 
          source: CameraSource.Photos
        });
        console.log('Got image back', image.path, image.webPath, image.format, image.exif);
        return this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
      }
}