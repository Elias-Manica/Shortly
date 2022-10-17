--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: linkUsers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."linkUsers" (
    id integer NOT NULL,
    "userId" integer,
    url text NOT NULL,
    "shortURL" text NOT NULL,
    "visitCountUrl" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: linkUsers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."linkUsers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: linkUsers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."linkUsers_id_seq" OWNED BY public."linkUsers".id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer,
    token text NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL
);


--
-- Name: usersQuantity; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."usersQuantity" (
    id integer NOT NULL,
    "userId" integer,
    "visitCount" integer DEFAULT 0 NOT NULL
);


--
-- Name: usersQuantity_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."usersQuantity_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: usersQuantity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."usersQuantity_id_seq" OWNED BY public."usersQuantity".id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: linkUsers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."linkUsers" ALTER COLUMN id SET DEFAULT nextval('public."linkUsers_id_seq"'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: usersQuantity id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersQuantity" ALTER COLUMN id SET DEFAULT nextval('public."usersQuantity_id_seq"'::regclass);


--
-- Data for Name: linkUsers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."linkUsers" VALUES (1, 1, 'https://stackoverflow.com/questions/24006291/postgresql-return-result-set-as-json-array', '123', 0, '2022-10-14 16:45:44.582314');
INSERT INTO public."linkUsers" VALUES (2, 1, 'https://github.com/Elias-Manica/Boardcamp/blob/main/src/controllers/rentals.controller.js', '321', 0, '2022-10-14 16:47:23.266276');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'elias', 'elias@gmail.com', 'teste');
INSERT INTO public.users VALUES (2, 'TESTE', 'teste@gmail.com', '123');


--
-- Data for Name: usersQuantity; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."usersQuantity" VALUES (1, 1, 0);
INSERT INTO public."usersQuantity" VALUES (2, 2, 0);


--
-- Name: linkUsers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."linkUsers_id_seq"', 2, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 1, false);


--
-- Name: usersQuantity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."usersQuantity_id_seq"', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: linkUsers linkUsers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."linkUsers"
    ADD CONSTRAINT "linkUsers_pkey" PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: usersQuantity usersQuantity_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersQuantity"
    ADD CONSTRAINT "usersQuantity_pkey" PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: linkUsers linkUsers_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."linkUsers"
    ADD CONSTRAINT "linkUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: usersQuantity usersQuantity_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersQuantity"
    ADD CONSTRAINT "usersQuantity_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

