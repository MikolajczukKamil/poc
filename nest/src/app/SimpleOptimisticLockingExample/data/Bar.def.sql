CREATE SEQUENCE public.bar_seq
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1
    NO CYCLE;

CREATE TABLE public."bar"
(
    id      int     NOT NULL PRIMARY KEY DEFAULT nextval('bar_seq'),
    data    varchar NULL,
    version int     NOT NULL             DEFAULT 0
);

INSERT INTO public."bar" (id, data, version)
VALUES (1, '123', 1),
       (2, '456', 1);
