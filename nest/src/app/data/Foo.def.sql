CREATE SEQUENCE public.foo_data_seq
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1
    NO CYCLE;

CREATE TABLE public."foo"
(
    id      int NOT NULL PRIMARY KEY,
    version int NOT NULL DEFAULT 0
);

CREATE TABLE public."foo-data"
(
    id     int     NOT NULL PRIMARY KEY DEFAULT nextval('foo_data_seq'),
    data   varchar NOT NULL,
    foo_id int     NOT NULL
);

INSERT INTO public."foo" (id, "version")
VALUES (1, 1),
       (2, 1);

INSERT INTO public."foo-data" (id, "data", "foo_id")
VALUES (nextval('foo_data_seq'), '123', 1);
