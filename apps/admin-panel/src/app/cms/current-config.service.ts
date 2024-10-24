import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CurrentConfigurationGQL,
  CurrentConfigurationQuery,
} from '@ridy/admin-panel/generated/graphql';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentConfigService {
  currentConfig?: CurrentConfigurationQuery;

  constructor(
    private currentConfigGql: CurrentConfigurationGQL,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async getConfig(): Promise<CurrentConfigurationQuery> {
    if (this.currentConfig != null) {
      return this.currentConfig;
    }
    const queryResult = await firstValueFrom(this.currentConfigGql.fetch({}));
    if (queryResult.error != null) {
      this.logout();
    }
    this.currentConfig = queryResult.data;
    return this.currentConfig;
  }

  logout() {
    localStorage.removeItem('ridy_admin_token');
    this.router.navigate(['login'], { relativeTo: this.route.root });
    window.location.reload();
  }
}
