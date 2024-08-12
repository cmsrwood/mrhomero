Proceso RegistroUsuario
    Definir nombres, apellidos, email, contraseña, confirmacionContraseña Como Caracter
	Definir usuario_nom, usuario_apels, usuario_email, usuario_pass Como Caracter
	usuario_nom = "Dilan"
	usuario_apels = "Lopez"
	usuario_email = "dilanfantas@gmail.com"
	usuario_pass = "123456789"
	Escribir "Ingrese nombres"
	Leer nombres
	Escribir "Ingrese apellidos"
	Leer apellidos
	Escribir "Ingrese email"
	Leer email
	Escribir "Ingrese contraseña"
	Leer contraseña
	Escribir "Confirmar contraseña"
	Leer confirmacionContraseña
	
	Si email = usuario_email Entonces
		Escribir "El usuario ya existe"
	SiNo
		Si contraseña <> confirmacionContraseña Entonces
			Escribir "Las contraseñas no coinciden"
		SiNo
			Si Longitud(contraseña) < 8 Entonces
				Escribir "La contraseña debe tener un minimo de 8 caracteres"
			SiNo
				Escribir "Usuario registrado con exito"
			FinSi
		FinSi
	FinSi
	

	
FinProceso

