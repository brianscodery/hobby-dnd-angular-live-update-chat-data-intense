import { DieNumber } from '../../shared/common-interfaces-and-types';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-svgdie',
  templateUrl: './svgdie.component.html',
  styleUrls: ['./svgdie.component.scss']
})
export class SVGDieComponent implements OnInit {
  @Input() available: boolean;
  @Input() die: DieNumber;
  @Input() numberOfDice: number;
  matTooltip: string;
  width: string;
  height: string;
  constructor() { }

  ngOnInit() {
    const usedText = `expended d${ this.die }
    (One expended hit die is replenished with each long rest)`;
    const availableText = `available d${ this.die }
    (Double click to use it)`;
    this.matTooltip = this.available ? availableText : usedText;
    this.setWidthAndHeight();
  }

  setWidthAndHeight(): void {
    const numDice = this.numberOfDice;
    switch (true) {
      case numDice <= 4:
        this.width = '50px';
        this.height = '50px';
        return;
      case numDice <= 10:
        this.width = '40px';
        this.height = '40px';
        return;
      case numDice <= 16:
        this.width = '30px';
        this.height = '30px';
        return;
      default:
        this.width = '25px';
        this.height = '25px';
        return;
    }
  }
}
