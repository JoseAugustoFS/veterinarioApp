import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePetComponent } from './delete-pet.component';

describe('DeletePetComponent', () => {
  let component: DeletePetComponent;
  let fixture: ComponentFixture<DeletePetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
