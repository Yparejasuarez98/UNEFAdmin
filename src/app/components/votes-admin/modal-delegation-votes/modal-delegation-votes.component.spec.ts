import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDelegationVotesComponent } from './modal-delegation-votes.component';

describe('ModalDelegationVotesComponent', () => {
  let component: ModalDelegationVotesComponent;
  let fixture: ComponentFixture<ModalDelegationVotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDelegationVotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDelegationVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
