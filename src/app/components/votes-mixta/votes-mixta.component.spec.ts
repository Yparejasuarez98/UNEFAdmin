import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesMixtaComponent } from './votes-mixta.component';

describe('VotesMixtaComponent', () => {
  let component: VotesMixtaComponent;
  let fixture: ComponentFixture<VotesMixtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotesMixtaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VotesMixtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
