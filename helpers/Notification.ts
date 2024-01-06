import { Color, ResultType } from '@/constants/constants'

export class Notification {
  title!: string
  content!: string
  color!: string
  enabled = true
  constructor() {}
  public success(content: string) {
    this.title = ResultType.SUCCESS
    this.color = Color.GREEN
    this.content = content
    this.enabled = false
    setTimeout(() => {
      this.enabled = true
    }, 2500)
  }

  public error(content: string) {
    this.title = ResultType.ERROR
    this.color = Color.RED
    this.content = content
    this.enabled = false
    setTimeout(() => {
      this.enabled = true
    }, 2500)
  }
}
