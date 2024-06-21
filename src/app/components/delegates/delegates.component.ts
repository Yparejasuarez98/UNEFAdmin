import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgxPaginationModule } from 'ngx-pagination';
import { VotesAdminService } from '../votes-admin/services/votes-admin.service';
import { Enterprise, Section } from '../votes-admin/models/votes-admin';
import { Observable, map, startWith } from 'rxjs';
import Swal from 'sweetalert2';
import { ResponsePagination } from '../../shared/models/response';
import * as XLSX from 'xlsx';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-delegates',
  standalone: true,
  imports: [MatButtonModule, MatSelectModule, MatFormFieldModule, CommonModule, ReactiveFormsModule, FormsModule, MatIconModule, NgxPaginationModule, MatAutocompleteModule, MatInputModule],
  templateUrl: './delegates.component.html',
  styleUrl: './delegates.component.css'
})
export class DelegatesComponent implements OnInit {

  currentPage = 1;
  itemsPerPage = 10;
  totalPageEnterprise = 0;
  listSection: Section[] = [];
  listEnterprise: Enterprise[] = [];
  listEnterpriseAutocomplete: Enterprise[] = [];
  filteredOptions: Observable<Enterprise[]>;
  formDelegate: FormGroup;
  listEnterpriseAutocompleteDelegate: Enterprise[] = [];
  filteredOptionsDelegate: Observable<Enterprise[]>;

  constructor(private votesAdminService: VotesAdminService, private fb: FormBuilder) {

    this.formDelegate = this.fb.group({
      company: '',
      companyDelegate: '',
      nif: '',
      section: '',
      nifAsociaDele: ''
    });
  }

  ngOnInit(): void {
    this.getEnterpriseAutocomplete('');
    this.getEnterpriseAutocompleteDelegate('');
  }

  getEnterpriseAutocomplete(event: any) {
    this.votesAdminService.getEnterpriseAutocomplete(event !== '' ? event.target.value : '', '', 'default', 1, 1000).subscribe({
      next: (res) => {
        this.listEnterpriseAutocomplete = res.data;
        this.filteredOptions = this.company!.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.['name'];
            return name ? this._filter(name as string) : this.listEnterpriseAutocomplete.slice();
          }),
        );
      }, error: (err) => {
        Swal.fire("Error!", err.message, 'error');
      }
    });
  }

  displayFn(enterprise: Enterprise): string {
    return enterprise && enterprise.name ? enterprise.name : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.listEnterpriseAutocomplete.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getEnterpriseAutocompleteDelegate(event: any) {
    this.votesAdminService.getEnterpriseAutocomplete(event !== '' ? event.target.value : '', '', 'default', 1, 1000).subscribe({
      next: (res) => {
        this.listEnterpriseAutocompleteDelegate = res.data;
        this.filteredOptionsDelegate = this.company!.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.['name'];
            return name ? this._filterDelegate(name as string) : this.listEnterpriseAutocompleteDelegate.slice();
          }),
        );
      }, error: (err) => {
        Swal.fire("Error!", err.message, 'error');
      }
    });
  }

  displayFnDelegate(enterprise: Enterprise): string {
    return enterprise && enterprise.name ? enterprise.name : '';
  }

  private _filterDelegate(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.listEnterpriseAutocomplete.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getEnterprise(currentPage: number) {
    this.votesAdminService.getEnterprise(this.company?.value.name, this.section?.value.section, this.type?.value, this.nif?.value, currentPage, this.itemsPerPage).subscribe({
      next: (res: ResponsePagination) => {
        this.listEnterprise = res.data;
        this.totalPageEnterprise = res.total_records;
        this.itemsPerPage = res.per_page;
      }, error: (err) => {
        Swal.fire("Error!", err.error.message, 'error');
      }
    });
  }

  onPageChange(event: number): void {
    this.currentPage = event;
    this.getEnterprise(this.currentPage);
  }

  downloadExcel() {
    this.votesAdminService.downloadExcel().subscribe({
      next: (res: any) => {
        this.exportToExcel(res, 'Empresas');
      }, error: (err) => {
        Swal.fire('Error!', 'No se pudo generar el csv', 'error');
      }
    });
  }

  exportToExcel(data: any[], filename: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${filename}.xlsx`);
  }
  

  reset() {
    this.company?.setValue('');
    this.nif?.setValue('');
    this.section?.setValue('');
    this.type?.setValue('');
    this.getEnterprise(1);
  }

  get company(): AbstractControl | null { return this.formDelegate.get('company') }
  get nif(): AbstractControl | null { return this.formDelegate.get('nif') }
  get section(): AbstractControl | null { return this.formDelegate.get('section') }
  get type(): AbstractControl | null { return this.formDelegate.get('type') }
}
