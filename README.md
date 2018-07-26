# Deployment instruction

cd
sudo npm i -g cordova
cordova create cordocamera com.camera.cordova Cordocamera -d
cd cordocamera

cordova platform add android
cordova platform add browser
cordova platforms ls

cordova requirements

запустим в браузере
cordova serve
cordova run
cordova run browser

cordova build
cordova build android

cordova run android                                 # установить и запустить на устройстве
cordova run android --device                        #to deploy the app on a connected device
cordova run android --list

cordova emulate android                             #to deploy the app on a default android emulator




















sudo apt-get update

ставим java
sudo apt-get install openjdk-8-jdk

ставим gradle
sudo apt-get install gradle

http://www.rebelcode.ru/android/ustanovka-android-sdk-java-jdk-android-studio-v-ubuntu/

Введение в Cordova: Создание первого приложения - https://sohabr.net/habr/post/274763/

скачиваем инструменты для сборки на android - SDK Tools Only
https://developer.android.com/studio/#downloads

распаковываем архив в любое место (н-р, в Загрузки)
и перемещаем в /opt
sudo mv ~/Загрузки/tools /opt

cd /opt

#создадим папку sdk/ и дадим ей нужные привелегии
#sudo mkdir sdk
#sudo chown sanek:sanek sdk
#распаковать архив в папку sdk/

https://cordova.apache.org/docs/ru/latest/guide/platforms/android/index.html


откроем .zshrc и добавим переменные среды
# SDK
[[ -d /opt/tools ]] && {
    export ANDROID_HOME=/opt
    export PATH=${PATH}:/opt/tools
    export PATH=${PATH}:/opt/tools/bin
    export PATH=${PATH}:/opt/platform-tools
}

https://www.androidcentral.com/installing-android-sdk-windows-mac-and-linux-tutorial

#adb
sudo apt-get install lib32ncurses5 lib32stdc++6

перезапустим терминал
exec zsh


нужно установить пакеты для Android SDK Tools
офф. сайт Cordova (https://cordova.apache.org/docs/ru/latest/guide/platforms/android/index.html)
- Android 5.1.1 (API 22) platform SDK
- Android SDK Build-tools version 19.1.0 или выше
- Android Support Repository (Extras)

или (https://sohabr.net/habr/post/274763/)
- Android SDK Platform-tools
- SDK Platform of the latest Android API
- Android SDK Build-tools for the latest Android API (Android 6.0 at the time of writing)


создадим пустой файл чтобы не было такого: "Warning: File /home/sanek/.android/repositories.cfg could not be loaded.""
sudo touch ~/.android/repositories.cfg
sudo touch /root/.android/repositories.cfg

смотрим установленные и доступные пакеты
/opt/tools/bin/sdkmanager --list


примем лицензию для установки пакетов
/opt/tools/bin/sdkmanager --update && yes | /opt/tools/bin/sdkmanager --license

1) Android SDK Platform-tools
sudo /opt/tools/bin/sdkmanager "platform-tools"

2) SDK Platform of the latest Android API
sudo /opt/tools/bin/sdkmanager "platforms;android-26" "platforms;android-27" "platforms;android-28"

3) Android SDK Build-tools
sudo /opt/tools/bin/sdkmanager "build-tools;26.0.1" "build-tools;28.0.1"

4) Android Support Repository (Extras)
sudo /opt/tools/bin/sdkmanager "extras;android;m2repository"

#&& yes | /opt/tools/bin/sdkmanager --license


скачиваем пакет эмулятора
sudo /opt/tools/bin/sdkmanager "system-images;android-26;android-tv;x86" "system-images;android-28;google_apis;x86"

sudo /opt/tools/bin/avdmanager list target


принимаем лицензию
sudo /opt/tools/bin/sdkmanager --licenses

создаем эмулятор
sudo /opt/tools/bin/avdmanager -v create avd -n a26 -k "system-images;android-26;android-tv;x86"
sudo /opt/tools/bin/avdmanager -v create avd -n a28 -k "system-images;android-28;google_apis;x86"


sudo /opt/tools/bin/avdmanager list avd





cd cordocamera


Дописываем в package.json пакеты для gulp, babel, js, less

"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "gulp": "gulp"
},
"author": "Aleksandr Tsimbaluk",
"license": "Apache-2.0",
"dependencies": {
  "gulp": "^3.9.1",
  "cordova-android": "^7.0.0",
  "cordova-browser": "^5.0.3",
  "cordova-plugin-whitelist": "^1.3.3"
},
"devDependencies": {
  "babel-preset-es2015": "^6.24.1",
  "browser-sync": "^2.18.7",
  "del": "^2.2.2",
  "gulp": "^3.9.1",
  "gulp-autoprefixer": "^3.1.1",
  "gulp-babel": "^6.1.2",
  "gulp-concat": "^2.6.1",
  "gulp-cssnano": "^2.1.2",
  "gulp-less": "^3.3.0",
  "gulp-rename": "^1.2.2",
  "gulp-uglifyjs": "^0.6.2"
}


npm i

добавляем в проект gulpfile.js
