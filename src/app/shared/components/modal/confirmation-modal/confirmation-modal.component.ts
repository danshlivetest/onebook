import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog'
import { ModalHeaderComponent } from '../modal-header/modal-header.component'
import { ModalFooterComponent } from '../modal-footer/modal-footer.component'

export interface ConfirmationModalData {
  header: string;
  text: string;
  cancelText: string;
  confirmText: string;
}

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  standalone: true,
  imports: [ModalHeaderComponent, MatDialogContent, ModalFooterComponent]
})
export class ConfirmationModalComponent implements OnInit, ConfirmationModalData {
  header!: string;
  text!: string;
  cancelText!: string;
  confirmText!: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ConfirmationModalData
  ) { }

  ngOnInit(): void {
    this.setData();
  }

  close(confirmed = false): void {
    this.dialogRef.close(confirmed);
  }

  private setData(): void {
    this.header = this.data.header;
    this.text = this.data.text;
    this.cancelText = this.data.cancelText;
    this.confirmText = this.data.confirmText;
  }
}
