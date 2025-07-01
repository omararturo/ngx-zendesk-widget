import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxZendeskWidget } from './ngx-zendesk-widget';

describe('NgxZendeskWidget', () => {
  let component: NgxZendeskWidget;
  let fixture: ComponentFixture<NgxZendeskWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxZendeskWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxZendeskWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
