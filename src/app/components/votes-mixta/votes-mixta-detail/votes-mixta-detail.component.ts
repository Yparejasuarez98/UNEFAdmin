import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxPaginationModule } from 'ngx-pagination';
import { VotesMixtaService } from '../services/votes-mixta.service';
import { SharedService } from '../../../shared/services/shared.service';
import Swal from 'sweetalert2';
import { VotesMixtaDetail } from './models/votes-mixta-detail';
import { ResponsePagination } from '../../../shared/models/response';
import { VotesAdminService } from '../../votes-admin/services/votes-admin.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { Observable, map, startWith } from 'rxjs';
import { Enterprise } from '../../votes-admin/models/votes-admin';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-votes-mixta-detail',
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatSlideToggleModule, NgxPaginationModule, MatIconModule, MatButtonModule,
    MatDialogModule, MatAutocompleteModule, AsyncPipe],
  templateUrl: './votes-mixta-detail.component.html',
  styleUrl: './votes-mixta-detail.component.css'
})
export class VotesMixtaDetailComponent implements OnInit {
  formMixtaDetalle: FormGroup;
  filterInit: any;
  listDetail: VotesMixtaDetail[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalPage = 0;
  listEnterprise: Enterprise[] = [];
  filteredOptions: Observable<Enterprise[]>;
  listEnterpriseVote: Enterprise[] = [];
  filteredOptionsVote: Observable<Enterprise[]>;
  section: any;
  round: any;
  constructor(private fb: FormBuilder, private votesMixtaService: VotesMixtaService, private sharedService: SharedService, private votesAdminService: VotesAdminService,) {
    this.formMixtaDetalle = this.fb.group({
      name: '',
      nif: '',
      type: '',
      nameVote: '',
      nifVotes: ''
    });
  }

  ngOnInit(): void {
    this.section = localStorage.getItem('section');
    this.round = localStorage.getItem('round');
    this.getDetail();
    this.getVoteFilter(1);
    this.getEnterprise('');
    this.getEnterpriseVote('');
  }


  getDetail() {
    this.sharedService.getDetailMix().subscribe(res => {
      this.filterInit = res;
    });
  }

  displayFn(enterprise: Enterprise): string {
    return enterprise && enterprise.name ? enterprise.name : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.listEnterprise.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getEnterprise(event: any) {
    this.votesAdminService.getEnterpriseAutocomplete(event !== '' ? event.target.value : '', this.filterInit.section ? this.filterInit.section : this.section, 'default', 1, 1000).subscribe({
      next: (res) => {
        this.listEnterprise = res.data;
        this.filteredOptions = this.name!.valueChanges.pipe(
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

  displayFnVote(enterprise: Enterprise): string {
    return enterprise && enterprise.name ? enterprise.name : '';
  }

  private _filterVote(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.listEnterpriseVote.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getEnterpriseVote(event: any) {
    this.votesAdminService.getEnterpriseAutocomplete(event !== '' ? event.target.value : '', this.filterInit.section ? this.filterInit.section : this.section, 'default', 1, 1000).subscribe({
      next: (res) => {
        this.listEnterpriseVote = res.data;
        this.filteredOptionsVote = this.nameVote!.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.['name'];
            return name ? this._filterVote(name as string) : this.listEnterpriseVote.slice();
          }),
        );
      }, error: (err) => {
        Swal.fire("Error!", err.message, 'error');
      }
    });
  }

  getVoteFilter(currentPage: number) {
    this.votesMixtaService.getVotFilterAdmin(this.filterInit.roundActual, this.filterInit.section ? this.filterInit.section : this.section, this.type?.value, this.name?.value.name, this.nameVote?.value.name, this.nif?.value, this.nifVotes?.value, currentPage, this.itemsPerPage).subscribe({
      next: (res: ResponsePagination) => {
        this.listDetail = res.data;
        this.totalPage = res.total_results!;
        this.itemsPerPage = res.per_page;
      }, error: (err) => {
        Swal.fire('Error!', err.message, 'error');
      }
    });
  }

  onPageChange(event: number): void {
    this.currentPage = event;
    this.getVoteFilter(this.currentPage);
  }

  downloadExcel() {
    this.votesAdminService.downloadExcelVotes(this.filterInit.section ? this.filterInit.section : this.section, this.round).subscribe({
      next: (res: any) => {
        this.exportToExcel(res, 'Votos');
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

  clear() {
    this.name?.setValue('');
    this.nif?.setValue('');
    this.type?.setValue('');
    this.nameVote?.setValue('');
    this.nifVotes?.setValue('');
    this.getVoteFilter(1);
  }

  get name() { return this.formMixtaDetalle.get('name') }
  get nif() { return this.formMixtaDetalle.get('nif') }
  get type() { return this.formMixtaDetalle.get('type') }
  get nameVote() { return this.formMixtaDetalle.get('nameVote') }
  get nifVotes() { return this.formMixtaDetalle.get('nifVotes') }
}
