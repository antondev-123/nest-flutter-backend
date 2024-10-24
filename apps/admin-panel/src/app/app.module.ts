import { BrowserModule, Title } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedModule } from './@components/shared.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ar_EG,
  de_DE,
  en_US,
  es_ES,
  fr_FR,
  hy_AM,
  ja_JP,
  ko_KR,
  NZ_DATE_LOCALE,
  NZ_I18N,
  pt_PT,
  ro_RO,
  ru_RU,
  zh_CN,
} from 'ng-zorro-antd/i18n';
import { GraphQLModule } from './graphql.module';
import { TimeagoModule } from 'ngx-timeago';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  UserOutline,
  ContainerOutline,
  CustomerServiceOutline,
  GlobalOutline,
  BulbOutline,
  NotificationOutline,
  BankOutline,
  CarOutline,
  FundOutline,
  ControlOutline,
  PlusOutline,
  DashboardOutline,
  MenuFoldOutline,
  LogoutOutline,
  MenuUnfoldOutline,
  ArrowLeftOutline,
  DeleteOutline,
  PictureTwoTone,
  ExportOutline,
  InboxOutline,
  DownloadOutline,
  LockOutline,
  EyeInvisibleOutline,
  FieldTimeOutline,
  ScheduleOutline,
  FolderOpenOutline,
  AlertOutline,
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { ApolloModule } from 'apollo-angular';
import {
  enUS,
  es,
  fr,
  de,
  ar,
  hy,
  ko,
  ru,
  zhCN,
  ja,
  pt,
  ro,
} from 'date-fns/locale';

const icons: IconDefinition[] = [
  UserOutline,
  ContainerOutline,
  CustomerServiceOutline,
  GlobalOutline,
  BulbOutline,
  NotificationOutline,
  BankOutline,
  CarOutline,
  FundOutline,
  ControlOutline,
  PlusOutline,
  DashboardOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  LogoutOutline,
  ArrowLeftOutline,
  DeleteOutline,
  PictureTwoTone,
  ExportOutline,
  InboxOutline,
  DownloadOutline,
  LockOutline,
  EyeInvisibleOutline,
  FieldTimeOutline,
  ScheduleOutline,
  FolderOpenOutline,
  AlertOutline,
];
registerLocaleData(en);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    SharedModule,
    HttpClientModule,
    GraphQLModule,
    NzIconModule.forRoot(icons),
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    TimeagoModule.forRoot(),
  ],
  providers: [
    {
      provide: NZ_DATE_LOCALE,
      useFactory: () => {
        const lang = localStorage.getItem('lang') ?? 'en';
        switch (lang) {
          case 'en':
            return enUS;

          case 'es':
            return es;

          case 'fr':
            return fr;

          case 'de':
            return de;

          case 'ar':
            return ar;

          case 'hy':
            return hy;

          case 'ko':
            return ko;

          case 'ru':
            return ru;

          case 'zh':
            return zhCN;

          case 'ja':
            return ja;

          case 'pt':
            return pt;

          case 'ro':
            return ro;

          default:
            return enUS;
        }
      },
    },
    {
      provide: NZ_I18N,
      //useValue: en_US,
      useFactory: (localId: string) => {
        const lang = localStorage.getItem('lang') ?? 'en';
        switch (lang) {
          case 'en':
            return en_US;

          case 'es':
            return es_ES;

          case 'fr':
            return fr_FR;

          case 'de':
            return de_DE;

          case 'ar':
            return ar_EG;

          case 'hy':
            return hy_AM;

          case 'ko':
            return ko_KR;

          case 'ru':
            return ru_RU;

          case 'zh':
            return zh_CN;

          case 'ja':
            return ja_JP;

          case 'pt':
            return pt_PT;

          case 'ro':
            return ro_RO;

          default:
            return en_US;
        }
      },
      deps: [LOCALE_ID],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private title: Title, private translator: TranslateService) {
    translator.get('branding.page.title').subscribe((x) => {
      title.setTitle(x);
    });
  }
}
