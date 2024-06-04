import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { VotesMixtaService } from './services/votes-mixta.service';
import Swal from 'sweetalert2';
import { Rule, Sections } from './models/votes-mixta';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../shared/services/shared.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Section } from '../votes-admin/models/votes-admin';

@Component({
  selector: 'app-votes-mixta',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatSelectModule, MatFormFieldModule, CommonModule, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './votes-mixta.component.html',
  styleUrl: './votes-mixta.component.css'
})
export class VotesMixtaComponent implements OnInit {

  listSections: Sections[] = [];
  round = new FormControl({"total_votos_round_section_emited":0,"round":1});
  listadoRoundsEmited: { [key: string]: any } = {  };

  constructor(private router: Router, private votesMixtaService: VotesMixtaService, private sharedService: SharedService) {

  }

  ngOnInit(): void {
    this.getInfoVotes();
    this.round.valueChanges.subscribe((value: any) => {
      console.log('El valor del control ha cambiado:', value);
    });
  }


  nextRound(section: Sections) {
    this.votesMixtaService.nextRound(section.section).subscribe({
      next: () => {
        this.getInfoVotes();
        Swal.fire('', 'Próxima ronda exitosa', 'success');
      }, error: (err) => {
        Swal.fire('Error!', err.message, 'success');
      }
    });
  }

  redirect(section: Sections) {
    this.sharedService.setResult(section);
    this.router.navigate(['/resultados']);
  }

  getInfoVotes() {
    this.votesMixtaService.getSections().subscribe({
      next: (res) => {
        this.listSections = res.data.map((section: any) => ({
          ...section,
          porcentageDirect: '0',
          quantityVotes: '0'
        }));
      }, error: (err) => {
        Swal.fire('Error!', err.messager, 'error')
      }
    });
  }

  getRoundData(section: any,index: number) {
    return section?.rounds?.[index].total_votos_round_section_emited;
  }

  getRules(event: any, section: Sections) {
    this.listadoRoundsEmited[section.section] = event;
    this.votesMixtaService.getRule(event.round, section.section).subscribe({
      next: (res: Rule[]) => {
        if (res.length > 0) {
          section.porcentageDirect = res[0].rule.toFixed(1);
          section.quantityVotes = res[0].total_votes_rule.toFixed(1);
        } else {
          section.porcentageDirect = '0';
          section.quantityVotes = '0';
        }
      }, error: (err) => {
        Swal.fire('Error !', err.messager, 'error');
      }
    });
  }


  goToDetail(section: Section) {
    section.roundActual = this.round.value?.round;
    this.sharedService.setDetailMix(section);
    this.router.navigate(['/detalle-mixto']);
  }

}
