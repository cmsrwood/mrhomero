-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Servidor: mrhomero.cp84e8ay06n5.us-east-2.rds.amazonaws.com
-- Tiempo de generación: 18-09-2024 a las 16:37:46
-- Versión del servidor: 8.0.35
-- Versión de PHP: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
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
  `id_categoria` int NOT NULL,
  `cat_nom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `cat_foto` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `cat_nom`, `cat_foto`) VALUES
(1, 'Hamburguesas', 'hamburguesa.jpg'),
(2, 'Choriperro', 'choriperro.jpg'),
(3, 'Salchipapa', 'salchipapa.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_inv`
--

CREATE TABLE `categorias_inv` (
  `id_categoria_inv` int NOT NULL,
  `categoria_inv_nom` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
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
  `id_producto_inv` int NOT NULL,
  `inv_nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_categoria_inv` int NOT NULL,
  `inv_fecha_ing` date NOT NULL,
  `inv_fecha_cad` date NOT NULL,
  `inv_cantidad` int NOT NULL,
  `inv_cantidad_min` int NOT NULL,
  `id_proveedor` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`id_producto_inv`, `inv_nombre`, `id_categoria_inv`, `inv_fecha_ing`, `inv_fecha_cad`, `inv_cantidad`, `inv_cantidad_min`, `id_proveedor`) VALUES
(1, 'Tomate', 1, '2024-08-31', '2024-08-30', 606, 24, 1),
(2, 'Lechuga', 3, '2024-09-16', '2024-09-18', 25, 23, 1),
(4, 'Carne', 2, '2007-02-09', '2024-03-02', 2, 22, 2),
(5, 'Cebolla', 2, '2323-02-23', '2323-02-23', 2, 23, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int NOT NULL,
  `pro_nom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `pro_desp` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `pro_precio` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `pro_foto` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `pro_puntos` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `id_categoria` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `pro_nom`, `pro_desp`, `pro_precio`, `pro_foto`, `pro_puntos`, `id_categoria`) VALUES
(4, 'Hamburguesa sencilla', 'Hamburguesa de carne 65 grs, lechuga, cebolla, tomate, papa triturada y salsas de la casa.', '6000', 'hamburguesasencilla.jpg', '5', 1),
(5, 'Choriperro sencillo', 'Pan, chorizo de cerdo, queso, papas chip, cebolla y salsas de la casa.', '6900', 'choriperrosencillo.jpg', '10', 2),
(6, 'Salchipapa sencilla', 'Papa francesa 200 gr, salchicha zenu long, papas chip y salsas de la casa.', '6900', 'salchipapasencilla.jpg', '6', 3),
(7, 'Salchipapa especial', '12345', '5600', 'salchipapaespecial.jpg', '15', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_imgs`
--

CREATE TABLE `productos_imgs` (
  `id_pro_img` int NOT NULL,
  `id_producto` int NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id_proveedor` int NOT NULL,
  `prov_nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `prov_direccion` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `prov_contacto_nombre` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `prov_contacto_telefono` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `prov_contacto_email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `prov_activo` tinyint(1) DEFAULT '1'
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
  `id_recomp` int NOT NULL,
  `recompensa` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `recomp_num_puntos` int NOT NULL,
  `recomp_foto` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
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
  `id_recomp_obt` int NOT NULL,
  `id_recomp` int NOT NULL,
  `id_user` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int NOT NULL,
  `rol` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
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
  `id_user` int NOT NULL,
  `user_nom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_apels` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_tel` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_puntos` int NOT NULL,
  `user_foto` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_pass` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_reset_code` varchar(7) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_reset_code_expiration` datetime DEFAULT NULL,
  `id_rol` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_user`, `user_nom`, `user_apels`, `user_email`, `user_tel`, `user_puntos`, `user_foto`, `user_pass`, `user_reset_code`, `user_reset_code_expiration`, `id_rol`) VALUES
(7, 'Dilan Santiago', 'López Romero', 'dilanfantas@gmail.com', NULL, 0, NULL, '$2a$10$z0jNRO.XSGM.Wf8S8nz8FOFjcM3w9PLUIWRNsvSpKb7qBKqAc8H4G', NULL, NULL, 3),
(8, 'Bryam', 'Cuervo', 'bryamccuervo2004@gmail.com', NULL, 0, NULL, '$2a$10$2cTfRrz70JVPO7oP3wqVEOlRP0LvOXCB9i05Ik./Wt5cSUOwKugJ.', NULL, NULL, 3),
(9, 'Sebastian', 'Muñoz', 'johansebastian05433259@gmail.com', NULL, 0, NULL, '$2a$10$pP40vwVh.ZRHB7RZ4lsTze2qUGhCHVfQcFNOAyUne34VhPQxVGYI2', NULL, NULL, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id_venta` int NOT NULL,
  `id_producto` int NOT NULL,
  `venta_fecha` datetime NOT NULL,
  `id_user` int NOT NULL,
  `venta_total` int NOT NULL
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
  MODIFY `id_categoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `categorias_inv`
--
ALTER TABLE `categorias_inv`
  MODIFY `id_categoria_inv` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id_producto_inv` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id_proveedor` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `recompensas`
--
ALTER TABLE `recompensas`
  MODIFY `id_recomp` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `recompensas_obt`
--
ALTER TABLE `recompensas_obt`
  MODIFY `id_recomp_obt` int NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
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
