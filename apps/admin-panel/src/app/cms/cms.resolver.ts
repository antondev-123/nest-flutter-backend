import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  NotificationsGQL,
  NotificationsQuery,
} from '@ridy/admin-panel/generated/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class CMSResolver
  implements Resolve<ApolloQueryResult<NotificationsQuery>>
{
  constructor(private gql: NotificationsGQL) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ApolloQueryResult<NotificationsQuery>> {
    return this.gql.watch({}).valueChanges;
  }
}
