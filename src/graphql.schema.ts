export class CreateMovieInput {
    title: string;
    age?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Movie {
    _id: ObjectID;
    title: string;
    age?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export abstract class IMutation {
    abstract createMovie(createMovieInput?: CreateMovieInput): Movie | Promise<Movie>;
}

export abstract class IQuery {
    abstract getMovies(): Movie[] | Promise<Movie[]>;

    abstract movie(_id: ObjectID): Movie | Promise<Movie>;

    abstract temp__(): boolean | Promise<boolean>;
}

export abstract class ISubscription {
    abstract movieCreated(): Movie | Promise<Movie>;
}

export type Date = any;
export type ObjectID = any;
