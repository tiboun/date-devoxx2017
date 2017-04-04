import * as moment from 'moment';
import 'moment-timezone-all';

moment.fn.toJSON = function () { return this.format(); }