import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { Enterprise, Section } from './models/votes-admin';
import { VotesAdminService } from './services/votes-admin.service';
import { ChangeDetectorRef } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ModalDelegationVotesComponent } from './modal-delegation-votes/modal-delegation-votes.component';
import { ResponsePagination } from '../../shared/models/response';
import { Observable, map, startWith } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-votes-admin',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, MatToolbarModule, MatListModule,
    MatAutocompleteModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, AsyncPipe, MatInputModule,
    MatSelectModule, NgxPaginationModule, MatSlideToggleModule, MatDialogModule, MatMenuModule],
  templateUrl: './votes-admin.component.html',
  styleUrl: './votes-admin.component.css'
})
export class VotesAdminComponent {
  showFiller = true;
  mobileQuery: MediaQueryList;
  formAdmin: FormGroup;
  currentPage = 1;
  itemsPerPage = 10;
  totalPageEnterprise = 0;
  menus: any[] = ['Empresas asociadas', 'Votaciones'];
  listEnterprise: Enterprise[] = [];
  listSection: Section[] = [];
  listEnterpriseAutocomplete: Enterprise[] = [];
  filteredOptions: Observable<Enterprise[]>;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private fb: FormBuilder,
    public dialog: MatDialog, private votesAdminService: VotesAdminService, private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.formAdmin = this.fb.group({
      company: '',
      nif: '',
      section: '',
      type: ''
    });
  }

  ngOnInit() {
    this.getEnterprise(1);
    this.getSection();
    this.getEnterpriseAutocomplete('');
  }

  reset() {
    this.company?.setValue('');
    this.nif?.setValue('');
    this.section?.setValue('');
    this.type?.setValue('');
    this.getEnterprise(1);
  }

  redirect() {
    this.router.navigate(['/votos']);
  }

  redirectCompany() {
    this.router.navigate(['votos']);
  }

  redirectResults() {
    this.router.navigate(['votaciones']);
  }

  displayFn(enterprise: Enterprise): string {
    return enterprise && enterprise.name ? enterprise.name : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.listEnterpriseAutocomplete.filter(option => option.name.toLowerCase().includes(filterValue));
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

  updateEnterpriseAsist(enterprise: Enterprise) {
    const assist = {
      nif: enterprise.nif,
      status: enterprise.status
    }
    this.votesAdminService.updateEnterpriseAsist(assist).subscribe({
      next: (res) => {
        if (enterprise.status) {
          Swal.fire('', 'Su asistencia ha sido confirmada exitosamente.', 'success');
        } else {
          Swal.fire('', 'No se registró asistencia.', 'info');
        }
      }, error: (err) => {
        Swal.fire('Erro!', err.message, 'error');
      }
    });
  }

  getSection() {
    this.votesAdminService.getSections().subscribe({
      next: (res: Section[]) => {
        this.listSection = res;
      }, error: (err) => {
        Swal.fire("Error!", err.error.message, 'error');
      }
    })
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

  openDialog(enterprise: Enterprise) {
    const dialogRef = this.dialog.open(ModalDelegationVotesComponent, {
      data: {
        enterprise: enterprise
      },
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateDelegate(result)
      }
    });
  }

  updateDelegate(enterprise: any) {
    const assist = {
      nif: enterprise.enterprise.nif,
      nif_delegate: enterprise.nifSelected.nif
    }
    this.votesAdminService.updateEnterpriseDelegate(assist).subscribe({
      next: () => {
        this.getEnterprise(1);
        this.router.navigateByUrl('votos/detalle');
      }, error: (err) => {
        Swal.fire('Error!', err.error.message, 'error');
      }
    });
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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  get company(): AbstractControl | null { return this.formAdmin.get('company') }
  get nif(): AbstractControl | null { return this.formAdmin.get('nif') }
  get section(): AbstractControl | null { return this.formAdmin.get('section') }
  get type(): AbstractControl | null { return this.formAdmin.get('type') }
}
