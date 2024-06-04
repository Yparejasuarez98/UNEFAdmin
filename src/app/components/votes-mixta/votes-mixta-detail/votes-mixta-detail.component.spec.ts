import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesMixtaDetailComponent } from './votes-mixta-detail.component';

describe('VotesMixtaDetailComponent', () => {
  let component: VotesMixtaDetailComponent;
  let fixture: ComponentFixture<VotesMixtaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotesMixtaDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VotesMixtaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
