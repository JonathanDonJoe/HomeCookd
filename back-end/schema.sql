DROP TABLE users;

create table users (
    id serial primary key,
    token VARCHAR(257) not null,
    first_name VARCHAR(30) not null,
    last_name VARCHAR(30) not null,
    email varchar(100) not null,
    picture VARCHAR(200) DEFAULT '/images/users/default.png'
);

DROP TABLE events;

create table events (
    id serial primary key,
    time DATE not null,
    address VARCHAR(150) not null,
    title VARCHAR(100) not null,
    description varchar(300) not null,
    host_id INTEGER REFERENCES users(id),
    portions INTEGER not null,
    price FLOAT not null,
    tags VARCHAR (100) not null,
    picture VARCHAR(200) DEFAULT '/images/events/default.png'
);

DROP TABLE attendances;

create table attendances (
    id serial primary key,
    user_id integer REFERENCES users(id),
    event_id integer references events(id),
    paid BOOLEAN DEFAULT FALSE
);

DROP TABLE host_reviews;

create table host_reviews (
    id serial primary key,
    reviewer_id integer REFERENCES users(id),
    event_id integer references events(id),
    stars integer CHECK (stars >= 1 AND stars <=5),
    title varchar(50) not null,
    review varchar(1000) not NULL
);