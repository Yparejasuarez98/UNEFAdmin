import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { VotesMixtaService } from '../services/votes-mixta.service';
import Swal from 'sweetalert2';
import { ViewResult } from './models/view-result';
import { SharedService } from '../../../shared/services/shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-result',
  standalone: true,
  imports: [MatTableModule, NgxPaginationModule, CommonModule],
  templateUrl: './view-result.component.html',
  styleUrl: './view-result.component.css'
})
export class ViewResultComponent implements OnInit {

  p = 1;
  dataResult: any;
  listResult: ViewResult[] = [];
  section: any;
  constructor(private router: Router, private votesMixtaService: VotesMixtaService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.section = localStorage.getItem('section');
    this.sharedService.getResult().subscribe(res => {
      this.dataResult = res;
    });
    this.getResult();
  }

  getResult() {
    this.votesMixtaService.getDashboard(this.dataResult.section ? this.dataResult.section: this.section).subscribe({
      next: (res: ViewResult[]) => {
        this.listResult = res;
      }, error: (err) => {
        Swal.fire('Error !', err.messager, 'error');
      }
    });
  }
}
