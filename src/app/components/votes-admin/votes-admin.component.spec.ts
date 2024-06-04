import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesAdminComponent } from './votes-admin.component';

describe('VotesAdminComponent', () => {
  let component: VotesAdminComponent;
  let fixture: ComponentFixture<VotesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotesAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VotesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
