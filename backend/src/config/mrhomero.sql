-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-03-2025 a las 02:24:14
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mrhomero`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` varchar(255) NOT NULL,
  `cat_nom` varchar(255) NOT NULL,
  `cat_foto` varchar(255) DEFAULT NULL,
  `cat_estado` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `cat_nom`, `cat_foto`, `cat_estado`) VALUES
('categoria_Bebidas_m83s6yln', 'Bebidas', 'https://res.cloudinary.com/ditdxw9ic/image/upload/v1741654622/categoria_Bebidas_m83s6yln.webp', 1),
('categoria_Hamburguesas_m83s84gn', 'Hamburguesas', 'https://res.cloudinary.com/ditdxw9ic/image/upload/v1741654676/categoria_Hamburguesas_m83s84gn.webp', 1),
('categoria_Perros_calientes_m84h4hkx', 'Perros calientes', 'https://res.cloudinary.com/ditdxw9ic/image/upload/v1741696497/categoria_Perros_calientes_m84h4hkx.webp', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_ventas`
--

CREATE TABLE `detalle_ventas` (
  `id_detalle` int(11) NOT NULL,
  `id_venta` varchar(255) DEFAULT NULL,
  `id_producto` varchar(255) DEFAULT NULL,
  `cantidad_producto` int(11) DEFAULT NULL,
  `precio_unitario` varchar(255) NOT NULL,
  `subtotal` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_ventas`
--

INSERT INTO `detalle_ventas` (`id_detalle`, `id_venta`, `id_producto`, `cantidad_producto`, `precio_unitario`, `subtotal`) VALUES
(1, 'venta_e88599f1-2d5b-4d41-baa8-95078441ab43', 'producto_Colombiana_m84glp2f', 1, '5000', '5000'),
(2, 'venta_f94158e5-66e4-4711-8a56-1fe781a44b7b', 'producto_Pepsi_m83sa5gq', 1, '5000', '5000'),
(3, 'venta_94daf4df-652a-4b16-9359-7efe4e4badb0', 'producto_Hamburguesa doble_m84ggd2f', 1, '10000', '10000'),
(5, 'venta_94daf4df-652a-4b16-9359-7efe4e4badb0', 'producto_Perro_especial_m84h5i2i', 1, '7000', '7000'),
(6, 'venta_94daf4df-652a-4b16-9359-7efe4e4badb0', 'producto_Perro_hipermega_m84h687v', 1, '8000', '8000'),
(8, 'venta_94daf4df-652a-4b16-9359-7efe4e4badb0', 'producto_Hamburguesa queso doble_m84gc67t', 1, '15000', '15000'),
(9, 'venta_94daf4df-652a-4b16-9359-7efe4e4badb0', 'producto_Hamburguesa doble con jamon_m84gfy4f', 1, '12000', '12000'),
(10, 'venta_94daf4df-652a-4b16-9359-7efe4e4badb0', 'producto_Hamburguesa especial_m84gjzsa', 1, '7000', '7000'),
(11, 'venta_218ec110-0948-4b0f-89bc-c0e79fae26e9', 'producto_Colombiana_m84glp2f', 1, '5000', '5000'),
(12, 'venta_218ec110-0948-4b0f-89bc-c0e79fae26e9', 'producto_Perro_especial_m84h5i2i', 1, '7000', '7000'),
(13, 'venta_218ec110-0948-4b0f-89bc-c0e79fae26e9', 'producto_Hamburguesa doble_m84ggd2f', 1, '10000', '10000'),
(14, 'venta_218ec110-0948-4b0f-89bc-c0e79fae26e9', 'producto_Pepsi_m83sa5gq', 1, '5000', '5000'),
(15, 'venta_218ec110-0948-4b0f-89bc-c0e79fae26e9', 'producto_Perro_hipermega_m84h687v', 1, '8000', '8000'),
(16, 'venta_218ec110-0948-4b0f-89bc-c0e79fae26e9', 'producto_Hamburguesa queso doble_m84gc67t', 1, '15000', '15000'),
(17, 'venta_218ec110-0948-4b0f-89bc-c0e79fae26e9', 'producto_Hamburguesa doble con jamon_m84gfy4f', 1, '12000', '12000'),
(18, 'venta_218ec110-0948-4b0f-89bc-c0e79fae26e9', 'producto_Hamburguesa especial_m84gjzsa', 1, '7000', '7000'),
(19, 'venta_e56f8b35-fecb-4cec-9234-398a26176b6c', 'producto_Pepsi_m83sa5gq', 1, '5000', '5000'),
(20, 'venta_e56f8b35-fecb-4cec-9234-398a26176b6c', 'producto_Hamburguesa queso doble_m84gc67t', 1, '15000', '15000'),
(21, 'venta_e56f8b35-fecb-4cec-9234-398a26176b6c', 'producto_Perro_especial_m84h5i2i', 1, '7000', '7000'),
(22, 'venta_e56f8b35-fecb-4cec-9234-398a26176b6c', 'producto_Perro_hipermega_m84h687v', 1, '8000', '8000'),
(23, 'venta_e56f8b35-fecb-4cec-9234-398a26176b6c', 'producto_Hamburguesa doble_m84ggd2f', 1, '10000', '10000'),
(24, 'venta_e56f8b35-fecb-4cec-9234-398a26176b6c', 'producto_Hamburguesa doble con jamon_m84gfy4f', 1, '12000', '12000'),
(25, 'venta_e56f8b35-fecb-4cec-9234-398a26176b6c', 'producto_Hamburguesa especial_m84gjzsa', 1, '7000', '7000'),
(26, 'venta_dc2c5d2d-6615-4872-86c6-5fbec17db30b', 'producto_Pepsi_m83sa5gq', 6, '5000', '30000'),
(27, 'venta_aa240d38-e175-4a6e-87fa-145e673feae5', 'producto_Hamburguesa doble_m84ggd2f', 4, '10000', '40000'),
(28, 'venta_aa240d38-e175-4a6e-87fa-145e673feae5', 'producto_Hamburguesa especial_m84gjzsa', 3, '7000', '21000'),
(29, 'venta_6d6bd1b3-e57e-4e19-9d05-febe08dd3fbd', 'producto_Colombiana_m84glp2f', 1, '5000', '5000'),
(30, 'venta_6d6bd1b3-e57e-4e19-9d05-febe08dd3fbd', 'producto_Hamburguesa doble con jamon_m84gfy4f', 1, '12000', '12000'),
(31, 'venta_6d6bd1b3-e57e-4e19-9d05-febe08dd3fbd', 'producto_Hamburguesa especial_m84gjzsa', 1, '7000', '7000'),
(32, 'venta_6d6bd1b3-e57e-4e19-9d05-febe08dd3fbd', 'producto_Hamburguesa queso doble_m84gc67t', 5, '15000', '75000'),
(33, 'venta_6d6bd1b3-e57e-4e19-9d05-febe08dd3fbd', 'producto_Perro_especial_m84h5i2i', 1, '7000', '7000'),
(34, 'venta_6d6bd1b3-e57e-4e19-9d05-febe08dd3fbd', 'producto_Perro_hipermega_m84h687v', 1, '8000', '8000'),
(35, 'venta_6d6bd1b3-e57e-4e19-9d05-febe08dd3fbd', 'producto_Pepsi_m83sa5gq', 1, '5000', '5000'),
(36, 'venta_0a094519-7ec9-4fe6-b295-2efe8676cb79', 'producto_Hamburguesa doble con jamon_m84gfy4f', 2, '12000', '24000'),
(37, 'venta_0a094519-7ec9-4fe6-b295-2efe8676cb79', 'producto_Colombiana_m84glp2f', 2, '5000', '10000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados_horas`
--

CREATE TABLE `empleados_horas` (
  `id_horas` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora_inicio` datetime DEFAULT NULL,
  `hora_fin` datetime DEFAULT NULL,
  `id_user` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id_producto_inv` int(11) NOT NULL,
  `inv_nombre` varchar(255) NOT NULL,
  `categoria_inv_nom` varchar(255) NOT NULL,
  `inv_fecha_ing` date NOT NULL,
  `inv_fecha_cad` date NOT NULL,
  `inv_cantidad` int(11) NOT NULL,
  `inv_cantidad_min` int(11) NOT NULL,
  `id_proveedor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`id_producto_inv`, `inv_nombre`, `categoria_inv_nom`, `inv_fecha_ing`, `inv_fecha_cad`, `inv_cantidad`, `inv_cantidad_min`, `id_proveedor`) VALUES
(3, 'Tomate', 'Perecedero', '2025-03-11', '2025-03-09', 25, 22, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` varchar(255) NOT NULL,
  `pro_nom` varchar(255) NOT NULL,
  `pro_desp` varchar(255) NOT NULL,
  `pro_precio` varchar(255) NOT NULL,
  `pro_foto` varchar(255) NOT NULL,
  `pro_puntos` varchar(255) NOT NULL,
  `pro_estado` int(2) NOT NULL DEFAULT 1,
  `id_categoria` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `pro_nom`, `pro_desp`, `pro_precio`, `pro_foto`, `pro_puntos`, `pro_estado`, `id_categoria`) VALUES
('producto_Colombiana_m84glp2f', 'Colombiana', 'Colombiana 1.5L', '5000', 'https://res.cloudinary.com/ditdxw9ic/image/upload/v1741695620/producto_Colombiana_m84glp2f.webp', '5', 1, 'categoria_Bebidas_m83s6yln'),
('producto_Hamburguesa doble con jamon_m84gfy4f', 'Hamburguesa doble con jamon', 'Hamburguesa con doble carne y jamon', '12000', 'https://res.cloudinary.com/ditdxw9ic/image/upload/v1741695352/producto_Hamburguesa%20doble%20con%20jamon_m84gfy4f.webp', '12', 1, 'categoria_Hamburguesas_m83s84gn'),
('producto_Hamburguesa doble_m84ggd2f', 'Hamburguesa doble', 'Hamburguesa con doble carne', '10000', 'https://res.cloudinary.com/ditdxw9ic/image/upload/v1741695371/producto_Hamburguesa%20doble_m84ggd2f.webp', '10', 1, 'categoria_Hamburguesas_m83s84gn'),
('producto_Hamburguesa especial_m84gjzsa', 'Hamburguesa especial', 'Hamburguesa especial', '7000', 'https://res.cloudinary.com/ditdxw9ic/image/upload/v1741695541/producto_Hamburguesa%20especial_m84gjzsa.webp', '7', 1, 'categoria_Hamburguesas_m83s84gn'),
('producto_Hamburguesa queso doble_m84gc67t', 'Hamburguesa queso doble', 'Hamburguesa con queso doble', '15000', 'https://res.cloudinary.com/ditdxw9ic/image/upload/v1741695176/producto_Hamburguesa%20queso%20doble_m84gc67t.webp', '15', 1, 'categoria_Hamburguesas_m83s84gn'),
('producto_Pepsi_m83sa5gq', 'Pepsi', 'pepsi 1.5L', '5000', 'https://res.cloudinary.com/ditdxw9ic/image/upload/v1741654771/producto_Pepsi_m83sa5gq.webp', '5', 1, 'categoria_Bebidas_m83s6yln'),
('producto_Perro_especial_m84h5i2i', 'Perro especial', 'Perros especial', '7000', 'https://res.cloudinary.com/ditdxw9ic/image/upload/v1741696544/producto_Perro_especial_m84h5i2i.webp', '7', 1, 'categoria_Perros_calientes_m84h4hkx'),
('producto_Perro_hipermega_m84h687v', 'Perro hipermega', 'Perro hipermega', '8000', 'https://res.cloudinary.com/ditdxw9ic/image/upload/v1741696578/producto_Perro_hipermega_m84h687v.webp', '8', 1, 'categoria_Perros_calientes_m84h4hkx');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id_proveedor` int(11) NOT NULL,
  `prov_nombre` varchar(255) NOT NULL,
  `prov_direccion` varchar(255) DEFAULT NULL,
  `prov_contacto_nombre` varchar(255) DEFAULT NULL,
  `prov_contacto_telefono` varchar(15) DEFAULT NULL,
  `prov_contacto_email` varchar(255) DEFAULT NULL,
  `prov_activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id_proveedor`, `prov_nombre`, `prov_direccion`, `prov_contacto_nombre`, `prov_contacto_telefono`, `prov_contacto_email`, `prov_activo`) VALUES
(1, 'Coca cola', 'Carrera 1 A este # 43b-03 sur', 'Mr. Teaaaa', '3138975212', 'mrtea@gmail.com', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recompensas`
--

CREATE TABLE `recompensas` (
  `id_recomp` varchar(255) NOT NULL,
  `recompensa_nombre` varchar(255) NOT NULL,
  `recompensa_descripcion` varchar(255) NOT NULL,
  `recomp_num_puntos` int(11) NOT NULL,
  `recomp_foto` varchar(255) NOT NULL,
  `recomp_estado` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recompensas`
--

INSERT INTO `recompensas` (`id_recomp`, `recompensa_nombre`, `recompensa_descripcion`, `recomp_num_puntos`, `recomp_foto`, `recomp_estado`) VALUES
('recompensa_Figura_homero_m84hlips', 'Figura homero', 'Figura epica de mr homero', 110, 'https://res.cloudinary.com/ditdxw9ic/image/upload/v1741697292/recompensa_Figura_homero_m84hlips.webp', 1),
('recompensa_Funkopop_m84hlv2u', 'Funkopop', 'Funkopop de homero', 100, 'https://res.cloudinary.com/ditdxw9ic/image/upload/v1741697307/recompensa_Funkopop_m84hlv2u.webp', 1),
('recompensa_Peluche_de_millonarios_homero_m84hnyfc', 'Peluche de millonarios homero', 'Peluche de millonarios homero', 20, 'https://res.cloudinary.com/ditdxw9ic/image/upload/v1741697405/recompensa_Peluche_de_millonarios_homero_m84hnyfc.webp', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recompensas_obt`
--

CREATE TABLE `recompensas_obt` (
  `id_recomp_obt` int(11) NOT NULL,
  `id_recomp` varchar(255) NOT NULL,
  `id_user` varchar(255) NOT NULL,
  `codigo` varchar(6) NOT NULL,
  `fecha_reclamo` datetime NOT NULL,
  `estado` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recompensas_obt`
--

INSERT INTO `recompensas_obt` (`id_recomp_obt`, `id_recomp`, `id_user`, `codigo`, `fecha_reclamo`, `estado`) VALUES
(3, 'recompensa_Peluche_de_millonarios_homero_m84hnyfc', 'user_Dilan_Santiago_1740098072789', '536820', '2025-03-11 08:26:14', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `rol` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `rol`) VALUES
(1, 'Administrador'),
(2, 'Empleado'),
(3, 'Cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_user` varchar(255) NOT NULL,
  `user_nom` varchar(255) NOT NULL,
  `user_apels` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_tel` varchar(255) DEFAULT NULL,
  `user_puntos` int(11) NOT NULL,
  `user_foto` varchar(255) DEFAULT NULL,
  `user_pass` varchar(255) NOT NULL,
  `user_reset_code` varchar(7) DEFAULT NULL,
  `user_reset_code_expiration` datetime DEFAULT NULL,
  `user_fecha_registro` datetime NOT NULL,
  `id_rol` int(11) NOT NULL,
  `user_estado` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_user`, `user_nom`, `user_apels`, `user_email`, `user_tel`, `user_puntos`, `user_foto`, `user_pass`, `user_reset_code`, `user_reset_code_expiration`, `user_fecha_registro`, `id_rol`, `user_estado`) VALUES
('user_admin_1740097849543', 'admin', 'admin', 'admin@gmail.com', '3138975212', 0, 'https://res.cloudinary.com/ditdxw9ic/image/upload/v1740188123/user_admin_1740097849543.webp', '$2a$10$nhZ0WNjJk.oghLVI72XaPu45HoRCp/XOd3SpnmmvqCQzexejlllQS', NULL, NULL, '2025-02-20 19:30:49', 1, 1),
('user_Bryam_1740098049146', 'Bryam', 'castañeda cuervo', 'bryamccuervo2004@gmail.com', NULL, 0, 'https://res.cloudinary.com/ditdxw9ic/image/upload/v1740188123/user_admin_1740097849543.webp', '$2a$10$x6V069NY.nSJtwa4h5sPle7WsKLiWk3PGCV/qJSEYWk15RokylCee', NULL, NULL, '2025-02-20 19:34:09', 3, 1),
('user_Dilan_Santiago_1740098072789', 'Dilan Santiago', 'López Romero', 'dilanfantas@gmail.com', '3138975212', 143, 'https://res.cloudinary.com/ditdxw9ic/image/upload/v1740188123/user_admin_1740097849543.webp', '$2a$10$8xpwM3J6n4Xw2ejj6kqsV.qg0XhjWg8BtSRsFgV5PPf.b2EtYklEu', NULL, NULL, '2025-03-11 00:00:00', 2, 1),
('user_Heiver_1741698186537', 'Heiver', 'Cuesta', 'heiver@gmail.com', NULL, 14, 'https://res.cloudinary.com/ditdxw9ic/image/upload/v1740188123/user_admin_1740097849543.webp', '$2a$10$/.za0rvYkLTphYheGHntJexPueazxsKCYkMCE6A09o/pPk.yWdyDy', NULL, NULL, '2025-03-11 08:03:06', 3, 1),
('user_Johan_Sebastian_1740098106538', 'Johan Sebastian', 'Muñoz Contreras', 'johanmc@gmail.com', NULL, 138, 'https://res.cloudinary.com/ditdxw9ic/image/upload/v1740188123/user_admin_1740097849543.webp', '$2a$10$LCLJnriPFmYy/0ARI9W75OIhXqiTIlawgzczsgDUtiN0Nmvhs7P72', NULL, NULL, '2025-02-20 19:35:06', 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id_venta` varchar(255) NOT NULL,
  `venta_fecha` datetime NOT NULL,
  `id_user` varchar(255) DEFAULT NULL,
  `venta_metodo_pago` varchar(255) NOT NULL,
  `venta_total` int(11) NOT NULL,
  `venta_estado` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id_venta`, `venta_fecha`, `id_user`, `venta_metodo_pago`, `venta_total`, `venta_estado`) VALUES
('venta_0a094519-7ec9-4fe6-b295-2efe8676cb79', '2025-03-11 08:08:42', 'user_Heiver_1741698186537', 'Efectivo', 34000, 1),
('venta_218ec110-0948-4b0f-89bc-c0e79fae26e9', '2024-12-04 07:39:24', 'user_Johan_Sebastian_1740098106538', 'Efectivo', 69000, 1),
('venta_6d6bd1b3-e57e-4e19-9d05-febe08dd3fbd', '2025-03-11 07:40:35', 'user_Bryam_1740098049146', 'Efectivo', 119000, 1),
('venta_94daf4df-652a-4b16-9359-7efe4e4badb0', '2025-03-11 07:39:04', 'user_Johan_Sebastian_1740098106538', 'Efectivo', 69000, 1),
('venta_aa240d38-e175-4a6e-87fa-145e673feae5', '2025-03-11 07:40:11', NULL, 'Efectivo', 61000, 1),
('venta_dc2c5d2d-6615-4872-86c6-5fbec17db30b', '2025-02-01 07:40:03', NULL, 'Efectivo', 30000, 1),
('venta_e56f8b35-fecb-4cec-9234-398a26176b6c', '2025-02-13 07:39:45', 'user_Bryam_1740098049146', 'Efectivo', 64000, 1),
('venta_e88599f1-2d5b-4d41-baa8-95078441ab43', '2025-01-01 07:38:42', NULL, 'Efectivo', 5000, 1),
('venta_f94158e5-66e4-4711-8a56-1fe781a44b7b', '2025-03-11 07:38:48', NULL, 'Efectivo', 5000, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `detalle_ventas_venta` (`id_venta`);

--
-- Indices de la tabla `empleados_horas`
--
ALTER TABLE `empleados_horas`
  ADD PRIMARY KEY (`id_horas`),
  ADD KEY `empleados` (`id_user`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id_producto_inv`),
  ADD KEY `inventario - proveedor` (`id_proveedor`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `categoria` (`id_categoria`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id_proveedor`);

--
-- Indices de la tabla `recompensas`
--
ALTER TABLE `recompensas`
  ADD PRIMARY KEY (`id_recomp`);

--
-- Indices de la tabla `recompensas_obt`
--
ALTER TABLE `recompensas_obt`
  ADD PRIMARY KEY (`id_recomp_obt`),
  ADD KEY `recompensa` (`id_recomp`),
  ADD KEY `id_usuario` (`id_user`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `user_email` (`user_email`),
  ADD KEY `rol` (`id_rol`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `usuario venta` (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `empleados_horas`
--
ALTER TABLE `empleados_horas`
  MODIFY `id_horas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id_producto_inv` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id_proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `recompensas_obt`
--
ALTER TABLE `recompensas_obt`
  MODIFY `id_recomp_obt` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  ADD CONSTRAINT `id_venta` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `empleados_horas`
--
ALTER TABLE `empleados_horas`
  ADD CONSTRAINT `user` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_user`);

--
-- Filtros para la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `inventario - proveedor` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id_proveedor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `recompensas_obt`
--
ALTER TABLE `recompensas_obt`
  ADD CONSTRAINT `id_usuario` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_user`),
  ADD CONSTRAINT `recompensa` FOREIGN KEY (`id_recomp`) REFERENCES `recompensas` (`id_recomp`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `rol` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
