import { ChangeDetectionStrategy, Component, OnInit, TrackByFunction } from '@angular/core'

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent implements OnInit {
  columns = []
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  data = [
    {
      project: 'Sports category on Netflix',
      priority: 'P0',
      stage: 'Scoping',
      progress: '10%',
      status: 'At risk',
      labels: ['revenue;', 'board', 'meeting;', 'TV;', 'mobile'],
      openRisks: 3,
      startDate: '11-1-2023',
      launchDate: '2-27-2024',
      owner: 'Prod1',
      participants: ['Eng 1', 'Eng 4', 'D1']
    },
    {
      project: 'Public landing page',
      priority: 'P0',
      stage: 'Launched',
      progress: '100%',
      status: 'At risk',
      labels: ['mobile', 'users'],
      openRisks: 3,
      startDate: '9-4-2023',
      launchDate: '10-16-2023',
      owner: 'Prod1',
      participants: ['Eng 1', 'Eng 3', 'M1']
    },
    {
      project: 'Search Box',
      priority: 'P0',
      stage: 'Launched',
      progress: '100%',
      status: 'At risk',
      labels: ['users', 'mobile'],
      openRisks: 3,
      startDate: '1-4-2023',
      launchDate: '10-16-2023',
      owner: 'Prod1',
      participants: ['Eng 1', 'Eng 3', 'M1']
    },
    {
      project: 'Search suggestions',
      priority: 'P1',
      stage: 'Launched',
      progress: '100%',
      status: 'At risk',
      labels: ['users', 'mobile'],
      openRisks: 3,
      startDate: '2-4-2023',
      launchDate: '10-16-2023',
      owner: 'Prod1',
      participants: ['Eng 1', 'Eng 3', 'M1']
    }


    // 	P0	Launched	100%	At risk	mobile; users	3	9-4-2023	10-16-2023	Prod1	Eng1; Eng 4; D1
    // Search box	P0	Testing	80%	On track	mobile; desktop; users	0	10-9-2023	1-9-2024	Prod1	Eng2; Eng3; M1
    // Search suggestions 	P1	Implementation	60%	On track	mobile; desktop; users	0	10-16-2023	1-16-2024	Prod1	Eng2; Eng3; M1
    // Checkout page	P0	Implementation	40%	On track	mobile; desktop; users; board meeting	2	11-6-2023	1-2-2024	Prod2	Eng3; Eng5; M2		Payment gateway
    // Payment gateway	P0	Design	20%	At risk	mobile; desktop; users; board meeting	1	11-13-2023	1-8-2024	Prod2	Eng4; Eng5; Eng6	Checkout page
    // Catalog sorting	P1	Implementation	50%	At risk	AI; mobile; desktop	0	11-6-2023	11-30-2023	Prod2	Eng4; Eng5; Eng6		Advanced catalog sorting
    // Advanced catalog sorting	P2	Not started	0%	On track	AI; mobile; desktop	0	11-1-2023	12-12-2023	Prod2	Eng4; Eng5; Eng6; M1	Catalog sorting
  ]

  days: any[] = []

  constructor() {
    this.months.forEach((m, index) => {
      const numberOfDays = new Date(2023, index + 1, 0).getDate()
      const days = Array(numberOfDays)
        .fill(1)
        .map((x, i) => i + 1)
      this.days.push({ month: m, days })
    })
    console.log(this.days)
  }

  ngOnInit(): void {}

  getMonthLeftOffset(index: number) {
    const prevMonthIndex = index - 1
    if (prevMonthIndex < 0) {
      return '0'
    }
    const value = Array(index)
      .fill(0)
      .reduce((acc, v, i) => acc + 40 * this.days[i].days.length, 0)

    return value + 'px'
  }

  getDropColumns() {
    const year = 2023
    const totalDays =
      (year % 4 === 0 && year % 100 > 0) || year % 400 == 0 ? 366 : 365
    console.log('columns count',Array(totalDays)
    .fill(1)
    .map((x, i) => i))
      return Array(totalDays)
      .fill(1)
      .map((x, i) => i)
  }

  getDropColumnLeftOffset(index: number) {
    return index * 40 + 'px'
  }

  getProjectLeftOffset(startDate: string) {
    const date = new Date(startDate);
    console.log(date, date.getDate(), date.getMonth())
    const value = Array(date.getMonth()).fill(0).reduce((acc, v, i) => acc + this.days[i].days.length * 40, 0)
    return (date.getDate() - 1) * 40 +  value + 'px';
  }

  getTodayLeftOffset() {
    const today = new Date();

    const value = Array(today.getMonth()).fill(0).reduce((acc, v, i) => acc + this.days[i].days.length * 40, 0)
    return (today.getDate() - 1) * 40 +  value + 'px';
  }

  getTodayLeftOffsetWithTime() {
    const today = new Date();

    const value = Array(today.getMonth()).fill(0).reduce((acc, v, i) => acc + this.days[i].days.length * 40, 0)
    return (today.getDate() - 1) * 40 +  value + (40/24 * today.getHours()) + 'px';
  }

  addProject(col: number) {
    console.log(col)
  }

  trackByIndex: TrackByFunction<number> = (index) => index;
}
