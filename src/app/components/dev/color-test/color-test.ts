import { Component } from '@angular/core';

interface ThemeColor {
  name: string;
  cssVar: string;
  hex: string;
}

@Component({
  imports: [],
  selector: 'app-color-test',
  styleUrl: './color-test.css',
  templateUrl: './color-test.html',
})
export class ColorTest {
  protected readonly colors: ThemeColor[] = [
    { name: 'brand', cssVar: '--color-brand', hex: '#B5603A' },
    { name: 'brand-dark', cssVar: '--color-brand-dark', hex: '#8A4429' },
    { name: 'accent', cssVar: '--color-accent', hex: '#C99A3E' },
    { name: 'sage', cssVar: '--color-sage', hex: '#7A8B6F' },
    { name: 'surface', cssVar: '--color-surface', hex: '#FAF3E9' },
    { name: 'surface-alt', cssVar: '--color-surface-alt', hex: '#F0E4D3' },
    { name: 'ink', cssVar: '--color-ink', hex: '#3A2C22' },
  ];
}
