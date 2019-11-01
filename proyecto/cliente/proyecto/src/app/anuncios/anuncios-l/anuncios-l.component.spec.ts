import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnunciosLComponent } from './anuncios-l.component';

describe('AnunciosLComponent', () => {
  let component: AnunciosLComponent;
  let fixture: ComponentFixture<AnunciosLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnunciosLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnunciosLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
