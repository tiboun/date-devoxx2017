/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyFormService } from './my-form.service';

describe('MyFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyFormService]
    });
  });

  it('should ...', inject([MyFormService], (service: MyFormService) => {
    expect(service).toBeTruthy();
  }));
});
