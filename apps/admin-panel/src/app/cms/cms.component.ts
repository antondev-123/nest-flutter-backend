import {
  Component,
  OnInit,
  HostBinding,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { mainPageSwitchTransition } from '../@animations/main.animation';
import { sq_AL } from '../sq';

import { TranslateService } from '@ngx-translate/core';
import {
  ar_EG,
  de_DE,
  en_US,
  es_ES,
  fr_FR,
  hy_AM,
  ja_JP,
  ko_KR,
  NzI18nService,
  pt_PT,
  ru_RU,
  zh_CN,
  ro_RO,
} from 'ng-zorro-antd/i18n';
import {
  enUS,
  sq,
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
import {
  ComplaintSubscriptionGQL,
  NotificationsQuery,
  SosSubscriptionGQL,
} from '@ridy/admin-panel/generated/graphql';
import { map, Observable, Subscription } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import { ThemeService } from '../@services/theme.service';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css'],
  animations: [mainPageSwitchTransition],
})
export class CMSComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('@mainPageSwitchTransition') state = 'activated';
  isCollapsed = true;
  isDarkMode = false;
  stats!: Observable<ApolloQueryResult<NotificationsQuery>>;
  newSos = 0;
  newComplaints = 0;
  sosSubription?: Subscription;
  complaintSubscription?: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notification: NzNotificationService,
    private sosSub: SosSubscriptionGQL,
    private complaintSub: ComplaintSubscriptionGQL,
    private translate: TranslateService,
    private i18n: NzI18nService,
    public themeService: ThemeService
  ) {}

  ngAfterViewInit(): void {
    this.sosSubription = this.sosSub.subscribe().subscribe((data) => {
      const sos = data.data?.sosCreated;
      if (sos == null) return;
      this.newSos += 1;
      this.playNotificationSound();
      this.notification.error('SOS', 'A SOS has been made.', {
        nzKey: 'sos',
      });
    });
    this.complaintSubscription = this.complaintSub
      .subscribe()
      .subscribe((data) => {
        const complaint = data.data?.complaintCreated;
        if (complaint == null) return;
        this.newComplaints += 1;
        this.playNotificationSound();
        this.notification.error('Complaint', 'A Complaint has been made.', {
          nzDuration: 0,
          nzKey: 'complaint',
        });
      });
  }

  ngOnDestroy(): void {
    this.sosSubription?.unsubscribe();
    this.complaintSubscription?.unsubscribe();
  }

  playNotificationSound() {
    const audio = new Audio();
    audio.src = '/assets/sounds/notification.mp3';
    audio.load();
    audio.play();
  }

  ngOnInit(): void {
    this.stats = this.route.data.pipe(map((data) => data.notifications));
  }

  logout() {
    localStorage.removeItem('ridy_admin_token');
    this.router.navigate(['login'], { relativeTo: this.route.root });
    window.location.reload();
  }

  changeLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem('lang', language);
    switch (language) {
      case 'en':
        this.i18n.setLocale(en_US);
        this.i18n.setDateLocale(enUS);
        break;
      case 'sq':
        this.i18n.setLocale(sq_AL);
        this.i18n.setDateLocale(sq);
        break;
      case 'es':
        this.i18n.setLocale(es_ES);
        this.i18n.setDateLocale(es);
        break;
      case 'fr':
        this.i18n.setLocale(fr_FR);
        this.i18n.setDateLocale(fr);
        break;
      case 'de':
        this.i18n.setLocale(de_DE);
        this.i18n.setDateLocale(de);
        break;
      case 'ar':
        this.i18n.setLocale(ar_EG);
        this.i18n.setDateLocale(ar);
        break;
      case 'hy':
        this.i18n.setLocale(hy_AM);
        this.i18n.setDateLocale(hy);
        break;
      case 'ko':
        this.i18n.setLocale(ko_KR);
        this.i18n.setDateLocale(ko);
        break;
      case 'ru':
        this.i18n.setLocale(ru_RU);
        this.i18n.setDateLocale(ru);
        break;
      case 'zh':
        this.i18n.setLocale(zh_CN);
        this.i18n.setDateLocale(zhCN);
        break;
      case 'ja':
        this.i18n.setLocale(ja_JP);
        this.i18n.setDateLocale(ja);
        break;

      case 'pt':
        this.i18n.setLocale(pt_PT);
        this.i18n.setDateLocale(pt);
        break;

      case 'ro':
        this.i18n.setLocale(ro_RO);
        this.i18n.setDateLocale(ro);
        break;
    }
  }
}
