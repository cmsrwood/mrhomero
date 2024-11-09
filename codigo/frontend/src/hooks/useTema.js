import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function useTema() {
    const temaInicial = localStorage.getItem('tema') || 'dark';
    const [tema, setTema] = useState(temaInicial);

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', tema);
        localStorage.setItem('tema', tema);
    }, [tema]);

    const ToastTema = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 1600,
        timerProgressBar: true,
    });

    const cambiarTema = () => {
        const nuevoTema = tema === 'light' ? 'dark' : 'light';
        setTema(nuevoTema);
        if (nuevoTema === 'light') {
            ToastTema.fire({
                title: `Tema cambiado a ${nuevoTema}`,
                icon: 'success',
                color: '#fff',
                background: '#212529',
            });
        }
        else {
            ToastTema.fire({
                title: `Tema cambiado a ${nuevoTema}`,
                icon: 'success'
            });
        }
    };

    return { tema, cambiarTema };
}
