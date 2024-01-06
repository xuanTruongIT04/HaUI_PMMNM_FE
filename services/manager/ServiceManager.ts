import { BaseObjectManager } from './BaseObjectManager';
import { Service } from '@/models/Service';
import { Pagination } from '@/helpers/Pagination';

export class ServiceManager extends BaseObjectManager {
    public service: Service = new Service();
    public pagination: Pagination<Service> = new Pagination<Service>();

    constructor() {
        super();
    }

    getPropertyTypes() {
        const service = new Service();
        const properties = Object.getOwnPropertyNames(service);
        const types = new Map<string, string>();
        properties.forEach((element) => {
            types.set(element, 'string');
        });
        return types;
    }

    getService() {
        return this.service;
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

    async addService(service: Service) {
        try {
            const url = `${this.apiUrl}master/category?code=${service.code}&name=${service.name}&type=service&description=${service.description}&cost=${service.cost}`;

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

    async updateService(service: Service) {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${this.token}`);

            const url = `${this.apiUrl}master/category?code=${service.code}&name=${service.name}&type=service&description=${service.description}&cost=${service.cost}`;

            const dataUpdate = {
                id: service.id,
                name: service.name,
                code: service.code,
                description: service.description,
                cost: service.cost,
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

    async deleteService(serviceID: string) {
        try {
            if (serviceID === null || serviceID === undefined) return false;
            const url = `${this.apiUrl}master/category?categoryId=${serviceID}`;
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

    public async getAllService() {
        let services = [new Service()];
        services = [];

        const headers = new Headers();
        headers.append('Authorization', `Bearer ${this.token}`);

        const res = await fetch(`${this.apiUrl}master/category?type=service`, {
            headers: headers,
        });
        try {
            if (!res.ok) return this.pagination;

            const data = await res.json();
            data.results.forEach((e: any) => {
                services.push(
                    new Service(e.id, e.name, e.code, e.description, e.cost)
                );
            });

            this.service = services[0];

            return services;
        } catch (error) {
            alert('Error');
            return this.pagination;
        }
    }

    public async searchServices(
        keySearch: string,
        page: number,
        pageSize: number
    ) {
        try {
            let services = [new Service()];
            services = [];
            let pagination;
            if (page === 0 || pageSize === 0) return this.pagination;

            const headers = new Headers();
            headers.append('Authorization', `Bearer ${this.token}`);

            const res = await fetch(
                `${this.apiUrl}service/search?keyword=${keySearch}&page=${page}&pageSize=${pageSize}`,
                {
                    headers: headers,
                }
            );

            if (!res.ok) return this.pagination;

            const data = await res.json();
            data.results.results.forEach((e: any) => {
                services.push(
                    new Service(e.id, e.name, e.code, e.description, e.cost)
                );
            });

            if (services.length > 0) {
                this.service = services[0];
            }
            pagination = data.results.pagination;

            this.pagination = new Pagination<Service>(
                pageSize,
                pagination.page,
                pagination.count,
                pagination.numPages,
                services
            );
            return this.pagination;
        } catch (error) {
            alert('Error');
            return this.pagination;
        }
    }
}
