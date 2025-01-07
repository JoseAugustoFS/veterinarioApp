import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsManagerComponent } from './pets-manager.component';

describe('PetsManagerComponent', () => {
  let component: PetsManagerComponent;
  let fixture: ComponentFixture<PetsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetsManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
