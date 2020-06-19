import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupsModalComponent } from './create-groups-modal.component';

describe('CreateGroupsModalComponent', () => {
  let component: CreateGroupsModalComponent;
  let fixture: ComponentFixture<CreateGroupsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGroupsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGroupsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
