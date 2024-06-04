import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { VoteDetailService } from './services/vote-detail.service';
import { VoteDetail } from './models/vote-detail';

@Component({
  selector: 'app-vote-detail',
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule, MatTableModule, MatIconModule],
  templateUrl: './vote-detail.component.html',
  styleUrl: './vote-detail.component.css'
})
export class VoteDetailComponent {

  displayedColumns: string[] = ['socio', 'votes'];
  private _dataSource = new MatTableDataSource();
  public get dataSource() {
    return this._dataSource;
  }
  public set dataSource(value) {
    this._dataSource = value;
  }
  totalVotes: number = 0
  votesMissing: number = 0
  votesDelegates: number = 0
  votesRegister: number = 0
  listVoteDetail: VoteDetail[] = [];

  constructor(private _location: Location, private voteDetailService: VoteDetailService) { }

  getList() {
    this.voteDetailService.getList().subscribe({
      next: (res: any) => {
        debugger
        this.dataSource = new MatTableDataSource(res);
      }
    });
  }

  goBack() {
    this._location.back();
  }
}
