import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import {
  PROJECTS_DATA,
  PROJECTS_DISTRIBUTION,
  STAGES,
  TEAM_MEMBERS
} from '../data'

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  data = PROJECTS_DISTRIBUTION

  priorities = new FormControl()
  stages = new FormControl()

  prioritiesList: string[] = ['P0', 'P1', 'P2', 'P3']
  stagesList: string[] = STAGES
  priorityFilterApplied: string[] = []
  stageFilterApplied: string[] = []

  constructor() {
    this.priorities.valueChanges.subscribe((value: string[]) => {
      this.priorityFilterApplied = value
      this._filterData()
    })

    this.stages.valueChanges.subscribe((value: string[]) => {
      this.stageFilterApplied = value
      this._filterData()
    })
  }

  ngOnInit(): void {}

  private _filterData() {
    const isPriorityFilterApplied = !!this.priorityFilterApplied.length
    const isStageFilterApplied = !!this.stageFilterApplied.length

    const projectCounts: any = {}
    let filteredProjects = PROJECTS_DATA
    if (isPriorityFilterApplied || isStageFilterApplied) {
      filteredProjects = filteredProjects.filter(({ stage, priority }) => {
        if (isPriorityFilterApplied && isStageFilterApplied) {
          return (
            this.stageFilterApplied.includes(stage) &&
            this.priorityFilterApplied.includes(priority)
          )
        } else if (isPriorityFilterApplied) {
          return this.priorityFilterApplied.includes(priority)
        } else if (isStageFilterApplied) {
          return this.stageFilterApplied.includes(stage)
        }
        return false
      })
    }

    filteredProjects.forEach(({ participants }) => {
      participants.forEach((participant) => {
        if (!projectCounts[participant]) {
          projectCounts[participant] = 1
        } else {
          projectCounts[participant] += 1
        }
      })
    })

    this.data = Object.entries(projectCounts).map((entry: any) => {
      return { name: entry[0], value: entry[1] }
    })
  }
}
