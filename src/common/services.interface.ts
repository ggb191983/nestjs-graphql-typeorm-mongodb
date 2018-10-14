
export interface IService<T> {
    findAll(): Promise<Array<T>>;
    create(dto: T): Promise<T>;
    update(dto: T): Promise<T>;
    find(id: string): Promise<T>;
}