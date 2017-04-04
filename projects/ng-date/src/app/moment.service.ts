import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment-timezone-all';

@Injectable()
export class MomentService {

  constructor() { }

  get():any {
    moment.fn.toJSON = function() { return this.format(); }
    return moment;
  }
}
