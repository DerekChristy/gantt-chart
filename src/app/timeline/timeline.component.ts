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
import { PROJECTS_DATA } from '../data'

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
  data = PROJECTS_DATA
  days: any[] = []
  years = [2022, 2023, 2024]
  currentDate = new Date()
  @ViewChild('today') todayEl: any

  constructor(
    private dialog: MatDialog,
    private changeDetection: ChangeDetectorRef
  ) {
    this.years.forEach((y) => this._generateMonths(y))
  }

  ngOnInit(): void {
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

    return Array(totalDays)
      .fill(1)
      .map((x, i) => i)
  }

  getDropColumnLeftOffset(index: number) {
    return index * GRID_WIDTH + 'px'
  }

  getProjectLeftOffset(startDate: string) {
    const date = new Date(startDate)
    const differenceInDays = this._getNumberOfDays(date)
    // TODO store in cache for performance
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
