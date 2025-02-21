-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-02-2025 a las 01:37:35
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
  `id_categoria` varchar(255) NOT NULL,
  `cat_nom` varchar(255) NOT NULL,
  `cat_foto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_inv`
--

CREATE TABLE `categorias_inv` (
  `id_categoria_inv` int(11) NOT NULL,
  `categoria_inv_nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `id_producto` varchar(255) NOT NULL,
  `pro_nom` varchar(255) NOT NULL,
  `pro_desp` varchar(255) NOT NULL,
  `pro_precio` varchar(255) NOT NULL,
  `pro_foto` varchar(255) NOT NULL,
  `pro_puntos` varchar(255) NOT NULL,
  `pro_estado` int(2) NOT NULL DEFAULT 1,
  `id_categoria` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recompensas`
--

CREATE TABLE `recompensas` (
  `id_recomp` varchar(255) NOT NULL,
  `recompensa_nombre` varchar(255) NOT NULL,
  `recompensa_descripcion` varchar(255) NOT NULL,
  `recomp_num_puntos` int(11) NOT NULL,
  `recomp_foto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
('user_admin_1740097849543', 'admin', 'admin', 'admin@gmail.com', NULL, 0, NULL, '$2a$10$nhZ0WNjJk.oghLVI72XaPu45HoRCp/XOd3SpnmmvqCQzexejlllQS', NULL, NULL, '2025-02-20 19:30:49', 1, 1),
('user_Bryam_1740098049146', 'Bryam', 'castañeda cuervo', 'bryamccuervo2004@gmail.com', NULL, 0, NULL, '$2a$10$x6V069NY.nSJtwa4h5sPle7WsKLiWk3PGCV/qJSEYWk15RokylCee', NULL, NULL, '2025-02-20 19:34:09', 3, 1),
('user_Dilan Santiago_1740098072789', 'Dilan Santiago', 'Lopez Romero', 'dilanfantas@gmail.com', NULL, 0, NULL, '$2a$10$8xpwM3J6n4Xw2ejj6kqsV.qg0XhjWg8BtSRsFgV5PPf.b2EtYklEu', NULL, NULL, '2025-02-20 19:34:32', 3, 1),
('user_Johan Sebastian_1740098106538', 'Johan Sebastian', 'Muñoz Contreras', 'johanmc@gmail.com', NULL, 0, NULL, '$2a$10$LCLJnriPFmYy/0ARI9W75OIhXqiTIlawgzczsgDUtiN0Nmvhs7P72', NULL, NULL, '2025-02-20 19:35:06', 3, 1);

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
  ADD UNIQUE KEY `id_producto` (`id_producto`),
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
-- AUTO_INCREMENT de la tabla `categorias_inv`
--
ALTER TABLE `categorias_inv`
  MODIFY `id_categoria_inv` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleados_horas`
--
ALTER TABLE `empleados_horas`
  MODIFY `id_horas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id_producto_inv` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id_proveedor` int(11) NOT NULL AUTO_INCREMENT;

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
