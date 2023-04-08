import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadGifsComponent } from './upload-gifs.component';

xdescribe('UploadGifsComponent', () => {
  let component: UploadGifsComponent;
  let fixture: ComponentFixture<UploadGifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UploadGifsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadGifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
