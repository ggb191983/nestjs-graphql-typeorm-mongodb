import { Entity, ObjectID, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CreateMovieInput } from '../..../../graphql.schema';
import { Min, IsDate } from 'class-validator';

export interface IMovie {
    _id: any;
    title: string;
    age: number;
    createdAt: Date;
    updatedAt: Date;
}

export class CreateMovieDto extends CreateMovieInput {
    @Min(18)
    age: number;
}

export class MovieDto implements IMovie {
    _id: any;
    title: string;
    age: number;
    readonly createdAt: Date;
    updatedAt: Date;

    constructor(private movie: Movie) {
        this._id = movie._id;
        this.title = movie.title;
        this.age = movie.age;
        this.createdAt = movie.createdAt;
        this.updatedAt = movie.updatedAt;
    }
}

@Entity()
export class Movie implements IMovie {

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    title: string;

    @Column()
    age: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
