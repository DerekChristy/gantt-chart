import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  TrackByFunction,
  ViewChild
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ProjectDetailsDialogComponent } from '../project-details-dialog/project-details-dialog.component'

const GRID_WIDTH = 40

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent implements OnInit, AfterViewInit {
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
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
  years = [2022, 2023, 2024]
  currentDate = new Date()
  @ViewChild('today') todayEl: any

  constructor(
    private dialog: MatDialog,
    private changeDetection: ChangeDetectorRef
  ) {
    this.years.forEach((y) => this._generateMonths(y))
    console.log(this.days)
  }

  ngOnInit(): void {
    console.log('sys', this._getNumberOfDays(new Date(2022, 1, 1)))
  }

  ngAfterViewInit(): void {
    this.todayEl.nativeElement.scrollIntoView({ behaviour: 'smooth' })
  }

  private _generateMonths(year: number) {
    this.months.forEach((m, index) => {
      const numberOfDays = new Date(year, index + 1, 0).getDate()
      const days = Array(numberOfDays)
        .fill(1)
        .map((x, i) => i + 1)
      this.days.push({ month: m, days, year })
    })
  }
  getMonthLeftOffset(index: number) {
    const prevMonthIndex = index - 1
    if (prevMonthIndex < 0) {
      return '0'
    }
    const value = Array(index)
      .fill(0)
      .reduce((acc, v, i) => acc + GRID_WIDTH * this.days[i].days.length, 0)

    return value + 'px'
  }

  getDropColumns() {
    const columns: number[] = []
    this.years.forEach((y) => {
      columns.push(...this._getDaysInYear(y))
    })
    return columns
  }

  private _getDaysInYear(year: number): number[] {
    const totalDays =
      (year % 4 === 0 && year % 100 > 0) || year % 400 == 0 ? 366 : 365
    console.log(
      'columns count',
      Array(totalDays)
        .fill(1)
        .map((x, i) => i)
    )
    return Array(totalDays)
      .fill(1)
      .map((x, i) => i)
  }

  getDropColumnLeftOffset(index: number) {
    return index * GRID_WIDTH + 'px'
  }

  getProjectLeftOffset(startDate: string) {
    const date = new Date(startDate)
    console.log(date, date.getDate(), date.getMonth())
    const differenceInDays = this._getNumberOfDays(date)
    // store in memcache
    return GRID_WIDTH * differenceInDays + 'px'
  }

  getTodayLeftOffset() {
    const today = new Date()
    const differenceInDays = this._getNumberOfDays(today)
    return GRID_WIDTH * differenceInDays + 'px'
  }

  private _getNumberOfDays(
    date: Date,
    initialDate = new Date(this.years[0], 0, 1)
  ) {
    const differenceInTime = date.getTime() - initialDate.getTime()
    return Math.round(differenceInTime / (1000 * 3600 * 24))
  }

  getTodayLeftOffsetWithTime() {
    const today = new Date()
    const differenceInDays = this._getNumberOfDays(today)
    return GRID_WIDTH * differenceInDays + (40 / 24) * today.getHours() + 'px'
  }

  addProject(year?: number, month?: string, day?: number) {
    let startDate = new Date()
    if (month && year) {
      const startMonth = this.months.indexOf(month)
      startDate = new Date(year, startMonth, day)
    }
    const launchDate = new Date(startDate).setDate(startDate.getDate() + 5)
    const dialogRef = this.dialog.open(ProjectDetailsDialogComponent, {
      data: { startDate, launchDate }
    })
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        const newProject = {
          id: this.data.length + 1,
          project: data.project || 'unplanned project',
          priority: data.priority || 'P0',
          stage: data.stage || 'Launched',
          progress: '100%',
          status: data.status || 'At risk',
          labels: ['users', 'mobile'],
          openRisks: 3,
          startDate: this.formatDate(startDate),
          launchDate: this.formatDate(launchDate),
          owner: 'Prod1',
          participants: ['Eng 1', 'Eng 3', 'M1']
        }
        this.data = [...this.data, newProject]
        this.changeDetection.detectChanges()
        this.scrollToProjectCard(newProject)
      }
    })
  }

  openProject(data: any) {
    const dialogRef = this.dialog.open(ProjectDetailsDialogComponent, { data })
    dialogRef.afterClosed().subscribe((modData) => {
      let project: any = this.data.find((p) => p.project === data.project) || {}
      project = { ...project, ...modData }
      console.log(project)
      this.data.splice(this.data.indexOf(data), 1, project)
      this.changeDetection.detectChanges()
    })
  }

  formatDate(date: any) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [month, day, year].join('-')
  }

  scrollToElement(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' })
  }

  scrollToProjectCard(project: any) {
    const id = 'project-' + project.id
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  trackByIndex: TrackByFunction<any> = (index: number, data: any) => data.id

  getProjectCardWidth(project: any) {
    return (
      this._getNumberOfDays(
        new Date(project.launchDate),
        new Date(project.startDate)
      ) *
        GRID_WIDTH +
      'px'
    )
  }
}
