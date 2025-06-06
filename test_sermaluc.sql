PGDMP  -    *    	            }           test_sermaluc    16.8    16.8     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    17454    test_sermaluc    DATABASE     s   CREATE DATABASE test_sermaluc WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'es-CL';
    DROP DATABASE test_sermaluc;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    5            �            1259    17473    phone    TABLE     �   CREATE TABLE public.phone (
    phone_id integer NOT NULL,
    number integer NOT NULL,
    user_id uuid,
    citycode integer NOT NULL,
    countrycode integer NOT NULL
);
    DROP TABLE public.phone;
       public         heap    postgres    false    5            �            1259    17472    phone_phone_id_seq    SEQUENCE     �   CREATE SEQUENCE public.phone_phone_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.phone_phone_id_seq;
       public          postgres    false    5    218            �           0    0    phone_phone_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.phone_phone_id_seq OWNED BY public.phone.phone_id;
          public          postgres    false    217            �            1259    17466    user    TABLE     l  CREATE TABLE public."user" (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(50) NOT NULL,
    created date NOT NULL,
    "isActive" boolean NOT NULL,
    modified date,
    last_login date NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(200) NOT NULL,
    token character varying(500)
);
    DROP TABLE public."user";
       public         heap    postgres    false    5    5    5            *           2604    17476    phone phone_id    DEFAULT     p   ALTER TABLE ONLY public.phone ALTER COLUMN phone_id SET DEFAULT nextval('public.phone_phone_id_seq'::regclass);
 =   ALTER TABLE public.phone ALTER COLUMN phone_id DROP DEFAULT;
       public          postgres    false    218    217    218            �          0    17473    phone 
   TABLE DATA           Q   COPY public.phone (phone_id, number, user_id, citycode, countrycode) FROM stdin;
    public          postgres    false    218   �       �          0    17466    user 
   TABLE DATA           r   COPY public."user" (user_id, name, created, "isActive", modified, last_login, email, password, token) FROM stdin;
    public          postgres    false    216   �       �           0    0    phone_phone_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.phone_phone_id_seq', 60, true);
          public          postgres    false    217            .           2606    17478 $   phone PK_1ce64a186658cad23903a6188ec 
   CONSTRAINT     j   ALTER TABLE ONLY public.phone
    ADD CONSTRAINT "PK_1ce64a186658cad23903a6188ec" PRIMARY KEY (phone_id);
 P   ALTER TABLE ONLY public.phone DROP CONSTRAINT "PK_1ce64a186658cad23903a6188ec";
       public            postgres    false    218            ,           2606    17471 #   user PK_758b8ce7c18b9d347461b30228d 
   CONSTRAINT     j   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY (user_id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_758b8ce7c18b9d347461b30228d";
       public            postgres    false    216            /           2606    17483 $   phone FK_2034c8bc8da57d18b69fd90bcfa    FK CONSTRAINT     �   ALTER TABLE ONLY public.phone
    ADD CONSTRAINT "FK_2034c8bc8da57d18b69fd90bcfa" FOREIGN KEY (user_id) REFERENCES public."user"(user_id);
 P   ALTER TABLE ONLY public.phone DROP CONSTRAINT "FK_2034c8bc8da57d18b69fd90bcfa";
       public          postgres    false    216    218    4652            �   C   x��˱� �v!ψ|e�4�q��C�?sn�a�Z�P;%�2p ^�eF���c�"%��Y����o      �   \  x�M��r�0 @g�
W8
�VE�p&TE�%�"�*__�u|w�==�R�̙jA��Vn�s�@uJYfZ)�i2S0mx=>R�e���y����1�Ъ�MZ+P���*�)�r!�Y��*���*)�4VKe�	�'�s�a�85��<؝��]�g�^��>���;B�3uQ�/��g�7J�v�dø�]t� =��`2Y��>�;��OC4H����} ���������Z/$s݈BR?.�t�H\��v��;�N�����N��"���᳋�E��i��H�/��{�G �kcxT�v�=�6�
�����O�C|�7����Jf��e����$�'���+��P�.�h4�v���     