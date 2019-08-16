import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SVGDieComponent } from './svgdie.component';

describe('SVGDieComponent', () => {
  let component: SVGDieComponent;
  let fixture: ComponentFixture<SVGDieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SVGDieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SVGDieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
