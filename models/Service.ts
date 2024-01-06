import { CustomReflect } from '@/helpers/Decorator';
import { Type } from '@/constants/constants';

export class Service {
    @CustomReflect.disabledInputForm(true)
    @CustomReflect.label('ID')
    public id!: string;

    @CustomReflect.label('Tên dịch vụ')
    public name!: string;

    @CustomReflect.disabledDatagrid(true)
    @CustomReflect.label('Mã dịch vụ')
    public code!: string;

    @CustomReflect.label('Mô tả')
    public description!: string;

    @CustomReflect.label('Đơn giá')
    public cost!: number;
    
    public createdAt!: string;
    public updatedAt!: string;

    constructor(
        id?: string,
        name?: string,
        code?: string,
        description?: string,
        cost?: number,
        created_at?: string,
        updated_at?: string
    ) {
        this.id = id !== undefined ? id : ''
        this.name = name !== undefined ? name : ''
        this.code = code !== undefined ? code : ''
        this.description = description !== undefined ? description : ''
        this.cost = cost !== undefined ? cost : 0
        this.createdAt = created_at !== undefined ? created_at : ''
        this.updatedAt = updated_at !== undefined ? updated_at : ''

    }
}
