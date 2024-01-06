import { CustomReflect } from '@/helpers/Decorator';

export class Category {
    @CustomReflect.disabledInputForm(true)
    @CustomReflect.label('STT')
    public id!: string;

    @CustomReflect.disabledDatagrid(true)
    @CustomReflect.disabledInputForm(true)
    @CustomReflect.label('Mã dịch vụ')
    public code!: string;

    @CustomReflect.label('Tên dịch vụ')
    public name!: string;

    @CustomReflect.disabledInputForm(true)
    @CustomReflect.label('Loại dịch vụ')
    public type!: string;

    @CustomReflect.disabledInputForm(true)
    @CustomReflect.label('Mô tả')
    public description!: string;

    constructor(
        id?: string,
        code?: string,
        name?: string,
        type?: string,
        description?: string
    ) {
        this.id = id !== undefined ? id : '';
        this.code = code !== undefined ? code : '';
        this.name = name !== undefined ? name : '';
        this.type = type !== undefined ? type : '';
        this.description = description !== undefined ? description : '';
    }
}
