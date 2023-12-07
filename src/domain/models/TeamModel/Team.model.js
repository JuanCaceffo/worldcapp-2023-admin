export class Team {
  constructor(teamData = {}) {
    this.id = teamData.id ?? -1
    this.nombre = teamData.pais ?? ''
    this.confederacion = teamData.confederacion ?? 'AFC'
    this.copasDelMundo = teamData.copasDelMundo ?? ''
    this.copasConfederacion = teamData.copasConfederacion ?? ''
  }

  static fromJson = (teamData) => new Team(teamData)

  get title() {
    return this.nombre
  }

  static toJson = (teamData) => {
    return {
      id: teamData.id,
      pais: teamData.nombre,
      confederacion: teamData.confederacion,
      copasConfederacion: teamData.copasConfederacion,
      copasDelMundo: teamData.copasDelMundo
    }
  }
}
