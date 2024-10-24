import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  CreateAnnouncementGQL,
  DeleteAnnouncementGQL,
  UpdateAnnouncementGQL,
  ViewAnnouncementQuery,
} from '@ridy/admin-panel/generated/graphql';
import { RouterHelperService } from '@ridy/admin-panel/src/app/@services/router-helper.service';
import { firstValueFrom, Subscription } from 'rxjs';

@Component({
  selector: 'app-announcement-view',
  templateUrl: './announcement-view.component.html',
})
export class AnnouncementViewComponent implements OnInit {
  form = this.fb.group({
    id: [null],
    userType: [[], Validators.required],
    title: [null, Validators.required],
    description: [null, Validators.required],
    url: [null],
    dates: [null, Validators.required],
  });
  subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private routerHelper: RouterHelperService,
    private createGQL: CreateAnnouncementGQL,
    private updateGQL: UpdateAnnouncementGQL,
    private deleteGQL: DeleteAnnouncementGQL,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe((data) => {
      const announcement: ApolloQueryResult<ViewAnnouncementQuery> =
        data.announcement;
      if (announcement.data.announcement?.startAt == null) return;
      const startAt = new Date(announcement.data.announcement!.startAt);
      const expireAt = new Date(announcement.data.announcement!.expireAt);
      const dates = [startAt, expireAt];
      const userType = announcement.data.announcement.userType[0];
      this.form.patchValue({
        ...announcement.data.announcement,
        dates,
        userType,
      });
    });
  }

  async onSubmit() {
    const { id, dates, ..._input } = this.form.value;
    const startAt = dates[0].getTime();
    const expireAt = dates[1].getTime();
    const input = { ..._input, startAt, expireAt };
    if (id == null) {
      await firstValueFrom(this.createGQL.mutate({ input }));
    } else {
      await firstValueFrom(this.updateGQL.mutate({ id, input }));
    }
    this.routerHelper.goToParent(this.route);
  }

  async deleteAnnouncement() {
    const result = await firstValueFrom(
      this.deleteGQL.mutate({ id: this.form.value.id })
    );
    this.routerHelper.goToParent(this.route);
  }
}
