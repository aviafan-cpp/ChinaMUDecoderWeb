class TrainModel {
  constructor(data = {}) {
    Object.assign(this, {
      name: '', max_speed: 0, cars_number: 0, train_type: '',
      plate_number_start: 0, plate_number_end: 0, science_website_url: '',
    }, data);
  }

  toString() {
    const pad = n => String(n).padStart(4, '0');
    const range = this.plate_number_start === this.plate_number_end
      ? pad(this.plate_number_start)
      : `${pad(this.plate_number_start)}-${pad(this.plate_number_end)}`;
    return `${this.name} ${this.max_speed}km/h ${this.cars_number}车厢 `
         + `${this.train_type} ${range}`;
  }
}

class TrainModelManager {
  constructor() {
    this.trains = [];
  }

  add(tm) {
    this.trains.push(tm);
  }

  addFromText(text) {
    for (const line of text.split(/\r?\n/)) {
      if (!line || line[0] === '#') continue;

      const parts = line.slice(line[0] === '-' ? 1 : 0).split(/\s+/);
      if (line[0] === '-') {
        const [name, l, r] = parts;
        if (!isNaN(l) && !isNaN(r)) this.removeSubrange(name, +l, +r);
        continue;
      }

      const [name, speed, cars, type, start, end, url] = parts;
      const nums = [speed, cars, start, end].map(Number);
      if (nums.some(Number.isNaN)) continue;

      this.trains.push(new TrainModel({
        name, train_type: type,
        max_speed: nums[0], cars_number: nums[1],
        plate_number_start: nums[2], plate_number_end: nums[3],
        science_website_url: url === 'null' || url == null ? '' : url,
      }));
    }
  }

  removeSubrange(name, left, right) {
    if (left > right) [left, right] = [right, left];

    const n = this.trains.length;
    for (let i = 0; i < n; i++) {
      const tm = this.trains[i];
      if (tm.name !== name || tm.plate_number_end < left || tm.plate_number_start > right) continue;

      const { plate_number_start: s, plate_number_end: e } = tm;
      if (left <= s && right < e)      tm.plate_number_start = right + 1;
      else if (left > s && right >= e) tm.plate_number_end = left - 1;
      else if (left > s && right < e) {
        tm.plate_number_end = left - 1;
        this.trains.push(new TrainModel({ ...tm, plate_number_start: right + 1, plate_number_end: e }));
      } else {
        tm.plate_number_start = 1; tm.plate_number_end = 0;
      }
    }
    this.trains = this.trains.filter(t => t.plate_number_start <= t.plate_number_end);
  }

  findByPlateNumber(n) {
    return this.trains.filter(t => n >= t.plate_number_start && n <= t.plate_number_end);
  }

  findByName(name) {
    return this.trains.filter(t => t.name === name);
  }

  findByType(type) {
    return this.trains.filter(t => t.train_type === type);
  }

  get nameList() {
    return [...new Set(this.trains.map(t => t.name))];
  }

  get typeList() {
    return [...new Set(this.trains.map(t => t.train_type))];
  }
}