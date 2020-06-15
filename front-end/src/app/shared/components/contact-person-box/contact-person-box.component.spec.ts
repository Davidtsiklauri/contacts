import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPersonBoxComponent } from './contact-person-box.component';

describe('ContactPersonBoxComponent', () => {
  let component: ContactPersonBoxComponent;
  let fixture: ComponentFixture<ContactPersonBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactPersonBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPersonBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
