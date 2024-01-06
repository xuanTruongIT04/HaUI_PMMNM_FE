export class Pagination<T> {
  public row?: number
  public currentPage? = 1
  public rows: T[] = []
  public totalRecord?: number
  public totalPage?: number
  constructor(row?: number, currentPage?: number, totalRecord?: number, totalPage?: number, rows?: any) {
    this.row = row
    this.currentPage = currentPage
    this.totalRecord = totalRecord
    this.totalPage = totalPage
    this.rows = rows
  }
}
