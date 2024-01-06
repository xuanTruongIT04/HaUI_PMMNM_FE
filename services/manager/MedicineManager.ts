import { BaseObjectManager } from './BaseObjectManager';
import { Medicine } from '@/models/Medicine';
import { Pagination } from '@/helpers/Pagination';

export class MedicineManager extends BaseObjectManager {
    public medicine: Medicine = new Medicine();
    public pagination: Pagination<Medicine> = new Pagination<Medicine>();

    constructor() {
        super();
        this.medicine = new Medicine()
    }

    getPropertyTypes() {
        const medicine = new Medicine();
        const properties = Object.getOwnPropertyNames(medicine);
        const types = new Map<string, string>();
        properties.forEach((element) => {
            types.set(element, 'string');
        });
        return types;
    }

    getMedicine() {
        return this.medicine;
    }

    getPagination() {
        return this.pagination;
    }

    format(text?: String) {
        if (text === undefined) return '';
        const strs = text.split('-');
        const template = [''];
        let i = 0;
        while (i < 3) {
            i++;
            strs.forEach((item: string) => {
                if (Number.parseInt(item) > 1000) template.push(item);
                if (Number.parseInt(item) <= 12) template.push(item);
                if (Number.parseInt(item) <= 31) template.push(item);
            });
        }
        return `${strs[2]}-${strs[0]}-${strs[1]}`;
    }

    async addMedicine(medicine: Medicine) {
        try {
            const url = `${this.apiUrl}medicine/create?name=${medicine.name}&code=${medicine.code}&expiredDate=${medicine.expiredDate}&manufacturedDate=${medicine.manufacturedDate}&publisher=${medicine.publisher}&instruction=${medicine.instruction}&ingredient=${medicine.ingredient}&quantity=${medicine.quantity}&unit=${medicine.unit}&price=${medicine.price}`;

            const headers = new Headers();
            headers.append('Authorization', `Bearer ${this.token}`);

            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
            });

            if (!response.ok) {
                console.error('Error:', response.statusText);
                return false;
            }
            return true;
        } catch (error) {
            console.error(`Error: ${error}`);
            return false;
        }
    }

    async updateMedicine(medicine: Medicine) {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${this.token}`);

            const url = `${this.apiUrl}medicine/update`;

            const dataUpdate = {
                id: medicine.id,
                name: medicine.name,
                code: medicine.code,
                expiredDate: medicine.expiredDate,
                manufacturedDate: medicine.manufacturedDate,
                publisher: medicine.publisher,
                instruction: medicine.instruction,
                ingredient: medicine.ingredient,
                quantity: medicine.quantity,
                unit: medicine.unit,
                price: medicine.price,
            };

            const { data, error } = await useFetch(url, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(dataUpdate),
            });

            if (error.value) {
                console.error(`Error: ${error.value}`);
                return false;
            }
            return true;
        } catch (error) {
            console.error(`Error: ${error}`);
            return false;
        }
    }

    async deleteMedicine(medicineID: string) {
        try {
            if (medicineID === null || medicineID === undefined) return false;
            const url = `${this.apiUrl}medicine/delete?medicineId=${medicineID}`; // Replace with your API endpoint
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${this.token}`);
            const response = await fetch(url, {
                method: 'DELETE',
                headers: headers,
            });

            if (!response.ok) {
                console.error('Error:', response.statusText);
                return false;
            }
            return true;
        } catch (error) {
            console.error(`Error: ${error}`);
            return false;
        }
    }

    public async getAllMedicine(page: number, pageSize: number) {
        let medicines = [new Medicine()];
        medicines = [];
        let pagination;
        if (page === 0 || pageSize === 0) return this.pagination;

        const headers = new Headers();
        headers.append('Authorization', `Bearer ${this.token}`);

        const res = await fetch(
            `${this.apiUrl}medicine/alls?page=${page}&pageSize=${pageSize}`,
            {
                headers: headers,
            }
        );
        try {
            if (!res.ok) return this.pagination;

            const data = await res.json();
            data.results.results.forEach((e: any) => {
                medicines.push(
                    new Medicine(
                        e.id,
                        e.name,
                        e.code,
                        this.formatDate(e.expiredDate),
                        this.formatDate(e.manufacturedDate),
                        e.publisher,
                        e.instruction,
                        e.ingredient,
                        e.quantity,
                        e.unit,
                        e.price
                    )
                );
            });
            this.medicine = medicines[0];
            pagination = data.results.pagination;
            this.pagination = new Pagination<Medicine>(
                pageSize,
                pagination.page,
                pagination.count,
                pagination.numPages,
                medicines
            );
            return this.pagination;
        } catch (error) {
            return this.pagination;
        }
    }

    public async searchMedicines(
        keySearch: string,
        page: number,
        pageSize: number
    ) {
        try {
            let medicines = [new Medicine()];
            medicines = [];
            let pagination;
            if (page === 0 || pageSize === 0) return this.pagination;

            const headers = new Headers();
            headers.append('Authorization', `Bearer ${this.token}`);

            const res = await fetch(
                `${this.apiUrl}medicine/search?keyword=${keySearch}&page=${page}&pageSize=${pageSize}`,
                {
                    headers: headers,
                }
            );

            if (!res.ok) return this.pagination;

            const data = await res.json();
            data.results.results.forEach((e: any) => {
                medicines.push(
                    new Medicine(
                      e.id,
                      e.name,
                      e.code,
                      e.expiredDate,
                      e.manufacturedDate,
                      e.publisher,
                      e.instruction,
                      e.ingredient,
                      e.quantity,
                      e.unit,
                      e.price
                    )
                );
            });

            if (medicines.length > 0) {
                this.medicine = medicines[0];
            }
            pagination = data.results.pagination;

            this.pagination = new Pagination<Medicine>(
                pageSize,
                pagination.page,
                pagination.count,
                pagination.numPages,
                medicines
            );
            return this.pagination;
        } catch (error) {
            return this.pagination;
        }
    }
}
