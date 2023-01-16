import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaDetailComponent } from './marca-detail.component';

describe('MarcaDetailComponent', () => {
  let component: MarcaDetailComponent;
  let fixture: ComponentFixture<MarcaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcaDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
