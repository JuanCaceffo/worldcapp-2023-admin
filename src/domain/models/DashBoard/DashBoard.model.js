export class Dashboard {
  constructor(data) {
    this.name = data.name ?? ''
    this.quantity = data.quantity ?? 0
  }

  static fromJson = (dashboardData) => new Dashboard(dashboardData)
}
