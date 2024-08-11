Proceso RegistroUsuario
    Definir email, contraseña, confirmacionContraseña Como Caracter
    Definir arroba, punto, esEmailValido, esContraseñaValida Como Logico
    
    esEmailValido = Falso
    esContraseñaValida = Falso
    
    Mientras No esEmailValido Hacer
        Escribir "Ingresa tu correo electrónico: "
        Leer email
        
        // Verificar si el email contiene "@" y "."
        arroba = Falso
        punto = Falso
        
        Para i = 1 Hasta Longitud(email) Hacer
            Si Subcadena(email, i, i) = "@" Entonces
                arroba = Verdadero
            FinSi
            Si Subcadena(email, i, i) = "." Entonces
                Si arroba Entonces
                    punto = Verdadero
                FinSi
            FinSi
        FinPara
        
        Si arroba Y punto Entonces
            esEmailValido = Verdadero
        Sino
            Escribir "El correo electrónico no es válido. Inténtalo de nuevo."
        FinSi
    FinMientras
    
    Mientras No esContraseñaValida Hacer
        Escribir "Ingresa tu contraseña: "
        Leer contraseña
        Escribir "Confirma tu contraseña: "
        Leer confirmacionContraseña
        
        Si Longitud(contraseña) >= 8 Y contraseña = confirmacionContraseña Entonces
            esContraseñaValida = Verdadero
        Sino
            Escribir "La contraseña debe tener al menos 8 caracteres y coincidir. Inténtalo de nuevo."
        FinSi
    FinMientras
    Escribir "Registro completado con éxito."
    Escribir "Tu correo electrónico es: ", email
	Proceso RegistroUsuario
		Definir email, contraseña, confirmacionContraseña Como Caracter
		Definir arroba, punto, esEmailValido, esContraseñaValida Como Logico
		
		esEmailValido = Falso
		esContraseñaValida = Falso
		
		Mientras No esEmailValido Hacer
			Escribir "Ingresa tu correo electrónico: "
			Leer email
			
			// Verificar si el email contiene "@" y "."
			arroba = Falso
			punto = Falso
			
			Para i = 1 Hasta Longitud(email) Hacer
				Si Subcadena(email, i, i) = "@" Entonces
					arroba = Verdadero
				FinSi
				Si Subcadena(email, i, i) = "." Entonces
					Si arroba Entonces // El punto debe estar después de la arroba
						punto = Verdadero
					FinSi
				FinSi
			FinPara
			
			Si arroba Y punto Entonces
				esEmailValido = Verdadero
			Sino
				Escribir "El correo electrónico no es válido. Inténtalo de nuevo."
			FinSi
		FinMientras
		
		Mientras No esContraseñaValida Hacer
			Escribir "Ingresa tu contraseña: "
			Leer contraseña
			Escribir "Confirma tu contraseña: "
			Leer confirmacionContraseña
			
			Si Longitud(contraseña) >= 8 Y contraseña = confirmacionContraseña Entonces
				esContraseñaValida = Verdadero
			Sino
				Escribir "La contraseña debe tener al menos 8 caracteres y coincidir. Inténtalo de nuevo."
			FinSi
		FinMientras
		
		Escribir "Registro completado con éxito."
		Escribir "Tu correo electrónico es: ", email
FinProceso

