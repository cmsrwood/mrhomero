import Swal from 'sweetalert2';

export default function useCerrarSesion() {

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        Swal.fire({
            icon: 'success',
            title: 'Has cerrado sesión correctamente',
            text: 'Vuelve pronto',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.location.href = '/';
        })
    };

    return cerrarSesion;
}
