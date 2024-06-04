import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { VotesAdminService } from '../services/votes-admin.service';
import { Enterprise } from '../models/votes-admin';
import Swal from 'sweetalert2';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-modal-delegation-votes',
  standalone: true,
  imports: [MatSelectModule, MatIconModule, MatButtonModule, MatDialogModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, AsyncPipe],
  templateUrl: './modal-delegation-votes.component.html',
  styleUrl: './modal-delegation-votes.component.css'
})
export class ModalDelegationVotesComponent implements OnInit {
  mixta = '';
  votes = 0;
  company = new FormControl('', Validators.required);
  listEnterprise: Enterprise[] = [];
  filteredOptions: Observable<Enterprise[]>;

  constructor(public dialogRef: MatDialogRef<ModalDelegationVotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private votesAdminService: VotesAdminService) {

    this.votes = this.data.enterprise.total_votes;
    this.mixta = this.data.enterprise.section;
  }

  ngOnInit(): void {
    this.getEnterprise('');
  }

  displayFn(enterprise: Enterprise): string {
    return enterprise && enterprise.name ? enterprise.name : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.listEnterprise.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getEnterprise(event: any) {
    this.votesAdminService.getEnterpriseAutocomplete(event !== '' ? event.target.value : '', this.data.enterprise.section, 'default', 1, 1000).subscribe({
      next: (res) => {
        this.listEnterprise = res.data;
        this.filteredOptions = this.company.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.['name'];
            return name ? this._filter(name as string) : this.listEnterprise.slice();
          }),
        );
      }, error: (err) => {
        Swal.fire("Error!", err.message, 'error');
      }
    });
  }

  confirm() {
    this.company.markAllAsTouched();
    if (this.company.invalid) {
      return
    }
    this.data.nifSelected = this.company?.value;
    this.dialogRef.close(this.data);
  }
}
