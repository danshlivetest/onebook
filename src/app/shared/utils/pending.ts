import { signal } from "@angular/core"
import { finalize, Observable } from "rxjs"

export class Pending {
  private counter = signal(0);

  get isPending(): boolean {
    return this.counter() > 0;
  }

  wait<T>(action: Observable<T>): Observable<T> {
		const counter = this.counter() + 1;
		this.counter.set(counter);
		return action.pipe(
			finalize(() => {
				const counter = this.counter() - 1;
				this.counter.set(counter);
			})
		);
	}
}
