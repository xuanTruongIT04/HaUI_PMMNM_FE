import { CustomReflect } from '@/helpers/Decorator';
import { Type } from '@/constants/constants';

export class Medicine {
    @CustomReflect.disabledInputForm(true)
    @CustomReflect.label('ID')
    public id!: string;

    @CustomReflect.label('Tên thuốc')
    public name!: string;

    @CustomReflect.disabledInputForm(true)
    @CustomReflect.label('Mã thuốc')
    public code!: string;

    @CustomReflect.label('Hạn sử dụng')
    public expiredDate!: string;

    @CustomReflect.label('Ngày sản xuất')
    public manufacturedDate!: string;

    @CustomReflect.label('Nhà cung cấp')
    public publisher!: string;

    @CustomReflect.disabledInputForm(true)
    @CustomReflect.disabledDatagrid(true)
    @CustomReflect.label('Hướng dẫn')
    public instruction!: string;

    @CustomReflect.defineMetadata(Type.TEXTAREA,true)
    @CustomReflect.disabledDatagrid(true)
    @CustomReflect.label('Thành phần')
    public ingredient!: string;

    @CustomReflect.label('Số lượng')

    public quantity!: number;

    @CustomReflect.label('Đơn vị')
    public unit!: string;

    @CustomReflect.label('Đơn giá')
    public price!: number;
    
    public createdAt!: string;
    public updatedAt!: string;

    constructor(
        id?: string,
        name?: string,
        code?: string,
        expired_date?: string,
        manufactured_date?: string,
        publisher?: string,
        instruction?: string,
        ingredient?: string,
        quantity?: number,
        unit?: string,
        price?: number,
        created_at?: string,
        updated_at?: string
    ) {
        this.id = id !== undefined ? id : ''
        this.name = name !== undefined ? name : ''
        this.code = code !== undefined ? code : ''
        this.expiredDate = expired_date !== undefined ? expired_date : ''
        this.manufacturedDate = manufactured_date !== undefined ? manufactured_date : ''
        this.publisher = publisher !== undefined ? publisher : ''
        this.instruction = instruction !== undefined ? instruction : ''
        this.ingredient = ingredient !== undefined ? ingredient : ''
        this.quantity = quantity !== undefined ? quantity : 0
        this.unit = unit !== undefined ? unit : ''
        this.price = price !== undefined ? price : 0
        this.createdAt = created_at !== undefined ? created_at : ''
        this.updatedAt = updated_at !== undefined ? updated_at : ''

    }
}
