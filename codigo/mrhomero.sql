-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-10-2024 a las 02:43:44
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
  `id_categoria` int(11) NOT NULL,
  `cat_nom` varchar(255) NOT NULL,
  `cat_foto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `cat_nom`, `cat_foto`) VALUES
(1, 'Salchipapas', 'categoria_1727322756647.jpg'),
(2, 'Perros calientes', 'categoria_1727322790884.jpg'),
(3, 'Choriperros', 'categoria_1727322797738.jpg');

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
(2, 'Nevera'),
(3, 'Congelado');

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

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`id_producto_inv`, `inv_nombre`, `id_categoria_inv`, `inv_fecha_ing`, `inv_fecha_cad`, `inv_cantidad`, `inv_cantidad_min`, `id_proveedor`) VALUES
(1, 'Tomate', 3, '2024-08-31', '2024-08-30', 11, 24, 2),
(4, 'Carne', 2, '2007-02-09', '2024-03-02', 213, 22, 1),
(8, 'Pollo', 1, '2024-09-06', '2024-09-25', 233, 25, 1),
(16, 'Carne de cerdo', 3, '2024-09-18', '2024-09-25', 22, 23, 2),
(19, 'Pan', 1, '2024-09-18', '2024-09-25', 23, 2, 2),
(20, 'Papas fritas', 2, '2024-09-18', '2024-09-25', 2, 20, 2),
(21, '3123', 3, '2024-09-18', '2024-09-25', 23, 20, 1),
(22, 'daawfd', 3, '2024-09-18', '2024-09-25', 232, 23, 1),
(23, 'awfwafwa', 2, '2024-09-19', '2024-09-25', 2323, 2412, 1),
(24, '213213', 3, '2024-09-18', '2024-09-26', 23, 2141, 2),
(25, 'afw2wafawf2af2a', 3, '2024-09-18', '2024-09-26', 23, 2141, 2);

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
(7, 'Perro sencillo', 'Pan, chorizo de cerdo, queso, jamón, papas chip, cebolla y salsas de la casa.', '8050', 'producto_1727495294895.webp', '10', 2),
(8, 'Choriperro sencillo', 'Pan, chorizo de cerdo, queso, papas chip, cebolla y salsas de la casa.', '6900', 'producto_1727495377341.webp', '10', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_imgs`
--

CREATE TABLE `productos_imgs` (
  `id_pro_img` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `image` varchar(255) NOT NULL
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

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id_proveedor`, `prov_nombre`, `prov_direccion`, `prov_contacto_nombre`, `prov_contacto_telefono`, `prov_contacto_email`, `prov_activo`) VALUES
(1, 'Coca cola', 'ejm', 'ejm', 'ejm', 'ejm', 1),
(2, 'Bimbo', 'ejm', 'ejm', 'ejm', 'ejm', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recompensas`
--

CREATE TABLE `recompensas` (
  `id_recomp` int(11) NOT NULL,
  `recompensa` varchar(255) NOT NULL,
  `recomp_num_puntos` int(11) NOT NULL,
  `recomp_foto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recompensas`
--

INSERT INTO `recompensas` (`id_recomp`, `recompensa`, `recomp_num_puntos`, `recomp_foto`) VALUES
(1, 'Llavero', 20, 'llavero.jpg'),
(2, 'Peluche', 30, 'peluche.jpg'),
(3, 'Sticker', 5, 'sticker.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recompensas_obt`
--

CREATE TABLE `recompensas_obt` (
  `id_recomp_obt` int(11) NOT NULL,
  `id_recomp` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
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
  `id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_user`, `user_nom`, `user_apels`, `user_email`, `user_tel`, `user_puntos`, `user_foto`, `user_pass`, `user_reset_code`, `user_reset_code_expiration`, `user_fecha_registro`, `id_rol`) VALUES
(1, 'admin', 'admin', 'admin@gmail.com', NULL, 0, NULL, '$2a$10$ryatX/igKMkGPSkbfq8s4e5lRevbYJhh1g25cajrc82xgDku4csG2', NULL, NULL, '2024-10-03 19:40:47', 1),
(2, 'Dilan Santiago', 'López Romero', 'dilanfantas@gmail.com', NULL, 0, NULL, '$2a$10$nIXpxd3AQdOvYUMAfHDc5.JLn6vPen5cVJdXVTcnpBWY8k6k7cB2.', NULL, NULL, '2024-10-03 19:42:26', 3),
(3, 'Bryam', 'Castañeda Cuervo', 'bryamccuervo2004@gmail.com', NULL, 0, NULL, '$2a$10$qOzxrB0nP7fXMiZfMf/HauFihRmIDijfE5P9Ky4i5nh..JsMkt/3i', NULL, NULL, '2024-10-03 19:42:50', 3),
(4, 'Johan Sebastian', 'Muñoz Contreras', 'sebastianmc@gmail.com', NULL, 0, NULL, '$2a$10$IzZaYGl2ZLZAEdiGEtAM6.4.luREWPjnusfy6uLxlaIIxRFyx52Ja', NULL, NULL, '2024-10-03 19:43:23', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id_venta` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `venta_fecha` datetime NOT NULL,
  `id_user` int(11) NOT NULL,
  `venta_total` int(11) NOT NULL
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
-- Indices de la tabla `productos_imgs`
--
ALTER TABLE `productos_imgs`
  ADD PRIMARY KEY (`id_pro_img`),
  ADD KEY `product_id` (`id_producto`);

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
  ADD KEY `rol` (`id_rol`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `producto` (`id_producto`),
  ADD KEY `usuario` (`id_user`);

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
  MODIFY `id_categoria_inv` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id_producto_inv` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id_proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `recompensas`
--
ALTER TABLE `recompensas`
  MODIFY `id_recomp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
-- Filtros para la tabla `productos_imgs`
--
ALTER TABLE `productos_imgs`
  ADD CONSTRAINT `producto imagenes` FOREIGN KEY (`id_pro_img`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
