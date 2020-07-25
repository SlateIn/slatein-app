import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-card-item',
  templateUrl: './list-card-item.component.html',
  styleUrls: ['./list-card-item.component.scss'],
})
export class ListCardItemComponent implements OnInit {
  @Input() cardTitle: string;
  @Input() cardContent: string;
  @Input() cardProgressValue: number;
  @Input() isAllItemCompleted: boolean;
  @Output() cancelled = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  onCancel() {
    this.cancelled.emit(true);
  }
}
