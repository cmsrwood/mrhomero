-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-12-2024 a las 23:23:27
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

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
  `id_categoria` int(11) NOT NULL,
  `cat_nom` varchar(255) NOT NULL,
  `cat_foto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `cat_nom`, `cat_foto`) VALUES
(1, 'Salchipapas', 'categoria_1731958115615.png'),
(3, 'Choripan', 'categoria_1731958154747.png'),
(4, 'Hambuguesas', 'categoria_1731958170082.png'),
(5, 'Otros', 'categoria_1731958185282.png'),
(6, 'Choriperro', 'categoria_1732132518723.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_inv`
--

CREATE TABLE `categorias_inv` (
  `id_categoria_inv` int(11) NOT NULL,
  `categoria_inv_nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias_inv`
--

INSERT INTO `categorias_inv` (`id_categoria_inv`, `categoria_inv_nom`) VALUES
(1, 'Perecedero'),
(2, 'Congelado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_ventas`
--

CREATE TABLE `detalle_ventas` (
  `id_detalle` int(11) NOT NULL,
  `id_venta` varchar(255) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad_producto` int(11) DEFAULT NULL,
  `precio_unitario` varchar(255) NOT NULL,
  `subtotal` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_ventas`
--

INSERT INTO `detalle_ventas` (`id_detalle`, `id_venta`, `id_producto`, `cantidad_producto`, `precio_unitario`, `subtotal`) VALUES
(2, 'venta_15cb6eeb-5a67-439c-9413-45bdd3380b45', 2, 10, '24000', '240000'),
(3, 'venta_15cb6eeb-5a67-439c-9413-45bdd3380b45', 3, 5, '20000', '100000'),
(4, 'venta_15cb6eeb-5a67-439c-9413-45bdd3380b45', 4, 5, '23000', '115000'),
(5, 'venta_15cb6eeb-5a67-439c-9413-45bdd3380b45', 1, 14, '24000', '336000'),
(6, 'venta_c6233c32-408e-4410-9636-00203e8de4c1', 5, 3, '20000', '60000'),
(7, 'venta_c6233c32-408e-4410-9636-00203e8de4c1', 6, 1, '20000', '20000'),
(8, 'venta_49b667a1-8046-47c4-89fc-c69af8996c7a', 6, 4, '20000', '80000'),
(9, 'venta_4cda8a38-d74f-4028-b34c-175b3406b360', 2, 1, '24000', '24000'),
(10, 'venta_fbdfdb70-0a0a-47db-8aa2-0f3f4fa6b89e', 4, 1, '23000', '23000'),
(11, 'venta_5406794c-4e24-418d-a4e0-9b22ccbb9b0b', 6, 1, '20000', '20000'),
(12, 'venta_3edacc16-5fa2-4c10-9b65-27f787ede0b6', 6, 1, '20000', '20000'),
(13, 'venta_3edacc16-5fa2-4c10-9b65-27f787ede0b6', 5, 1, '20000', '20000'),
(14, 'venta_342a8c83-affb-4910-aed0-821b92177ddc', 6, 1, '20000', '20000'),
(15, 'venta_342a8c83-affb-4910-aed0-821b92177ddc', 5, 1, '20000', '20000'),
(16, 'venta_24fc8def-3225-4cc9-b003-cd47d17e8921', 6, 4, '20000', '80000'),
(17, 'venta_bc4cd0e5-377f-4439-8581-edf2f4cef9a5', 1, 1, '24000', '24000'),
(18, 'venta_bc4cd0e5-377f-4439-8581-edf2f4cef9a5', 4, 1, '23000', '23000'),
(19, 'venta_bc4cd0e5-377f-4439-8581-edf2f4cef9a5', 5, 1, '20000', '20000'),
(20, 'venta_bc4cd0e5-377f-4439-8581-edf2f4cef9a5', 3, 1, '20000', '20000'),
(21, 'venta_bc4cd0e5-377f-4439-8581-edf2f4cef9a5', 2, 1, '24000', '24000'),
(22, 'venta_bc4cd0e5-377f-4439-8581-edf2f4cef9a5', 6, 1, '20000', '20000'),
(23, 'venta_48998611-292e-484d-9a0b-ab8fefeb6d04', 4, 1, '23000', '23000'),
(24, 'venta_9a7b76e5-69f2-4c3f-8aae-dd8d14cd70bc', 3, 1, '20000', '20000'),
(25, 'venta_8436eb60-baa2-46cc-b7f9-06c2bf824681', 7, 2, '24000', '48000'),
(26, 'venta_081bbb9b-7018-43db-a890-98113df95eaf', 1, 1, '24000', '24000'),
(27, 'venta_081bbb9b-7018-43db-a890-98113df95eaf', 3, 1, '20000', '20000'),
(28, 'venta_7f35b298-8ead-436f-8dab-3e1d36168b1f', 1, 1, '24000', '24000'),
(29, 'venta_8c164781-94eb-40db-860e-26b05e4101ca', 1, 5, '24000', '120000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados_horas`
--

CREATE TABLE `empleados_horas` (
  `id_horas` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fin` time DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id_producto_inv` int(11) NOT NULL,
  `inv_nombre` varchar(255) NOT NULL,
  `id_categoria_inv` int(11) NOT NULL,
  `inv_fecha_ing` date NOT NULL,
  `inv_fecha_cad` date NOT NULL,
  `inv_cantidad` int(11) NOT NULL,
  `inv_cantidad_min` int(11) NOT NULL,
  `id_proveedor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `pro_nom` varchar(255) NOT NULL,
  `pro_desp` varchar(255) NOT NULL,
  `pro_precio` varchar(255) NOT NULL,
  `pro_foto` varchar(255) NOT NULL,
  `pro_puntos` varchar(255) NOT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `pro_nom`, `pro_desp`, `pro_precio`, `pro_foto`, `pro_puntos`, `id_categoria`) VALUES
(1, 'Salchipapa hipermega', 'skjalfjslk', '24000', 'producto_1731958927037.png', '24', 1),
(2, 'Choriperro especial', 'Descripcion', '24000', 'producto_1731959887383.png', '24', 3),
(3, 'Choriperro maximo', 'safsaf', '20000', 'producto_1731959901628.png', '20', 3),
(4, 'Choriperro sencillo', 'dksajflk', '23000', 'producto_1731959924701.png', '23', 3),
(5, 'Hamburguesas queso doble', 'wawga', '20000', 'producto_1731961468602.png', '20', 4),
(6, 'Hamburguesa mega', 'aksjflkwajflkwajl', '20000', 'producto_1731961477804.png', '20', 4),
(7, 'Choriperro maximoo', 'dawfwa', '24000', 'producto_1732132542212.png', '24', 6),
(8, 'Hamburguesa poderosa', 'a', '24000', 'producto_1732563837587.png', '24', 4);

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
(1, 'coca cola', 'Carrera 1 A este # 43b-03 sur', 'dwawafwaf', '3138975212', 'dilanfantas@gmail.com', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recompensas`
--

CREATE TABLE `recompensas` (
  `id_recomp` int(11) NOT NULL,
  `recompensa_nombre` varchar(255) NOT NULL,
  `recompensa_descripcion` varchar(255) NOT NULL,
  `recomp_num_puntos` int(11) NOT NULL,
  `recomp_foto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recompensas`
--

INSERT INTO `recompensas` (`id_recomp`, `recompensa_nombre`, `recompensa_descripcion`, `recomp_num_puntos`, `recomp_foto`) VALUES
(1, 'Peluche', 'Peluche god', 50, 'recompensa_1732746157668.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recompensas_obt`
--

CREATE TABLE `recompensas_obt` (
  `id_recomp_obt` int(11) NOT NULL,
  `id_recomp` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `codigo` varchar(6) NOT NULL,
  `estado` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `id_user` int(11) NOT NULL,
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
  `user_estado` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_user`, `user_nom`, `user_apels`, `user_email`, `user_tel`, `user_puntos`, `user_foto`, `user_pass`, `user_reset_code`, `user_reset_code_expiration`, `user_fecha_registro`, `id_rol`, `user_estado`) VALUES
(1, 'admin', 'admin', 'admin@gmail.com', NULL, 0, NULL, '$2a$10$ryatX/igKMkGPSkbfq8s4e5lRevbYJhh1g25cajrc82xgDku4csG2', NULL, NULL, '2024-10-03 19:40:47', 1, 0),
(2, 'Dilan Santiago', 'López Romero', 'dilanfantas@gmail.com', NULL, 20, NULL, '$2a$10$nIXpxd3AQdOvYUMAfHDc5.JLn6vPen5cVJdXVTcnpBWY8k6k7cB2.', NULL, NULL, '2024-10-03 19:42:26', 3, 1),
(3, 'Bryam', 'Cuervo', 'bryamccuervo2004@gmail.com', '3216547862', 0, 'cliente_1733430127351.jpg', '$2a$10$qOzxrB0nP7fXMiZfMf/HauFihRmIDijfE5P9Ky4i5nh..JsMkt/3i', NULL, NULL, '2024-05-12 00:00:00', 2, 1),
(4, 'Johan Sebastian', 'Muñoz Contreras', 'sebastianmc@gmail.com', NULL, 120, NULL, '$2a$10$IzZaYGl2ZLZAEdiGEtAM6.4.luREWPjnusfy6uLxlaIIxRFyx52Ja', NULL, NULL, '2024-10-03 19:43:23', 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id_venta` varchar(255) NOT NULL,
  `venta_fecha` datetime NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `venta_metodo_pago` varchar(255) NOT NULL,
  `venta_total` int(11) NOT NULL,
  `venta_estado` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id_venta`, `venta_fecha`, `id_user`, `venta_metodo_pago`, `venta_total`, `venta_estado`) VALUES
('venta_081bbb9b-7018-43db-a890-98113df95eaf', '2024-11-21 17:09:50', 4, 'Efectivo', 44000, 1),
('venta_15cb6eeb-5a67-439c-9413-45bdd3380b45', '2024-10-14 14:59:33', 4, 'Nequi', 791000, 1),
('venta_24fc8def-3225-4cc9-b003-cd47d17e8921', '2024-11-15 15:30:28', 2, 'Efectivo', 80000, 1),
('venta_342a8c83-affb-4910-aed0-821b92177ddc', '2024-11-16 15:30:08', 2, 'Efectivo', 40000, 1),
('venta_3edacc16-5fa2-4c10-9b65-27f787ede0b6', '2024-11-17 15:29:26', 2, 'Efectivo', 40000, 1),
('venta_48998611-292e-484d-9a0b-ab8fefeb6d04', '2024-11-18 15:34:49', NULL, 'Nequi', 23000, 0),
('venta_49b667a1-8046-47c4-89fc-c69af8996c7a', '2024-11-18 15:24:55', NULL, 'Efectivo', 80000, 0),
('venta_4cda8a38-d74f-4028-b34c-175b3406b360', '2024-11-19 15:23:30', 4, 'Efectivo', 24000, 1),
('venta_5406794c-4e24-418d-a4e0-9b22ccbb9b0b', '2024-11-19 15:27:00', 4, 'Efectivo', 20000, 1),
('venta_7f35b298-8ead-436f-8dab-3e1d36168b1f', '2024-11-21 17:10:17', 2, 'Efectivo', 24000, 1),
('venta_8436eb60-baa2-46cc-b7f9-06c2bf824681', '2024-11-20 14:56:08', 4, 'Efectivo', 48000, 1),
('venta_8c164781-94eb-40db-860e-26b05e4101ca', '2024-11-25 14:49:32', 4, 'Efectivo', 120000, 0),
('venta_9a7b76e5-69f2-4c3f-8aae-dd8d14cd70bc', '2024-11-19 15:36:52', NULL, 'Efectivo', 20000, 0),
('venta_bc4cd0e5-377f-4439-8581-edf2f4cef9a5', '2024-11-19 15:31:47', 4, 'Efectivo', 131000, 1),
('venta_c6233c32-408e-4410-9636-00203e8de4c1', '2024-09-12 15:24:46', NULL, 'Efectivo', 80000, 0),
('venta_fbdfdb70-0a0a-47db-8aa2-0f3f4fa6b89e', '2024-11-19 15:25:30', 4, 'Efectivo', 23000, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `categorias_inv`
--
ALTER TABLE `categorias_inv`
  ADD PRIMARY KEY (`id_categoria_inv`);

--
-- Indices de la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `detalle_ventas_venta` (`id_venta`),
  ADD KEY `detalle_ventas_producto` (`id_producto`);

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
  ADD KEY `inventario - categoria` (`id_categoria_inv`),
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
  ADD KEY `usuario_recompensa` (`id_user`);

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
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `categorias_inv`
--
ALTER TABLE `categorias_inv`
  MODIFY `id_categoria_inv` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `empleados_horas`
--
ALTER TABLE `empleados_horas`
  MODIFY `id_horas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id_producto_inv` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id_proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `recompensas`
--
ALTER TABLE `recompensas`
  MODIFY `id_recomp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `recompensas_obt`
--
ALTER TABLE `recompensas_obt`
  MODIFY `id_recomp_obt` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  ADD CONSTRAINT `detalle_ventas_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  ADD CONSTRAINT `id_venta` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`);

--
-- Filtros para la tabla `empleados_horas`
--
ALTER TABLE `empleados_horas`
  ADD CONSTRAINT `empleados` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `inventario - categoria` FOREIGN KEY (`id_categoria_inv`) REFERENCES `categorias_inv` (`id_categoria_inv`) ON DELETE CASCADE ON UPDATE CASCADE,
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
  ADD CONSTRAINT `recompensa` FOREIGN KEY (`id_recomp`) REFERENCES `recompensas` (`id_recomp`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario_recompensa` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `rol` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `usuario venta` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
