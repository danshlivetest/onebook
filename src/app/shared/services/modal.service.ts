import { ComponentType } from '@angular/cdk/portal'
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { get } from 'lodash-es'
import { Observable } from 'rxjs'

@Injectable()
export class ModalService {
  constructor(private dialog: MatDialog) {}

  openModal<DataType, ResponseType>(component: ComponentType<unknown>, options: MatDialogConfig<DataType>): Observable<ResponseType> {
    const config = this.createConfig<DataType>(options);
    return this.dialog.open(component, config).afterClosed();
  }

  private createConfig<DataType>(config: MatDialogConfig<DataType>): MatDialogConfig<DataType> {
    const width = get(config, 'width', '560px');
    const disableClose = get(config, 'disableClose', true);
    const data = get(config, 'data', {}) as DataType;
    return {  width, disableClose, data };
  }
}
