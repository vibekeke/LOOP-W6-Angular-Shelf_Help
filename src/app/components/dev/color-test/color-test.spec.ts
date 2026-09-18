import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorTest } from './color-test';

describe('ColorTest', () => {
  let component: ColorTest;
  let fixture: ComponentFixture<ColorTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorTest],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorTest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
