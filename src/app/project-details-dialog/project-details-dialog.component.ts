import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-project-details-dialog',
  templateUrl: './project-details-dialog.component.html',
  styleUrls: ['./project-details-dialog.component.scss']
})
export class ProjectDetailsDialogComponent implements OnInit {
  form: FormGroup
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    private _dialogRef: MatDialogRef<ProjectDetailsDialogComponent>
  ) {
    this.form = this.fb.group({
      project: [data?.project || '', Validators.required],
      priority: [data?.priority || 'P1', Validators.required],
      stage: [data?.stage || 'Launched', Validators.required],
      progress: ['100%', Validators.required],
      status: [data?.status || 'At risk', Validators.required],
      labels: [['users', 'mobile'], Validators.required],
      openRisks: [3, Validators.required],
      startDate: [
        data?.startDate ? new Date(data?.startDate) : new Date(),
        Validators.required
      ],
      launchDate: [
        data?.launchDate ? new Date(data?.launchDate) : new Date(),
        Validators.required
      ],
      owner: ['Prod1', Validators.required],
      participants: [['Eng 1', 'Eng 3', 'M1'], Validators.required]
    })
  }

  ngOnInit(): void {}
  addProject() {
    if (!this.form.invalid) {
      this._dialogRef.close(this.form.value)
    }
  }
}
