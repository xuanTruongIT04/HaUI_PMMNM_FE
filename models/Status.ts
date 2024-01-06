export class Status{
    public id!: string
    public name!: string
    public code!: string
    public type!: string
    public description!: string
    public created_at!: string
    public updated_at!: string
    
    constructor(id?: string, name?: string, code?: string, type?: string,description?: string, created_at?: string, updated_at?: string){
        this.id = id != undefined ? id : ''
        this.name = name != undefined ? name : ''
        this.code = code != undefined ? code : ''
        this.type = type != undefined ? type : ''
        this.description = description != undefined ? description : ''
        this.created_at = created_at != undefined ? created_at : ''
        this.updated_at = updated_at != undefined ? updated_at : ''
    }
}