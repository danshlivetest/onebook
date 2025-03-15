import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'

@Injectable()
export class SubsriptionsService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  add(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }

  unsubscribeAll(): void {
    this.subscriptions.forEach(subscription => {
      if (subscription && !subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }
}
